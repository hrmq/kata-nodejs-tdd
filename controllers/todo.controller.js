const TodoModel = require('../models/todo.model');

exports.createTodo = function (req, res, next) {
  TodoModel.create();
};
