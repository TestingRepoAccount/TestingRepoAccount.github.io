const jwt = require('jsonwebtoken');
const secretKey = 'elJmzvy0I!!8';

module.exports.verify_token = function (req, res, next) {
    try {
        if (!req.headers.authorization) throw new Error('UnAuthorized, Valid Token is Needed to Continue.');
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretKey);
        req.token = decoded;
        // console.log(decoded)
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
        // generalService.catchResponse(res, error);
    }
}