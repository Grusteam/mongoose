const fs = require('fs');
const express = require('express');
const mongoose = require("mongoose");

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const indexLayout = require('./index.html');

const app = express();
const collection = 'lampwork'
const { MONGO_BASE_PASSWORD, EXPRESS_PORT } = process.env

const _DB_ = `mongodb+srv://admin:${MONGO_BASE_PASSWORD}@cluster0-dbfzg.mongodb.net/${collection}?retryWrites=true&w=majority`;
const port = EXPRESS_PORT || 8080;
const bigBeads = '//instagram.com/big_beads';

let Record = require('./models/record');

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* css */
app.use(express.static('public'));
app.use('/frontend', express.static(`${__dirname}/frontend`));

const dbOptions = {
    useNewUrlParser: true
}

mongoose.connect(_DB_, dbOptions);

const db = mongoose.connection;

db.on('error', error => console.log('error', error));
db.once('open', () => console.log('db connected'));

/*  */
app.listen(port, () => console.log(`working on ${port}`))

/* root */
app.get('/', (req, res) => {
    res.send('home');
})

// app.get('/frontend', (req, res) => {
//     res.sendFile(`${__dirname}/frontend/index.html`);
// })