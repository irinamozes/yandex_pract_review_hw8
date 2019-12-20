class Validation {
    constructor(inp1Element, inp2Element, error1Element, error2Element, buttonElement, isNew = true) {
        this.inp1Element = inp1Element;
        this.inp2Element = inp2Element;
        this.error1Element = error1Element;
        this.error2Element = error2Element;
        this.buttonElement = buttonElement;
        this.isNew = isNew;
        this.isOk = true;

        this.validateForm = this.validateForm.bind(this);
        this.inputEvent = this.inputEvent.bind(this);
        this.toggleButtonSubmit = this.toggleButtonSubmit.bind(this);
        this.inputEvent();
    }

    // 0 - пустая строка
    // 1 - ок
    // 2 - слишком длинная или короткая

    static validateLenghtStr(str, min, max) {
            if (str.length === 0)
                return 0;
            if (str.length >= min && str.length <= max)
                return 1;
            return 2;
    }

    static validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }


    toggleButtonSubmit() {
        if (this.isOk) {
            this.buttonElement.classList.add("popup__button_enable");
        } else {
            this.buttonElement.classList.remove("popup__button_enable");
        }
    }

    validateForm() {
        this.isOk = true;

        switch (Validation.validateLenghtStr(this.inp1Element.value, 2, 30)) {
            case 0: this.error1Element.textContent = "Это обязательное поле"; this.isOk = false; break;
            case 1: this.error1Element.textContent = ""; break;
            case 2: this.error1Element.textContent = "Должно быть от 2 до 30 символов"; this.isOk = false; break;
        }

        if (this.isNew === false) {
            switch (Validation.validateLenghtStr(this.inp2Element.value, 2, 30)) {
                case 0: this.error2Element.textContent = "Это обязательное поле"; this.isOk = false; break;
                case 1: this.error2Element.textContent = ""; break;
                case 2: this.error2Element.textContent = "Должно быть от 2 до 30 символов"; this.isOk = false; break;
            }

        } else {
            if (Validation.validURL(this.inp2Element.value)) {
                this.error2Element.textContent = "";
            } else {
                this.error2Element.textContent = "Здесь должна быть ссылка";
                this.isOk = false;
            }
        }

        this.toggleButtonSubmit();
    }

    inputEvent() {
        this.inp1Element.addEventListener("input", this.validateForm);
        this.inp2Element.addEventListener("input", this.validateForm);
    }

}