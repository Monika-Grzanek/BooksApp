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
    
const listBook = document.querySelector(select.listOf.list);
//const coverBooks = listBook.querySelectorAll(select.image.coverImage);
//const favoriteCoverBook = select.image.favoriteCoverImage;

function render(){
  //const listBook = document.querySelector(select.listOf.list);
  for(let item of dataSource.books){
    const ratingBgc = determineRatingBgc(item.rating);
    const ratingWidth = item.rating * 10;
    console.log('ratingBgc', ratingBgc);
    console.log('ratingWidth', ratingWidth);
    item['ratingBgc'] = ratingBgc;
    item['ratingWidth'] = ratingWidth;

    const book = templates.templateBook(item);
    const bookDom = utils.createDOMFromHTML(book);
    listBook.appendChild(bookDom);
    console.log('show listBook', listBook);
  }
}

function determineRatingBgc(rating) {
  let ratingBackground = '';
  if(rating < 6){
    ratingBackground = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';

  } else if (rating > 6 && rating <= 8){
    ratingBackground = 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if (rating > 8 && rating <= 9){
    ratingBackground = 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if (rating > 9){
    ratingBackground = 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
  return ratingBackground;
}


render();

function initActions(){
  const listBook = document.querySelector('.books-list');
  //const listBook = document.querySelector(select.listOf.list);
  //const coverBooks = listBook.querySelectorAll(select.image.coverImage);
  //const favoriteCoverBook = select.image.favoriteCoverImage;
  //const coverBooks = listBook.querySelectorAll('.book__image');
  const favoriteCoverBook = 'favorite';

  const favoriteBooks = [];
  //for(let cover of coverBooks){
  listBook.addEventListener('dblclick', function(event){
    event.preventDefault();
    const clickedElementIsBook = event.target.offsetParent.classList.contains('book__image');
    if (clickedElementIsBook == true) {
      const coverDataId = event.target.offsetParent.getAttribute('data-id');
      if(!event.target.offsetParent.classList.contains(favoriteCoverBook)){
        favoriteBooks.push(coverDataId);
        event.target.offsetParent.classList.add(favoriteCoverBook);
      } else {
        const bookIndex = favoriteBooks.indexOf(coverDataId);
        favoriteBooks.splice(bookIndex, 1);
        event.target.offsetParent.classList.remove(favoriteCoverBook);
      } 
    }
  });
  console.log('show favoriteBooks', favoriteBooks);

  const findFilter = document.querySelector('.filters');
  findFilter.addEventListener('click', function(event){
    const clickedElement = event.target;
    const tagName = clickedElement.tagName;
    const type = clickedElement.getAttribute('type');
    const name = clickedElement.getAttribute('name');
    const value = clickedElement.getAttribute('value');

    if(tagName == 'INPUT' && type == 'checkbox' && name == 'filter' && clickedElement.checked){
      filters.push(value);
      console.log('value', value);
    } else if (tagName == 'INPUT' && type == 'checkbox' && name == 'filter' && !clickedElement.checked) {
      console.log('remove filter', value);
      const filterIndex = filters.indexOf(value);
      filters.splice(filterIndex, 1);
    }
    console.log('show filters', filters);
    filterBooks();
  });
}

const filters = [];

function filterBooks() {
  for(let item of dataSource.books){
    let shouldBeHidden = false;
    for(const filter of filters){
      if(!item.details[filter]){
        shouldBeHidden = true;
        break;
      }
    }
    const coverBooks = listBook.querySelector('.book__image[data-id="' + item.id + '"]');
    if(shouldBeHidden){
      coverBooks.classList.add('.hidden');
    } else {
      coverBooks.classList.remove('.hidden');
    }
    console.log('show coverBooks', coverBooks);
  }
}


initActions();






