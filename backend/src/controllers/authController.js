const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    res.status(201).json({ user: { id: user.id, username: user.username, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await user.validPassword(password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ user: { id: user.id, username: user.username, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
}; 