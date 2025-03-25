const users = require('../data/usersData');
const userSchema = require('../validators/userValidator');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const CustomError = require('../utils/customError');

exports.getProfile = (req, res, next) => {
  const userId = req.user.id;
  const user = users.find(u => u.id === userId);

  if (!user) {
    return next(new CustomError('User not found', 404));
  }

  res.json(user);
};

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res, next) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    return next(new CustomError('User not found', 404));
  }
};

exports.registerUser = (req, res, next) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
  };

  users.push(newUser);

  const payload = { id: newUser.id, name: newUser.name, email: newUser.email };
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

  res.status(201).json({
    message: 'User created',
    user: newUser,
    accessToken,
    refreshToken,
  });
};

exports.editUser = (req, res, next) => {
  const userIdParam = parseInt(req.params.id);
  const authenticatedUser = req.user;
  const newUserData = req.body;
  const { error, value } = userSchema.validate(newUserData);

  if (userIdParam !== authenticatedUser.id) {
    return next(new CustomError('Operation not permitted', 403));
  }

  if (error) {
    return next(new CustomError('Invalid fields', 400));
  }

  const index = users.findIndex(u => u.id === userIdParam);

  if (index === -1) {
    return next(new CustomError('User not found', 404));
  }

  users[index] = {
    id: userIdParam,
    ...newUserData,
  };

  res.status(200).json({
    message: 'User updated successfully',
    user: users[index],
  });
};

exports.deleteUser = (req, res, next) => {
  const userId = parseInt(req.params.id);

  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return next(new CustomError('User not found', 404));
  }

  users.splice(index, 1);

  res.status(200).json('User deleted successfully');
};
