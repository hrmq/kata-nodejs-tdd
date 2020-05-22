const request = require('supertest');
const app = require('../../app');

const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

const endpointUrl = '/todos/';
let firstTodo = describe(endpointUrl, () => {
  it('GET ' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  it('GET by id' + endpointUrl + ':todoId', async () => {
    const todoId = firstTodo._id;
    const response = await request(app).get(endpointUrl + todoId);
    expect(response.statusCode).toBe(200);
  });

  it('GET todo by id doesnt exist', async () => {
    const todoId = '5eac861752614d18bc914d50';
    const response = await request(app).get(endpointUrl + todoId);
    expect(response.statusCode).toBe(404);
  });

  it('POST ' + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });

  it('should return error 500 on malformed data with POST', async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send({ title: 'Missing Done Property' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: 'Todo validation failed: done: Path `done` is required.',
    });
  });
});
