const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const BookSchema = new mongoose.Schema({
    name: String,
    file: {
        url: String,
        filename: String
    },
    image: {
        url: String,
        filename: String
    },
    description: String,
    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

BookSchema.post('findOneAndDelete', async(book)=>{
    if(book)
    {
        await cloudinary.uploader.destroy(book.image.filename);
        await cloudinary.uploader.destroy(book.file.filename);
    }
})

module.exports = mongoose.model('Book', BookSchema);