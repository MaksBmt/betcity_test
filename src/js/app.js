import OpenPopup from "./openPopup.js";
import Form from "./form.js";
import { correctMarginMain } from "./modules/functions.js";

correctMarginMain();
const TOP = 160;

const getSuccessPopup = () => {
  if (document.querySelector('.popup--success') !== null) {
    const popup = document.querySelector('.popup--success');
    const popupTop = window.scrollY + TOP;
    const formPopup = new OpenPopup(popup, 'popup__close', 'popup__show', popupTop);
    formPopup.setPopup();
    formPopup.setOverlay();
    formPopup.setClosePopupTimeOut(3000);
  }
}

if (document.querySelector('.popup--form') !== null) {

  document.querySelector('.header__button').addEventListener('click', (evt) => {
    evt.preventDefault();

    const popup = document.querySelector('.popup--form');
    const popupTop = window.scrollY + TOP;
    const formPopup = new OpenPopup(popup, 'popup__close', 'popup__show', popupTop);

    formPopup.setPopup();
    formPopup.setOverlay();

    const formBox = document.querySelector('.form');
    const form = new Form(formBox);

    formBox.onsubmit = async (e) => {
      e.preventDefault();
      const errorForm = form.validateInputs();

      if (!errorForm) {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: new FormData(formBox)
        });

        if (response.ok) {
          formPopup.buttonCloseClickHandler();
          form.clearInputs();
          setTimeout(getSuccessPopup, 300)
        } else {
          alert('Ой,что-то пошло не так и придеться повторить((')
        }
      }
    }
  });
}

const url = 'https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10';
const films = document.querySelector('.films');
const boxFilms = films.querySelector('.films__list');

const createFilm = (film) => {
  let img = film.poster.previewUrl;
  let name = film.name;
  const html = `<li class="films__item">
  <img src="${img}" alt="" class="films__img" width="300" height="300" loading="lazy">
  <div class="films__info">
    <div class="films__box">
      <span class="films__text">Название фильма:</span>
      <span class="films__text films__text--red">${name}</span>
    </div>
  </div>
</li>`
  boxFilms.insertAdjacentHTML("beforeend", html);
}

const createListFilms = (arr) => {
  arr.docs.forEach((film) => {
    createFilm(film);
  });
}

fetch(url, {
  "headers": { "X-API-KEY": "P3RTS9G-2YH4XAV-QWKVWAZ-E9XFFDQ" }
})
  .then(response => response.json())
  .then(result => createListFilms(result))
  .catch(error => console.log(error));
