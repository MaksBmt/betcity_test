/**
 * Класс делает валидацию полей на отсутствие значений, количество знаков. Подключает маску для инпута телефона. Метод validateInputs
 * возвращает длину массива с ошибками. Метод clearInputs используется для очистки value инпутов.
 * 
 * @param {string} form форма документа полученная методом querySelector
 */
import IMask from 'imask';

export default class Form {
    constructor(form) {
        this.form = form;
        this.inputs = this.form.querySelectorAll('input');
        this.inputTel = this.form.querySelector('.form__input--tel');
        this.inputError = [];
        this.textErrorBox = this.form.querySelectorAll('.form__error-text');

        this._inputClickHandler = this._inputClickHandler.bind(this);
        this.mask = this._getMask();
    }

    _inputClickHandler = ({ target }) => {

        target.classList.contains('form__input--error')
            ? target.classList.remove('form__input--error')
            : '';
        target.parentElement.querySelector('.form__error-text').textContent = '';
        target.removeEventListener('click', this._inputClickHandler);
    }

    _getMask = () => {
        const maskOptions = {
            mask: '+{7}(000)000-00-00'
        };
        return IMask(this.inputTel, maskOptions);
    }

    _getErrorAtributes = (el, index, text) => {
        el.classList.add('form__input--error');
        this.textErrorBox[index].textContent = text;
        this.inputError.push(el);
    }

    validateInputs = () => {
        let errorText = '';

        this.inputError = [];
        this.inputs.forEach((i, index) => {
            i.addEventListener('input', this._inputClickHandler);

            if (i.id === 'name') {
                if (i.value.length && i.value.length < 2) {
                    errorText = 'минимум две буквы в имени';
                    this._getErrorAtributes(i, index, errorText);
                }
            }

            if (i.id === 'phone') {
                if (this.mask.unmaskedValue.length < 11 && i.value.length) {
                    errorText = 'мало цифр - надо 11';
                    this._getErrorAtributes(i, index, errorText);
                }
            }

            if (!i.value) {
                errorText = 'поле необходимо заполнить';
                this._getErrorAtributes(i, index, errorText);
            }
        });
        return this.inputError.length;
    }

    clearInputs = () => {
        this.inputs.forEach(input => input.value = '');
    }
}