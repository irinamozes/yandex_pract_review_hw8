class Card {
    create(name, url) {
        //формируем все элементы
        this._card = document.createElement("div");
        this._card.classList.add("place-card");

        const imgCard = document.createElement("div");
        imgCard.classList.add("place-card__image");
        imgCard.style.backgroundImage = `url(${url})`;

        this._btnImgCard = document.createElement("button");
        this._btnImgCard.classList.add("place-card__delete-icon");

        const descCard = document.createElement("div");
        descCard.classList.add("place-card__description");

        const h3Card = document.createElement("h3");
        h3Card.classList.add("place-card__name");
        h3Card.textContent = name;

        this._btnLike = document.createElement("button");
        this._btnLike.classList.add("place-card__like-icon");

        //сливаем их в один
        this._card.appendChild(imgCard);
        imgCard.appendChild(this._btnImgCard);
        this._card.appendChild(descCard);
        descCard.appendChild(h3Card);
        descCard.appendChild(this._btnLike);

        return this._card;
    }

    remove(event) {
        event.currentTarget.removeChild(event.target.parentElement.parentElement);
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
}