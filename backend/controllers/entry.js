const mongoose = require('mongoose');
const Blog = require('../models/blog');
const Writting = require('../models/writting');

//Handle functions for varifiying data
/*************************/
function formateLetterCase(input) {
    if (isNaN(input)) return input.toLowerCase();
    return false;
}

/*************************/

//Handle post create
module.exports.create = (req, res) => {
    //Create new entry
    let entry;

    console.log(req.body.type === "blog");

    //Hold title and type
    const title = formateLetterCase(req.body.title);
    const type = formateLetterCase(req.body.type);

    console.log(title, type);

    //Hold input data
    const data = {
        _id: mongoose.Types.ObjectId(),
        title: title,
        date: req.body.date,
        time: req.body.time,
        tags: req.body.tags,
        type: type,
        data: req.body.data,
        archived: req.body.archived
    }

    // Check if entered type is BLOG
    if (type === "blog") entry = new Blog(data);

    //Check if entered type is WRITTING
    if (type === "writting") entry = new Writting(data);

    console.log(entry)

    //Save new entry
    entry
        .save()
        .then((result) => {

            //Send status code 200 and json data
            res.status(200).json({
                message: 'Handling POST requests to /create/',
                data: entry
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Invalid criteria'
            });
        });
}

//Handle post update
module.exports.update = (req, res) => {
    //Hold title reference
    const params = req.params;

    //Format to lowercase
    const title = formateLetterCase(params.title);
    const type = formateLetterCase(params.type);

    //Callback function for update
    const callback = (error, result) => {
        //Ensureno errors are present
        if (error) return res.status(500).json({ error: "Invalid Criteria" });

        //Send result data
        if (result.n) return res.status(200).json({
            message: `Handling PUT requests to /update_title/${title}`,
            data: `Updated ${result.n} entrie(s)`
        });

        //Nothing returned message
        return res.status(404).json({ data: "Nothing is updated" });
    }

    //Hold input data
    const data = {
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        tags: req.body.tags,
        type: req.body.type,
        data: req.body.data,
        archived: req.body.archived
    }

    //Update
    if (type === 'blog') Blog.updateMany({ title: title }, data, callback);
    if (type === 'writting') Writting.updateMany({ title: title }, data, callback);

}

module.exports.retrieve = (req, res) => {
    //Hold empty entry data
    let entry;

    //Hold type info
    const type = formateLetterCase(req.params.type);

    //Send request depending on type
    if (type === 'blog') entry = Blog;
    if (type === 'writting') entry = Writting;

    //Retrieve all documents in DB
    entry.find({})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/retrieve',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
}

//Handle post delet
module.exports.delete = (req, res) => {

}