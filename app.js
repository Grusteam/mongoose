const express = require('express');
const mongoose = require("mongoose");

const app = express();
const _DB_ = `mongodb+srv://admin:${process.env.MONGO_BASE_PASSWORD}@cluster0-dbfzg.mongodb.net/test?retryWrites=true&w=majority`;
const port = process.env.EXPRESS_PORT || 8080;

let User = require('./models/user');

app.use(express.json());
mongoose.connect(_DB_, {useNewUrlParser: true});

const db = mongoose.connection;



db.on('error', error => console.log('error', error));
db.once('open', () => console.log('db connected'));

app.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    })
})

app.get('/roles/:role', (req, res) => {
    User.find({role: req.params.role}, (err, user) => {
        res.send(user);
    })
})

app.get('/set/:name', (req, res) => {
    const newUser = new User({ name: req.params.name, role: 'user' });

    newUser.save().then((user) => {
        res.send(user);
    });
})


app.listen(port, () => console.log(`working on ${port}`))
