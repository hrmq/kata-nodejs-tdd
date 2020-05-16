const TodoModel = require('../models/todo.model');

exports.createTodo = async function (req, res, next) {
  try {
    const todoModel = await TodoModel.create(req.body);
    res.status(201).json(todoModel);
  } catch (err) {
    console.log(err, 'djsaljld');
    next(err.message);
  }
};
