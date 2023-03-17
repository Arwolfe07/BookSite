const mongoose = require('mongoose');
const Book = require('../models/book')

mongoose.connect("mongodb://localhost:27017/booksDb");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const seedDb = async () => {
    await Book.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const book = new Book({
            name: `${i} Book`,
            description: `${i} Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae tempora neque vero atque, labore unde quae nihil placeat incidunt delectus libero est et cum velit, impedit eligendi numquam itaque nostrum?`,
            image: {
                url: 'https://res.cloudinary.com/des95gv2m/image/upload/v1678278525/WolfeChemE/mscda4xivaxb5c1iozmv.jpg',
                filename: 'WolfeChemE/mscda4xivaxb5c1iozmv'
            },
        })
        await book.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});