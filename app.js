const express = require('express');
const mongodb = require('./mongodb/mongodb.connect');

const todoRouter = require('./routes/todo.routs');

const app = express();
mongodb.connect();

app.use(express.json());

app.use('/todos', todoRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
