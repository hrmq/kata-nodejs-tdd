const request = require('supertest');
const app = require('../../app');
const newData = require('../mock-data/new-todo.json');

const endpoint = '/todo';

describe(endpoint, () => {
  it('POST ' + endpoint, async () => {
    const response = await request(app).post(endpoint).send(newData);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newData.title);
    expect(response.body.done).toBe(newData.done);
  });
});
