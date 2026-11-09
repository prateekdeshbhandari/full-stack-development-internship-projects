const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_BYTES = 72;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
};

const createToken = (userId, secret) =>
  jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });

const isValidEmail = (email) =>
  email.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const register = async (req, res, next) => {
  try {
    const secret = getJwtSecret();
    const body = req.body || {};
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (
      !name ||
      name.length > MAX_NAME_LENGTH ||
      !isValidEmail(email) ||
      password.length < MIN_PASSWORD_LENGTH ||
      Buffer.byteLength(password, 'utf8') > MAX_PASSWORD_BYTES
    ) {
      return res.status(400).json({
        message:
          'Provide a name of at most 100 characters, a valid email, and a password between 8 and 72 UTF-8 bytes.',
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return res.status(201).json({
      user,
      token: createToken(user.id, secret),
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const secret = getJwtSecret();
    const body = req.body || {};
    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (
      !isValidEmail(email) ||
      !password ||
      Buffer.byteLength(password, 'utf8') > MAX_PASSWORD_BYTES
    ) {
      return res.status(400).json({
        message: 'Provide a valid email and a password of at most 72 UTF-8 bytes.',
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    const passwordMatches =
      user && (await bcrypt.compare(password, user.passwordHash));

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: createToken(user.id, secret),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
