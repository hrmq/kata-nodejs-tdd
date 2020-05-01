const TodoModel = require('../models/todo.model');

exports.createTodo = function () {
  TodoModel.create();
};
