const express = require('express');
const mongoose = require("mongoose");

const app = express();
const _DB_ = "mongodb+srv://admin:powermongo@cluster0-dbfzg.mongodb.net/test?retryWrites=true&w=majority";
const port = process.env.EXPRESS_PORT || 8080;

let User = require('./models/user');

app.use(express.json());
mongoose.connect(_DB_, {useNewUrlParser: true});

const db = mongoose.connection;

console.log('User', User);


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


app.listen(port, () => console.log(`working on ${port}`))

// const User = mongoose.model('User', { name: String, role: String });


// console.log('User', User);

// console.log('user', user);

// const Zildjian = new User({ name: 'Zildjian', role: 'user' });

// Zildjian.save().then((x) => {
//     console.log('x', x);
// });


/* mongo> */
/* const MongoClient = require('mongodb').MongoClient;

console.log('MongoClient', MongoClient);
const client = new MongoClient(_DB_, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");

  console.log('collection', collection);
  client.close();
}); */
/* <mongo */


/* plain app> */
/* app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/hello', (req, res) => {
    res.send([{text: 'Hello World'}]);
})

app.get('/api/test', (req, res) => {
    res.send([{test: `Test`}]);
})

app.get('/api/params/:id/:salt', (req, res) => {
    res.send({params: req.params, query: req.query});
}) */
/* <plain app */

// console.log('app', app);