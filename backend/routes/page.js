//Establish new router
const router = require('express').Router();

//Create new page controller
const pageController = require('../controllers/page');
const { verify_token } = require('../middleware/verify_token')

//Create new page
router.post('/', verify_token, pageController.create);

//Edit page
router.put('/:id', verify_token, pageController.update);

//Retrieve page
router.get('/:id', pageController.retrieve);


//Retrieve entries
router.get('/', pageController.retrieveAll);

//Retrieve entries
router.get('/category/:category', pageController.retrieveAllCategories);

//Delete page
router.delete('/:id', verify_token, pageController.delete);

//Export router
module.exports = router;