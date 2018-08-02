var express = require('express');
var app = express();
const path = require('path');
app.use(express.json());
require('./routes')(app);
app.use('/projects/bank-ledger', express.static(path.join(__dirname, './build')));

const port = 5000
app.listen(port, () => console.log(`Listening on port ${port}...`));