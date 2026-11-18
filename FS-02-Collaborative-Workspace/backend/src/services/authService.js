const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
};

const createToken = (userId, secret = getJwtSecret()) =>
  jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });

const hashPassword = async (password) => bcrypt.hash(password, 12);

const comparePassword = async (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  createToken,
  hashPassword,
  comparePassword,
};
