const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

const server = app.listen(3000, () =>
  console.log(`Server ready at: http://localhost:3000`),
);