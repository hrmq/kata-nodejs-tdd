const express = require('express');
const mongodb = require('./mongodb/mongodb.connect');

const todoRouter = require('./routes/todo.routs');

const app = express();
mongodb.connect();

app.use(express.json());

app.use('/todos', todoRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.listen(3000, () => {
//   console.log('Server is running now');
// });

module.exports = app;
