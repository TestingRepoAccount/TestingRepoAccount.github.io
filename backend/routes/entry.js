//Establish new router
const router = require('express').Router();

//Create new entry controller
const entryController = require('../controllers/entry');

//Create new entry
router.post('/create', entryController.create);

//Edit entry
router.put('/update/:title&:type', entryController.update);

//Retrieve entry
router.get('/retrieve/:type', entryController.retrieve);

//Delete entry
router.delete('/delete', entryController.delete);

//Export router
module.exports = router;