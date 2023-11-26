/**
 * открывает по клику на указанный линк модальное окно, закрывает его по клику по кнопке или нажатием "esc",
 * либо по клику на оверлэй, если оно инициализированно. Есть метод закрытия по таймауту
 * 
 * @param {string} popup - элемент документа, ссылка на который получена методом querySelector
 * @param {string} buttonClose - класс кнопки для закрытия
 * @param {string} classShow - класс, при котором модальное окно получает display: block
 * @param {number} time - время в миллисекундах для метода setClosePopupTimeOut, через которое закроется модальное окно и вызванный с ним оверлэй
 * @param {number} top - вычесленное значение высоты для попапа с учетом прокрутки страницы и заданной константы от верха
 * 
 * инициализируется методом setPopup()
 * для оверлэй запускается метод setOverlay()
 * метод setClosePopupTimeOut(time) скроет модальное оено через указанный time
 */

export default class _OpenPopup {
  constructor(popup, buttonClose, classShow, top) {
    this.popup = popup;
    this.popupWrap = this.popup.querySelector(`.popup__wrap`);
    this.button = buttonClose;
    this.classButton = '.' + this.button;
    this.selectorButton = this.popup.querySelector(this.classButton);
    this.classShow = classShow;
    this.overlay = document.querySelector(`.overlay`);
    this.hideTimeout = null;
    this.top = top;

    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this.buttonCloseClickHandler = this.buttonCloseClickHandler.bind(this);
    this._popupEscHandler = this._popupEscHandler.bind(this);
  }

  setPopup() {
    if (this.overlay !== null) {
      this.overlay.addEventListener(`click`, this._overlayClickHandler);
    }
    this._openPopup();
    this.selectorButton.addEventListener(`click`, this.buttonCloseClickHandler);
    document.addEventListener(`keydown`, this._popupEscHandler);
  }

  setOverlay() {
    if (this.overlay !== null) {
      this.overlay.classList.add(`overlay--show`);
    }
  }

  setClosePopupTimeOut(time) {
    this.hideTimeout = setTimeout(() => {
      this.buttonCloseClickHandler();
    }, time)

  }

  _openPopup() {
    if (this.popup !== null) {
      this.popup.classList.add(this.classShow);

      this.popup.style.top = this.top + 'px';
    }
  }

  _closePopup() {
    this.popup.classList.remove(this.classShow);
  }

  _overlayClickHandler() {
    this._closePopup();
    this.overlay.classList.remove(`overlay--show`);
    document.removeEventListener(`keydown`, this._popupEscHandler);
    clearTimeout(this.hideTimeout);
  }

  buttonCloseClickHandler() {
    if (this.overlay !== null) {
      if (this.overlay.classList.contains(`overlay--show`)) {
        this.overlay.classList.remove(`overlay--show`);
      }
    }

    this._closePopup();
    document.removeEventListener(`keydown`, this._popupEscHandler);
    clearTimeout(this.hideTimeout);
  }

  _popupEscHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();

      this._closePopup();
      if (this.overlay !== null) {
        this.overlay.classList.remove(`overlay--show`);
      }
      document.removeEventListener(`keydown`, this._popupEscHandler);
    }
  }
}