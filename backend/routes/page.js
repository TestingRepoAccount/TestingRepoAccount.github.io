//Establish new router
const router = require('express').Router();
const multer = require('multer')
const path = require('path')
//Create new page controller
const pageController = require('../controllers/page');
const { verify_token } = require('../middleware/verify_token')

//Create new page
router.post('/', verify_token, pageController.create);

//Upload File
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload_middleware = multer({
    storage: storage, fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf') {
            return callback(new Error('Only images or PDF are allowed'))
        }
        callback(null, true)
    }
})


router.post('/upload', verify_token, upload_middleware.single('file'), pageController.upload);

//Edit page
router.put('/:id', verify_token, pageController.update);

//Retrieve page
router.get('/:id', pageController.retrieve);

//Retrieve page
router.get('/getPdfPage/:pdf_file', pageController.getPdfPage);


//Retrieve entries
router.get('/', pageController.retrieveAll);

//Retrieve entries
router.get('/category/:category', pageController.retrieveAllCategories);

//Delete page
router.delete('/:id', verify_token, pageController.delete);

//Export router
module.exports = router;