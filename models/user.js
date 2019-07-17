let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
});

let User = module.exports = mongoose.model('User', userSchema );