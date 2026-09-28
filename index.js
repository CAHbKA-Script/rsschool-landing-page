//**************
//switcher theme
//**************
let toggleSun = document.getElementsByClassName('toggle__sun')[0];
let toggleMoon = document.getElementsByClassName('toggle__moon')[0];
let lightTheme = localStorage.getItem('theme') !== 'false';

if (!lightTheme) {
  document.body.classList.toggle('dark-theme');
  toggleMoon.classList.add('toggle-active');
}
else {
  toggleSun.classList.add('toggle-active');
}

if (toggleSun) {
  toggleSun.addEventListener('click', ()=> {
    if (!lightTheme) {
      lightTheme = true;
      localStorage.setItem('theme', JSON.stringify(lightTheme));
      document.body.classList.toggle('dark-theme');
      toggleSun.classList.add('toggle-active');
      toggleMoon.classList.remove('toggle-active');
    }
  });
}

if (toggleMoon) {
  toggleMoon.addEventListener('click', ()=> {
    if (lightTheme) {
      lightTheme = false;
      localStorage.setItem('theme', JSON.stringify(lightTheme));
      document.body.classList.toggle('dark-theme');
      toggleMoon.classList.add('toggle-active');
      toggleSun.classList.remove('toggle-active');
    }
  });
}

//**************
//slider
//**************
let sliderArrows = document.getElementsByClassName('slider__arrow');
let sliderItems = document.querySelectorAll('.slider-item');
let sliderLines = document.querySelectorAll('.slider-line');

if (sliderArrows && sliderItems) {
  let sliderArrowsArray = Array.from(sliderArrows);
  let leftArrow, rightArrow;

  sliderArrowsArray.forEach(element => {
    if (element.classList.contains('left-arrow')) {
      leftArrow = element;
      leftArrow.addEventListener('click', ()=>{
        let position = sliderItems[0].style.translate;
        moveSlider(position, false);
      })
    }
    else {
      rightArrow = element;
      rightArrow.addEventListener('click', ()=>{
        let position = sliderItems[0].style.translate;
        moveSlider(position, true);
      })
    }
  });
}

function moveSlider (value, isRight) {
  let limitMoves = (sliderItems.length - 1) * 100;
  let parseValue = parseInt(value) || 0;
  let newTranslateValue = isRight ? parseValue - 100 : parseValue + 100;
  if (newTranslateValue < -limitMoves) newTranslateValue = 0;
  else if (newTranslateValue > 0) newTranslateValue = -limitMoves;
  let activeLine =  Math.abs(newTranslateValue / 100);
  for (let i = 0; i < sliderItems.length; i++) {
    sliderItems[i].style.translate = `${newTranslateValue}%`;
    activeLine === i ? sliderLines[i].classList.add('slider-line--active') 
      : sliderLines[i].classList.remove('slider-line--active');
  }
}

//**************
//menu select
//**************
let menuButtons = document.querySelectorAll('.menu-select>button');
let menuSections = document.querySelectorAll('.menu-section');

if (menuButtons && menuSections) {
  menuButtons.forEach(button => {
    button.addEventListener('click', () => {
      menuButtons.forEach(el => el.classList.remove('select-item--active'));
      button.classList.add('select-item--active');
      menuSections.forEach(el => {
        if (el.dataset.section === button.dataset.button) {
          el.classList.add('section--active');
        }
        else el.classList.remove('section--active');
      });
    });
  });
}

//**************
//create menu cards 
//**************
import {COFFEE, TEA, DESSERT} from "./data.js"

if (menuSections) {
  menuSections.forEach(el => {
    let wrapper = el.querySelector('.wrapper');
    switch (el.dataset.section) {
      case 'coffee': {
        wrapper.append(createCard(JSON.parse(COFFEE), 'coffee'));
        break;
      }
      case 'tea': {
        wrapper.append(createCard(JSON.parse(TEA), 'tea'));
        break;
      }
      case 'dessert': {
        wrapper.append(createCard(JSON.parse(DESSERT), 'dessert'));
        break;
      }
    }
  })
}

function createCard (data, type) {
  let ul = document.createElement('ul');
  ul.className = 'products-items';

  for (let i = 0; i < data.length; i++) {
    let img = document.createElement('div');
    img.className = 'products-item__img';
    img.style.backgroundImage = data[i].url;
  
    let title = document.createElement('h3');
    title.appendChild(document.createTextNode(data[i].title));
    let description = document.createElement('p');
    description.className = 'text-medium';
    description.appendChild(document.createTextNode(data[i].description));
    let price = document.createElement('h3');
    price.className = 'products-item__price';
    price.appendChild(document.createTextNode(data[i].price));

    let content = document.createElement('div');
    content.className = 'products-item__content';
    content.append(title, description, price);

    let a = document.createElement('a');
    a.setAttribute('href', '#');
    a.className = 'products-item__link';
    a.append(img, content);

    let article = document.createElement('article');
    article.className = 'products-item';
    article.appendChild(a);
    let li = document.createElement('li');
    li.appendChild(article);

    // `<li>
    //  <article class="products-item">
    //    <a href="#" class="products-item__link">
    //      <div class="products-item__img">
    //      </div>
    //      <div class="products-item__content">
    //        <h3>${data[i].title}</h3>
    //        <p class="text-medium">${data[i].description}</p>
    //        <h3 class="products-item__price">${data[i].price}</h3>
    //      </div>
    //    </a>
    //  </article>
    // </li>`

    li.addEventListener('click', () => {
      document.body.insertAdjacentHTML('beforeend', createPopup(data[i], type));
      let popup = document.querySelector('.popup');
      if (popup) {
        popup.focus();
        document.body.classList.add('body-no-scroll');
      }
    });

    ul.appendChild(li)
  }

  return ul;
}

function createPopup (data, type) {
  let additives;
  switch (type) {
    case 'coffee': 
      additives = ['Sugar', 'Cinnamon', 'Syrup'];
      break;
    case 'tea': 
      additives = ['Sugar', 'Lemon', 'Syrup'];
      break;
    case 'dessert': 
      additives = ['Berries', 'Nuts', 'Jam'];
      break;
  } 
  return `
    <div class="popup" tabindex="-1" onkeydown="keyDownHandler(event)" onclick="popupClick(event)">
      <div class="popup-model">
        <div class="popup-img">
          <img src="./../${data.url}" alt="product image">
        </div>
        <div class="popup-content">
          <div class="popup-content__item">
            <h3 class="popup-content__title">${data.title}</h3>
            <p class="text-medium">${data.description}</p>
          </div>
          <div class="popup-content__item popup-content__size-buttons">
            <span class="text-medium">Size</span>
            <div class="menu-select">
              <button type="button" data-price="0.00" onclick="sizeButtonHandler(this)" class="select-item select-item--active">
                <div class="select-item__text">
                  <span>S</span>
                </div>
                <span>200 ml</span>
              </button>
              <button type="button" data-price="1.00" onclick="sizeButtonHandler(this)" class="select-item">
                <div class="select-item__text">
                  <span>M</span>
                </div>
                <span>300 ml</span>
              </button>
              <button type="button" data-price="2.00" onclick="sizeButtonHandler(this)" class="select-item">
                <div class="select-item__text">
                  <span>L</span>
                </div>
                <span>400 ml</span>
              </button>
            </div>
          </div>
          <div class="popup-content__item">
            <span class="text-medium">  </span>
            <div class="menu-select">
              <button type="button" data-price="0.05" onclick="additivesButtonHandler(this)" class="select-item">
                <div class="select-item__text">
                  <span>1</span>
                </div>
                <span>${additives[0]}</span>
              </button>
              <button type="button" data-price="0.10" onclick="additivesButtonHandler(this)" class="select-item">
                <div class="select-item__text">
                  <span>2</span>
                </div>
                <span>${additives[1]}</span>
              </button>
              <button type="button" data-price="0.15" onclick="additivesButtonHandler(this)" class="select-item">
                <div class="select-item__text">
                  <span>3</span>
                </div>
                <span>${additives[2]}</span>
              </button>
            </div>
          </div>
          <div class="popup-content__item popup-content__price-item">
            <h3>Total:</h3>
            <h3 class="price-item" data-price="0.00">${data.price}</h3>
          </div>
          <div class="popup-content__item popup-content__info-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_268_11673)">
              <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_268_11673">
              <rect width="16" height="16" fill="white"/>
              </clipPath>
              </defs>
            </svg>
            <p class="text-caption">The total price depends on the selected size and additives.<br> After adding the item, you can review it in My order.</p>
          </div>
          <div class="popup-content__item">
            <button onclick="closePopup()" type="button" class="popup_close">Close</button>
          </div>
        </div>
      </div>
    </div>`;
}

window.closePopup = function  () {
  let popup = document.querySelector('.popup');
  if (popup) {
    document.body.removeChild(popup);
    document.body.classList.remove('body-no-scroll');
  }
}

window.popupClick = function (event) {
  if (event.target.classList.contains('popup')) closePopup();
}

window.keyDownHandler = function (el) {
  if (el.key === 'Escape' || el.key === 'Esc') closePopup();
}

window.sizeButtonHandler = function (el) {
  let buttons = document.querySelectorAll(".popup-content__item.popup-content__size-buttons button");
  const priceItem = document.querySelector('.popup-content__price-item>.price-item');
  let price = parseFloat(priceItem.textContent.replace('$', ''));
  
  for (let button of buttons) {
    button.classList.remove('select-item--active');
    if (button == el) {
      button.classList.add('select-item--active');
      let newPrice = (price + (+el.dataset.price) - (+priceItem.dataset.price)).toFixed(2);
      priceItem.dataset.price = el.dataset.price;
      priceItem.textContent = '$' + newPrice;
    }
  }
}

window.additivesButtonHandler = function (el) {
  const priceItem = document.querySelector('.popup-content__price-item>.price-item');
  if (priceItem) {
    let price = parseFloat(priceItem.textContent.replace('$', ''));
    if (el.classList.contains('select-item--active')) {
      let newPrice = (price - (+el.dataset.price)).toFixed(2);
      priceItem.textContent = '$' + newPrice;
    }
    else {
      let newPrice = (price + (+el.dataset.price)).toFixed(2);
      priceItem.textContent = '$' + newPrice;
    } 
  }
  el.classList.toggle('select-item--active')
}