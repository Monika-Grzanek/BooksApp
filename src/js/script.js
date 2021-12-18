/* eslint-disable no-unused-vars */
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars


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
  },
  filtersOf: {
    filter: '.filters',
  },
};

const classNames = {
  image: {
    favoriteCoverImage: 'favorite', 
    coverImage: 'book__image',
    wrapperHidden: 'hidden', 
  },
  attributes: {
    attributeOne:'data-id',
    attributeTwo: 'type',
    attributeThree: 'name',
    attributeFour: 'value',
  }
};

const templates = {
  templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
};
    
class BookList {
  constructor(){
    const thisBookList = this;
    console.log('show thisBookList', thisBookList);

    thisBookList.filters = [];
    thisBookList.favoriteBooks = [];

    thisBookList.initData();
    thisBookList.getElements();
    thisBookList.render();
    thisBookList.initActions(); 
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements(){
    const thisBookList = this;

    thisBookList.bookTemplate = templates.templateBook;
    thisBookList.listBook = document.querySelector(select.listOf.list);
    thisBookList.favoriteCoverBook = classNames.image.favoriteCoverImage;
    thisBookList.findFilter = document.querySelector(select.filtersOf.filter);
  }

  render(){
    const thisBookList = this;

    for(let item of dataSource.books){
      const ratingBgc = thisBookList.determineRatingBgc(item.rating); 
      const ratingWidth = item.rating * 10;
      console.log('ratingBgc', ratingBgc);
      console.log('ratingWidth', ratingWidth);
      item['ratingBgc'] = ratingBgc;
      item['ratingWidth'] = ratingWidth;
  
      const book = thisBookList.bookTemplate(item);
      const bookDom = utils.createDOMFromHTML(book);
      thisBookList.listBook.appendChild(bookDom);
      console.log('show listBook', thisBookList.listBook);
    }
  }

  initActions(){
    const thisBookList = this;
 
    thisBookList.listBook.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElementIsBook = event.target.offsetParent.classList.contains(classNames.image.coverImage);
      if (clickedElementIsBook == true) {
        const coverDataId = event.target.offsetParent.getAttribute(classNames.attributes.attributeOne);
        if(!event.target.offsetParent.classList.contains(thisBookList.favoriteCoverBook)){
          thisBookList.favoriteBooks.push(coverDataId);
          event.target.offsetParent.classList.add(thisBookList.favoriteCoverBook);
        } else {
          const bookIndex = thisBookList.favoriteBooks.indexOf(coverDataId);
          thisBookList.favoriteBooks.splice(bookIndex, 1);
          event.target.offsetParent.classList.remove(thisBookList.favoriteCoverBook);
        } 
      }
    });
    console.log('show thisBookList.favoriteBooks', thisBookList.favoriteBooks);

     
    thisBookList.findFilter.addEventListener('click', function(event){
      const clickedElement = event.target;
      const tagName = clickedElement.tagName;
      const type = clickedElement.getAttribute(classNames.attributes.attributeTwo);
      const name = clickedElement.getAttribute(classNames.attributes.attributeThree);
      const value = clickedElement.getAttribute(classNames.attributes.attributeFour);

      if(tagName == 'INPUT' && type == 'checkbox' && name == 'filter' && clickedElement.checked){
        thisBookList.filters.push(value);
        console.log('value', value);
      } else if (tagName == 'INPUT' && type == 'checkbox' && name == 'filter' && !clickedElement.checked) {
        console.log('remove filter', value);
        const filterIndex = thisBookList.filters.indexOf(value);
        thisBookList.filters.splice(filterIndex, 1);
      }
      console.log('show thisBookList.filters', thisBookList.filters);
      thisBookList.filterBooks();
    });
  }

  filterBooks() {
    const thisBookList = this;

    for(let item of dataSource.books){
      let shouldBeHidden = false;
      for(const filter of thisBookList.filters){
        if(!item.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const coverBooks = thisBookList.listBook.querySelector('.book__image[data-id="' + item.id + '"]');
      if(shouldBeHidden){
        coverBooks.classList.add(classNames.image.wrapperHidden);
      } else {
        coverBooks.classList.remove(classNames.image.wrapperHidden);
      }
      console.log('show coverBooks', coverBooks);
    }
  }

  determineRatingBgc(rating) {
    
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
}

const app = new BookList();





