const express = require('express');
const router = express.Router();
const { bookSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware.js');

// const Book = require('../models/book');
const books = require('../controllers/books');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});


const validateBook = (req, res, next) => {

    const { error } = bookSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

const multipleUploads = upload.fields([{name: 'image'}, {name: 'file'}])

router.route('/')
    .get(catchAsync(books.index))
    .post(isLoggedIn, multipleUploads, validateBook, catchAsync(books.addNew))

router.get('/new', isLoggedIn, books.renderNew)

router.route('/:id')
    .get(catchAsync(books.showBook))
    .put(isLoggedIn, validateBook, catchAsync(books.editBook))
    .delete(isLoggedIn, catchAsync(books.deleteBook))


router.get('/:id/edit', isLoggedIn, catchAsync(books.renderEdit))

module.exports = router;