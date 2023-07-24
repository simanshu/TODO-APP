// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
require('./config');

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Parse incoming data
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Routes
const indexRoutes = require('./routes');
app.use('/', indexRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
