const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/user/all');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const config= require('../config/config')
const port = config.port;
const routes = require('../routes/routes');
require('../db/db');
app.use(express.json());
app.use('/admission', routes)
app.get('/', (req, res) => {
    res.json({ message: ' AdmissionService Server side' });
})

app.listen(port, () => {
    console.log('Admission Server start');
})