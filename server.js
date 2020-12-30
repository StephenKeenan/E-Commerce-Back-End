const express = require('express');
const routes = require('./routes');
const routes = require('./routes');
require('./config/connection');

var consoleTable = require('console-table');
consoleTable([
  ["Welcome to the E-commerce back end"]
])

const app = express();
const PORT = process.env.PORT || 3001;

// import sequelize connection
const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() => {
app.listen(PORT, () => 
  console.log(`App listening on port ${PORT}!`));
});
