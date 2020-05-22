const TodoModel = require('../models/todo.model');

exports.createTodo = async function (req, res, next) {
  try {
    const todoModel = await TodoModel.create(req.body);
    res.status(201).json(todoModel);
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async function (req, res, next) {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async function (req, res, next) {
  try {
    const todo = await TodoModel.findById(req.params.todoId);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    next(e);
  }
};

exports.updateTodo = async function (req, res, next) {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);

    if (deletedTodo) {
      res.status(200).json(deletedTodo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};
