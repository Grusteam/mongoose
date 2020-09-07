const express = require('express');
const mongoose = require("mongoose");

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

const dbOptions = {
    useNewUrlParser: true
}

mongoose.connect(_DB_, dbOptions);

const db = mongoose.connection;

db.on('error', error => console.log('error', error));
db.once('open', () => console.log('db connected'));

/*  */
app.listen(port, () => console.log(`working on ${port}`))

const showResults = all => {
    const filtered = all.filter(({ tag }) => tag !== 'favicon.ico')
    const sorted = filtered.sort((a, b) => b.count - a.count);
    const arr = filtered.map(({ tag, count }) => {
        return `<div class="str">${tag} - ${count}</div>`
    });
    const str = arr.join('');
    const result = `<div class="all">${str}</div>`

    return result;
}

/*  */
app.get('/:tag', async (req, res) => {
    const { tag } = req.params;

    /* show */
    if (tag === 'show_results') {
        const all = await Record.find();
        const layout = showResults(all);

        console.log('layout', layout);

        return res.send(layout);
    }

    const filter = {tag};
    const searchResult = await Record.findOne(filter);

    /* update */
    if (searchResult) {
        searchResult.count++;

        const updated = await searchResult.save();

        return res.redirect(bigBeads);
    }

    /* new */
    const newRecord = new Record({ tag, count: 1 });

    const saved = await newRecord.save();

    res.redirect(bigBeads);
})

/* root */
app.get('/', (req, res) => {
    res.redirect(bigBeads);
})