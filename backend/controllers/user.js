const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Secret key generated via lastpass <3
const secretKey = 'elJmzvy0I!!8';

//Create new user
module.exports.add = (req, res) => {
    //Hash passcode
    const hashPassword = bcrypt.hashSync(req.body.password, 8);
    const _id = mongoose.Types.ObjectId();
    //Create new user
    const user = new User({
        _id: _id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword
    });
    //Authenticate token
    const token = jwt.sign({ _id }, secretKey, {
        expiresIn: 86400
    });
    //Save user to DB
    user
        .save()
        .then(result => {
            res.status(200).json({
                message: `New user hase been created ${req.body.firstname}`,
                auth: true,
                token: token
            });
        })
        .catch(error => {
            res.status(500).json({
                error,
                message: 'Invalid signup'
            });
        })

}

//Authenticate user
module.exports.login = (req, res) => {
    //Find user by email
    User.findOne({ email: req.body.email }, function (err, user) {
        //Check if any errors are present
        if (err) return res.status(500).json({
            err: err,
            message: 'invalide criteria'
        });
        if (!user) return res.status(404).json({
            err: err,
            message: 'invalide criteria'
        });
        //Ensure password is valid, matching hash stored on DB
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        const token = jwt.sign({ id: user._id }, secretKey, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({ auth: true, token: token });
    });
}

//Unauthenticate user
module.exports.logout = (req, res) => {
    //Send null token
    res.status(200).json({ auth: false, token: null });
}

//Check if user is loged in
// module.exports.checkLogin = (req, res) => {
//     const token = req.headers['x-access-token'];
//     if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

//     jwt.verify(token, secretKey, function (err, decoded) {
//         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

//         res.status(200).send(decoded);
//     });
// }
