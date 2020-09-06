const express = require('express');
const mongoose = require("mongoose");

const app = express();
const _DB_ = `mongodb+srv://admin:${process.env.MONGO_BASE_PASSWORD}@cluster0-dbfzg.mongodb.net/test?retryWrites=true&w=majority`;
const port = process.env.EXPRESS_PORT || 8080;

let User = require('./models/user');

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(_DB_, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', error => console.log('error', error));
db.once('open', () => console.log('db connected'));

/*  */
app.listen(port, () => console.log(`working on ${port}`))

/* html */
app.get('/html', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    })
})

app.get('/roles/:role', (req, res) => {
    User.find({role: req.params.role}, (err, users) => {
        res.send(users);
    })
})

app.get('/user/:name', (req, res) => {
    const { name } = req.params;

    User.find({name}, (err, users) => {
        if (users.length) {
            res.send(users);
        } else {
            res.status(400).send(`user with name ${name} not found`);
        }
    })
})

app.get('/set/:name', (req, res) => {
    const { name } = req.params;

    User.find({ name }, (err, users = []) => {
        const [user] = users;

        if (user) {
            res.send(`user with name ${name} is alseady exist: ${users}`);
        } else {
            const newUser = new User({ name, role: 'user' });

            newUser.save().then((user) => {
                res.send(user);
            });
        }
    })
})

app.get('/delete/:id', (req, res) => {
    const { id: _id } = req.params;

    User.find({_id}, (err, users) => {

        if (!users) {
            res.send(`error`);
        } else if (users.length > 1) {
            res.send(`many of them... ${users.length}`);
        } else if (users.length){
            const [user] = users;

            User.deleteOne({_id}, (err, user) => {
                res.send('deleted');
            })
        } else {
            res.send(`no such user`);
        }
    })
})

/* post */
app.post('/', (req, res) => {
    res.send(req.body);
})