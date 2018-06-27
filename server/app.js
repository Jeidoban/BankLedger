const Joi = require('joi');
var express = require('express');
var app = express();
app.use(express.json());
require('./routes')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));