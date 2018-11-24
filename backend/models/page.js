//Require mongoose
const mongoose = require('mongoose');

//Initilize new schema
const pageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    date: Date,
    tags: [String],
    content: String,
    active: Boolean,
    category: String,
    file: String
});

module.exports = mongoose.model('Page', pageSchema);