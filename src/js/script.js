'use strict';

const select = {
  templateOf: {
    templateBook: '#template-book',
  },
  listOf: {
    list: '.books-list',
  }
};

const templates = {
  templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
};
    
const listBook = document.querySelector(select.listOf.list);


function render(){
  for(let item of dataSource.books){
    const book = templates.templateBook(item);
    const bookDom = utils.createDOMFromHTML(book);
    listBook.appendChild(bookDom);
    console.log('show listBook', listBook);
  }
}

render();