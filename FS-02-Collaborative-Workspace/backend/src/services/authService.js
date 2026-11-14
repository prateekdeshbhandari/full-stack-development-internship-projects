const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (userId, secret = process.env.JWT_SECRET || 'dev-secret') =>
  jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });

const hashPassword = async (password) => bcrypt.hash(password, 12);

const comparePassword = async (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  createToken,
  hashPassword,
  comparePassword,
};
