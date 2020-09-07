let mongoose = require("mongoose");

let recordSchema = mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
});

let Record = module.exports = mongoose.model('Record', recordSchema );