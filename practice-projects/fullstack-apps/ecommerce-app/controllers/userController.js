const users = require('../data/usersData');
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

exports.createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User created', user: newUser });
};

exports.editUser = (req, res, next) => {
  const userId = parseInt(req.params.id);
  const newUserData = req.body;

  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return next(new CustomError('User not found', 404));
  }

  users[index] = {
    id: userId,
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
