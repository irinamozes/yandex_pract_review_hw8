class Popup {
    constructor({ formPopupAddCard, formPopupProfile, bigSizeImage }, userInfoInst, validProfileInst, validCardInst, cardListInst) {
        this._formPopupAddCard = formPopupAddCard;
        this._formPopupProfile = formPopupProfile;
        this._bigSizeImage = bigSizeImage;

        this._userInfo = userInfoInst;
        this._validProfile = validProfileInst;
        this._validCard = validCardInst;
        this._cardList = cardListInst;

        this.clickPopup();

    }

    clickPopup() {
        document.addEventListener("click", (event) => {
            if ((!event.target.classList.contains('place-card__image')) && (!event.target.classList.contains('popup__close')) && (!event.target.classList.contains('button'))) {
                return;
            }

            if (event.target.classList.contains('place-card__image')){
                const popupImage = document.querySelector('.popup__image');
                popupImage.src = event.target.style.backgroundImage.slice(5, -2);
                this.open(this._bigSizeImage);
                document.addEventListener("keydown", (event) => {
                    if (event.keyCode === 27) {
                        this.close(this._bigSizeImage);
                    }
                });
            }

            if (event.target.classList.contains('user-info__edit')) {
                this._userInfo.formProfileInit();
                this._validProfile.validateForm();
                this.open(this._formPopupProfile);
                document.addEventListener("keydown", (event) => {
                    if (event.keyCode === 27) {
                        this.close(this._formPopupProfile);
                    }
                });

            }

            if (event.target.classList.contains('user-info__button')) {
                this._validCard.validateForm();
                this.open(this._formPopupAddCard);
                document.addEventListener("keydown", (event) => {
                    if (event.keyCode === 27) {
                        this.close(this._formPopupAddCard);
                    }
                });
            }

            if (event.target.className === 'popup__close') {
                this.close(event.target.parentNode.parentNode);

            }

        });


        document.querySelector('#profile form').addEventListener("submit", (event) => {
            this.submitFormProfile(event, this._userInfo.formProfileFinish, this._validProfile.validateForm);
        });

        document.querySelector('#add-card form').addEventListener("submit", (event) => {
            this.submitFormAdd(event, this._cardList.addCard);
        });


    }


    open(container) {
        container.classList.add("popup_is-opened");
    }

    close(container) {
        container.classList.remove("popup_is-opened");
    }


    submitFormProfile(event, finishProfileCallback, validProfileCallback) {//коллбэк для сабмита формы профиля
        event.preventDefault();
        if (!document.querySelector("#profile .popup__button").classList.contains("popup__button_enable")) {//кнопка "выключена", т.е. данные в форме невалидные
            return;
        }

        finishProfileCallback();
        validProfileCallback();
        this.close(this._formPopupProfile);
    }

    submitFormAdd(event, addCardCallback) {
        event.preventDefault();
        const form = event.currentTarget;

        if (!document.querySelector("#add-card .popup__button").classList.contains("popup__button_enable")) {//кнопка "выключена", т.е. данные в форме невалидные
            return;
        }
        addCardCallback({ name: form.elements.name.value, link: form.elements.link.value });
        form.reset();
        this.close(this._formPopupAddCard);

    }

}
