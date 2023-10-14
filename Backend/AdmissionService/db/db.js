const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/admission';
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'user',
}
mongoose.connect(url, connectionParams, )
    .then(() => {
        console.log('Connected to the admission database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })