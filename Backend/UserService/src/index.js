const express = require('express');
const app = express();
var cors = require('cors');

const config= require('../config/config')
const port = config.port;
const routes = require('../routes/routes');
app.use(express.json());
app.use('/user', routes)
app.get('/', (req, res) => {
    res.json({ message: 'Server side' });
})

app.listen(port, () => {
    console.log('Server start');
})