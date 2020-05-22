const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const httpMocks = require('node-mocks-http');

const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');
const todoId = '5eac861752614d18bc914d50';

jest.mock('../../models/todo.model');

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('TodoController.createTodo', () => {
  beforeEach(() => (req.body = newTodo));

  it('should have a createTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function');
  });

  it('should call TodoModel.create', async () => {
    await TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it('should return 201 reponse code', async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Done property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('TodoController.getTodo', () => {
  it('should have a getTodo function', async () => {
    expect(typeof TodoController.getTodos).toBe('function');
  });

  it('should call TodoModel.find({})', async () => {
    await TodoController.getTodos(req, res, next);
  });

  it('should return response with status 200', async () => {
    TodoModel.find.mockReturnValue(allTodos);
    await TodoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });

  it('should handle errors', async () => {
    const error = { message: 'Error finding' };
    const rejectedPromise = Promise.reject(error);
    TodoModel.find.mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});

describe('TodoController.getTodoById', () => {
  it('should have a getTodoById', () => {
    expect(typeof TodoController.getTodoById).toBe('function');
  });

  it('should call TodoModel.findById with route parameters', async () => {
    req.params.todoId = 'ObjectId';
    await TodoController.getTodoById(req, res, next);
    expect(TodoModel.findById).toBeCalledWith(req.params.todoId);
  });

  it('should return response body and response code 200', async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it('should return error', async () => {
    const error = { message: 'Error' };
    const rejectedPromise = Promise.reject(error);
    TodoModel.findById.mockReturnValue(rejectedPromise);
    await TodoController.getTodoById(req, res, next);
    expect(next).toBeCalledWith(error);
  });

  it('should return 404 if item doesnt exist', async () => {
    TodoModel.findById.mockReturnValue(null);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('TodoController.updateTodo', () => {
  it('should have updateTodo function', async () => {
    expect(typeof TodoController.updateTodo).toBe('function');
  });

  it('should update with TodoModel.findByIdAndUpdate', async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    await TodoController.updateTodo(req, res, next);
    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
      new: true,
      useFindAndModify: false,
    });
  });
});

describe('TodoController.deleteTodo', () => {
  it('should have a deleteTodo function', () => {
    expect(typeof TodoController.deleteTodo).toBe('function');
  });
  it('should call findByIdAndDelete', async () => {
    req.params.todoId = todoId;
    await TodoController.deleteTodo(req, res, next);
    expect(TodoModel.findByIdAndDelete).toBeCalledWith(todoId);
  });
  it('should return 200 OK and deleted todomodel', async () => {
    TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
    await TodoController.deleteTodo(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should handle errors', async () => {
    const errorMessage = { message: 'Error deleting' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await TodoController.deleteTodo(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
  it('should handle 404', async () => {
    TodoModel.findByIdAndDelete.mockReturnValue(null);
    await TodoController.deleteTodo(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
