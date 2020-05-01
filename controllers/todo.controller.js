const TodoModel = require('../models/todo.model');

exports.createTodo = function (req, res, next) {
  const todoModel = TodoModel.create(req.body);
  res.status(201).json(todoModel);
};
