const router = require('express').Router();

const userController = require('../controllers/user');

/*DON'T DELETE. VERY IMPORTANT*/
//Create new user
// router.post('/add', userController.add);

//Authenticate user
router.post('/login', userController.login);

//Check if user is signed in
// router.get('login', userController.checkLogin);


module.exports = router;