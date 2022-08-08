import { DateTime } from './node_modules/luxon/src/luxon.js'
import Storage from './modules/storage.js'

const BookData = document.querySelector('#books')
const button = document.querySelector('#add-button')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')

class Book {
  constructor (title, author) {
    this.title = title
    this.author = author
  }
}

class UI {}

UI.prototype.addBookToUI = (newBook) => {
  Storage.Books.forEach((book, index) => {
    if (book.title === newBook.title) {
      if (index % 2 === 0) {
        BookData.innerHTML += `
            <li class='book book-item'>
            <div class ='info'>
              <p class='book-title'>${newBook.title}</p>
              <p class='book-author'>&nbsp by ${newBook.author}</p>
            </div>
              <button class='remove remove-btn btn' type='button'>Remove</button>
            </li>
          `
      } else {
        BookData.innerHTML += `
            <li class='book book-item'>
            <div class ='info'>
              <p class='book-title'>${newBook.title}</p>
              <p class='book-author'>&nbsp by ${newBook.author}</p>
            </div>
              <button class='remove remove-btn btn' type='button'>Remove</button>
            </li>
          `
      }
    }
  })
}

UI.prototype.clearInputs = (element1, element2) => {
  element1.value = ''
  element2.value = ''
}

UI.prototype.removeBookFromUI = (target) => {
  target.parentElement.remove()
}

const ui = new UI()

const addBook = (e) => {
  const title = titleInput.value
  const author = authorInput.value

  const newBook = new Book(title, author)

  Storage.addBook(newBook)

  ui.addBookToUI(newBook)
  ui.clearInputs(titleInput, authorInput)

  e.preventDefault()
}

const removeBook = (e) => {
  if (e.target.className === 'remove remove-btn btn') {
    ui.removeBookFromUI(e.target)
    Storage.removeFromBooks(e.target)
  }
}

button.addEventListener('click', addBook)
BookData.addEventListener('click', removeBook)
document.addEventListener('DOMContentLoaded', () => {
  const allBooks = Storage.getBooksFromStorage()
  allBooks.forEach((book) => ui.addBookToUI(book))
})

const addNew = document.querySelector('.add-new')
const form = document.querySelector('.form')

const list = document.querySelector('.list')
const listDiv = document.querySelector('.list-div')

const contact = document.querySelector('.contact')
const contactDiv = document.querySelector('.contact-info-div')
const date = document.querySelector('.date')

addNew.addEventListener('click', () => {
  form.style.display = 'unset'
  listDiv.style.display = 'none'
  contactDiv.style.display = 'none'
})

list.addEventListener('click', () => {
  form.style.display = 'none'
  listDiv.style.display = 'unset'
  contactDiv.style.display = 'none'
})

contact.addEventListener('click', () => {
  form.style.display = 'none'
  listDiv.style.display = 'none'
  contactDiv.style.display = 'unset'
})

// eslint-disable-next-line no-unused-expressions
window.onload
listDiv.style.display = 'unset'
date.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_HUGE)
