const jwt = require('jsonwebtoken');
const users = require('../data/usersData');
const SECRET_KEY = 'your_secret_key';
const REFRESH_SECRET = 'your_refresh_secret';
const CustomError = require('../utils/customError');

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return next(new CustomError('Invalid credentials', 401));
  }

  const payload = { id: user.id, name: user.name, email: user.email };

  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

  res
    .status(200)
    .json({ message: 'Login successful', accessToken, refreshToken });
};

exports.refreshToken = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new CustomError('No refresh token provided', 401));
  }

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return next(new CustomError('Invalid refresh token', 403));
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ accessToken: newAccessToken });
  });
};
