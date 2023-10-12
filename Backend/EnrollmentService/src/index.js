const express = require('express');
const app = express();

const config= require('../config/config')
const port = config.port;
const routes = require('../routes/routes');
app.use(express.json());
app.use('/enrollment', routes)
app.get('/', (req, res) => {
    res.json({ message: ' Enrollment Server side' });
})

app.listen(port, () => {
    console.log('Enrollment Server start');
})