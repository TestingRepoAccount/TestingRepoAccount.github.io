//Establish new router
const router = require('express').Router();

//Create new page controller
const pageController = require('../controllers/page');

//Create new page
router.post('/', pageController.create);

//Edit page
router.put('/:id', pageController.update);

//Retrieve page
router.get('/:id', pageController.retrieve);

//Retrieve entries
router.get('/', pageController.retrieveAll);

//Delete page
router.delete('/:id', pageController.delete);

//Export router
module.exports = router;