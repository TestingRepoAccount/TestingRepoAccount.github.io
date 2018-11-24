const mongoose = require('mongoose');
const Page = require('../models/page');
const categories = require('../models/categories')
const moment = require('moment');
// deps for hummus
const hummus = require('hummus');
const fs = require('fs');
const streams = require('memory-streams');
const PDFRStreamForBuffer = require('./pdfr-stream-for-buffer.js');
const path = require('path');


//Handle post create
module.exports.create = (req, res) => {
    const date_exploded = req.body.date.split('/');
    console.log('processing')
    //Hold input data
    const data = {
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        date: Date.parse(moment([date_exploded[2], date_exploded[1] - 1, date_exploded[0]]).format('DD MMM YYYY')),
        tags: req.body.tags.split(","),
        content: req.body.content,
        active: req.body.active,
        category: categories[req.body.category],
    }

    if (req.body.file) data.file = req.body.file;

    const page = new Page(data);

    //Save new page
    page
        .save()
        .then((result) => {
            console.log(result)
            //Send status code 200 and json data
            res.status(200).json({
                success: true,
                message: 'New page is saved',
                data: data
            });
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                success: false,
                error: 'Invalid criteria' + error
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
        if (error) return res.status(500).json({ error: "Invalid Criteria", success: false });

        //Send result data
        if (result) return res.status(200).json({
            message: `Updated Page with ID ${req.params.id}`,
            success: true,
        });

        //Nothing returned message
        return res.status(404).json({ data: "Nothing is updated", success: false });
    }

    //Hold input data
    const data = {
        title: req.body.title,
        date: Date.parse(moment([date_exploded[2], date_exploded[1] - 1, date_exploded[0]]).format('DD MMM YYYY')),
        tags: req.body.tags.split(","),
        content: req.body.content,
        active: req.body.active,
        category: categories[req.body.category],
    }
    if (req.body.file) data.file = req.body.file;
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

module.exports.retrieveAllCategories = (req, res) => {

    //Retrieve all documents in DB
    Page.find({ category: req.params.category })
        .sort({ date: -1 })
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
    // console.log(`deleting ${req.params.id}`)
    Page.remove({ _id: req.params.id }, _ => res.status(200).json({
        message: `Deleted Page ${req.params.id}`,
        success: true
    }));

}

module.exports.upload = (req, res) => {
    // console.log('upload route!!!!!!')
    // console.log({ file: req.file })
    // res.json({ ok: 1 })
    res.status(200).json({ success: true, filename: req.file.filename })
}


module.exports.getPdfPage = (req, res) => {
    // 
    // console.log(`getting random page of ${req.params.pdf_file}`)
    const hummusReader = new hummus.createReader(path.join('tmp/', req.params.pdf_file))
    // console.log({ pages_count: test.getPagesCount() })
    const randomNumb = Math.floor(Math.random() * hummusReader.getPagesCount() + 1);
    //Getting the buffer from disk (sync just for demo purpose)
    let pdfBuffer = fs.readFileSync(path.join('tmp/', req.params.pdf_file));

    let firstPageBuffer = getFirstPage(pdfBuffer, randomNumb);

    //I wrote it back to disk for testing
    // fs.writeFileSync(path.join('tmp/', 'result.pdf'), firstPageBuffer);
    bufferToStream(firstPageBuffer).pipe(res)
    // fs.createReadStream(path.join('tmp/', 'result.pdf')).pipe(res)
}


const getFirstPage = function (buffer, randomNumb) {
    //Creating a stream, so hummus pushes the result to it
    let outStream = new streams.WritableStream();
    //Using PDFStreamForResponse to be able to pass a writable stream


    let pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(outStream));

    //Using our custom PDFRStreamForBuffer adapter so we are able to read from buffer
    let copyingContext = pdfWriter.createPDFCopyingContext(new PDFRStreamForBuffer(buffer));
    //Get the first page.
    copyingContext.appendPDFPageFromPDF(randomNumb);

    //We need to call this as per docs/lib examples
    pdfWriter.end();

    //Here is a nuance.
    //HummusJS does it's work SYNCHRONOUSLY. This means that by this line
    //everything is written to our stream. So we can safely run .end() on our stream.
    outStream.end();

    //As we used 'memory-stream' and our stream is ended
    //we can just grab stream's content and return it
    return outStream.toBuffer();
};

let Duplex = require('stream').Duplex;
function bufferToStream(buffer) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}


