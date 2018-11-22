const mongoose = require('mongoose');
const Page = require('../models/page');
const categories = require('../models/categories')
const moment = require('moment');
//Handle functions for varifiying data
/*************************/
function formateLetterCase(input) {
    if (isNaN(input)) return input.toLowerCase();
    return false;
}

/*************************/

//Handle post create
module.exports.create = (req, res) => {
    const date_exploded = req.body.date.split('/');

    //Hold input data
    const data = {
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        date: Date.parse(moment([date_exploded[2], date_exploded[0], date_exploded[1]]).format('DD MMM YYYY')),
        tags: req.body.tags.split(","),
        content: req.body.content,
        active: req.body.active,
        category: categories[req.body.category]
    }

    const page = new Page(data);

    //Save new page
    page
        .save()
        .then((result) => {

            //Send status code 200 and json data
            res.status(200).json({
                message: 'New page is saved',
                data: data
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
    console.log('updating')
    const date_exploded = req.body.date.split('/');

    //Callback function for update
    const callback = (error, result) => {
        //Ensureno errors are present
        if (error) return res.status(500).json({ error: "Invalid Criteria" });

        //Send result data
        if (result) return res.status(200).json({
            message: `Updated Page with ID ${req.params.id}`
        });

        //Nothing returned message
        return res.status(404).json({ data: "Nothing is updated" });
    }

    //Hold input data
    const data = {
        title: req.body.title,
        date: Date.parse(moment([date_exploded[2], date_exploded[0], date_exploded[1]]).format('DD MMM YYYY')),
        tags: req.body.tags.split(","),
        content: req.body.content,
        active: req.body.active,
        category: categories[req.body.category]
    }

    //Update
    Page.findByIdAndUpdate(req.params.id, data, callback);

}

module.exports.retrieve = (req, res) => {

    //Retrieve all documents in DB
    Page.findById(req.params.id)
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

module.exports.retrieveAll = (req, res) => {

    //Retrieve all documents in DB
    Page.find({})
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


//Handle post delete
module.exports.delete = (req, res) => {
    Page.remove({ _id: req.params.id });
    res.status(200).json({
        message: `Deleted Page ${req.params.id}`
    });
}