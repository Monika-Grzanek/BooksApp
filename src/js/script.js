'use strict';

const select = {
  templateOf: {
    templateBook: '#template-book',
  },
  listOf: {
    list: '.books-list',
  },
  image: {
    coverImage: '.book__image',
    favoriteCoverImage: '.favorite',
  },
};

const templates = {
  templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
};
    
//const listBook = document.querySelector(select.listOf.list);
//const coverBooks = listBook.querySelectorAll(select.image.coverImage);
//const favoriteCoverBook = select.image.favoriteCoverImage;

function render(){
  const listBook = document.querySelector(select.listOf.list);
  for(let item of dataSource.books){
    const book = templates.templateBook(item);
    const bookDom = utils.createDOMFromHTML(book);
    listBook.appendChild(bookDom);
    console.log('show listBook', listBook);
  }
}

render();

function initActions(){
  const listBook = document.querySelector('.books-list');
  //const listBook = document.querySelector(select.listOf.list);
  //const coverBooks = listBook.querySelectorAll(select.image.coverImage);
  //const favoriteCoverBook = select.image.favoriteCoverImage;
  const coverBooks = listBook.querySelectorAll('.book__image');
  const favoriteCoverBook = 'favorite';

  const favoriteBooks = [];
  for(let cover of coverBooks){
    cover.addEventListener('dblclick', function(event){
      event.preventDefault();
      const coverDataId = cover.getAttribute('data-id');
      if(!cover.classList.contains(favoriteCoverBook)){
        favoriteBooks.push(coverDataId);
        cover.classList.add(favoriteCoverBook);
      } else {
        const bookIndex = favoriteBooks.indexOf(coverDataId);
        favoriteBooks.splice(bookIndex, 1);
        cover.classList.remove(favoriteCoverBook);
      } 
    });
  }
  console.log('show favoriteBooks', favoriteBooks);
}

initActions();