class CardList {
    constructor(initialCards, cardsContainer, cardInst) {
        this._cardInst = cardInst;
        this._cardsContainer = cardsContainer;
        this._initialCards = initialCards;

        this.addCard = this.addCard.bind(this);
        this.render = this.render.bind(this);

        this.render();
        this.clickCard();
    }

    addCard(card) {
        this._cardElement = this._cardInst.create(card.name, card.link);
        this._cardsContainer.appendChild(this._cardElement);
    }

    render() {
        this._initialCards.forEach((card) => {
            this.addCard(card);
        });
    }

    clickCard() {
        const likeEvent = this._cardInst.like;
        const removeEvent = this._cardInst.remove;

        this._cardsContainer.addEventListener(`click`, () => {
            if (event.target.classList.contains("place-card__like-icon")) {// щёлкнули по лайку
                likeEvent(event);
            } else {
                if (event.target.classList.contains("place-card__delete-icon")) { // щёлкнули по иконке удаления
                    removeEvent(event);
                }

            }

        });
    };
}