//Require mongoose
const mongoose = require('mongoose');

//Initilize new schema
const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    date: Array,
    time: Array,
    tags: Array,
    type: String,
    data: Array,
    archived: Boolean
});

module.exports = mongoose.model('Entry', blogSchema);