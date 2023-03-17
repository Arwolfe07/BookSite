const Book = require('../models/book');

module.exports.index = async (req, res) => {
    const books = await Book.find({});
    res.render('books/index', { books });
}

module.exports.showBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        req.flash('error', 'No such book found!');
        res.redirect('/books')
    }
    res.render('books/show', { book });
}

module.exports.renderNew = (req, res) => {
    if (req.user.username === process.env.ADMIN) {
        res.render('books/new');
    } else {
        req.flash('error', 'Not the Admin!');
        res.redirect('/books');
    }
}

// const book = new Book(req.body.book);
//         book.image = req.files.map(f=>({url: f.path, filename: f.filename}));

//         book.auth = req.user._id;
//         await book.save();
//         console.log(book);

module.exports.addNew = async (req, res, next) => {
    if (req.user.username === process.env.ADMIN) {

        const book = new Book(req.body.book);
        const img = req.files.image.find(i=> i.fieldname==='image')
        const doc = req.files.file.find(i=> i.fieldname==='file')
        
        book.image.url = img.path;
        book.image.filename = img.filename;
        book.file.url = doc.path;
        book.file.filename =doc.filename;
        book.auth = req.user._id;
        await book.save();
        req.flash('success', 'Successfully added a book!');
        res.redirect(`/books/${book._id}`);
    }
    else {
        req.flash('error', 'Not the Admin!');
        res.redirect('/books');
    }
}

module.exports.renderEdit = async (req, res) => {
    if (req.user.username === process.env.ADMIN) {
        const book = await Book.findById(req.params.id);
        if (!book) {
            req.flash('error', 'No such book found!');
            res.redirect('/books')
        }
        res.render('books/edit', { book });
    }
    else {
        req.flash('error', 'Not the Admin!');
        res.redirect('/books');
    }
}

module.exports.editBook = async (req, res) => {
    if (req.user.username === process.env.ADMIN) {
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, { ...req.body.book });
        req.flash('success', 'Successfully edited a book!');
        res.redirect(`/books/${book._id}`);
    } else {
        req.flash('error', 'Not the Admin!');
        res.redirect('/books');
    }
}

module.exports.deleteBook = async (req, res) => {
    if (req.user.username === process.env.ADMIN) {

        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.redirect('/books');
    }
    else {
        req.flash('error', 'Not the Admin!');
        res.redirect('/books');
    }
}