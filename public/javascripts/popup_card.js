let previewContainer = document.querySelector('.books-preview');
let previewBox = document.querySelectorAll('.preview');

let books = document.querySelectorAll('.book-container .book');
books.forEach(book => {
    book.addEventListener('click', () => {
        previewContainer.style.display = 'flex';
        let name = book.getAttribute('data-name');
        previewBox.forEach(preview => {
            let target = preview.getAttribute('data-target');
            if (name == target) {
                preview.classList.add('active');
            }
        })
    })
})

previewBox.forEach(close => {
    close.querySelector('.fa-times').addEventListener('click', () => {
        close.classList.remove('active');
        previewContainer.style.display = 'none';
    })
})
