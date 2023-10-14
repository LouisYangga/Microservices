const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/user/all');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
require('../db/db')
const config= require('../config/config')
const port = config.port;
const routes = require('../routes/routes');
app.use(express.json());
app.use('/advice', routes)
app.get('/', (req, res) => {
    res.json({ message: ' Advice Server side' });
})

app.listen(port, () => {
    console.log('Advice Server start');
})