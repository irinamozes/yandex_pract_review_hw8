class Card {
        constructor (name, link) {
        /* REVIEW. Можно лучше: как мне кажется, логичнее вызывать метод create в методе addCard класса CardList, передав экземпляр класса Card в
        CardList в качестве параметра и затем метод addCard использовать в методе рендера карточек.*/
        this.cardElement = this.create(name, link);
        /* REVIEW. Можно лучше: добавлять обработчики событий лучше (для расширяемости проекта, удобства удаления обработчиков, быстродействия при рендере списка)
        не на каждый элемент каждой карточки, а на контейнер карточек, или document. Например, можно передавать экземпляр класса Card в качестве
        параметра в конструктор класса CardList и, после рендера всех карточек, используя методы экземпляра Card (like, remove) и event.target, навесить
        обработчики на document. */
        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    }


    create(name, link) {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');

        const placeLink = document.createElement('div');
        placeLink.classList.add('place-card__image');
        placeLink.style.backgroundImage = `url(${link})`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('place-card__delete-icon');

        const placeCardDescription = document.createElement('div');
        placeCardDescription.classList.add('place-card__description');

        const placeName = document.createElement('h3');
        placeName.classList.add('place-card__name');
        placeName.textContent = name;

        const likeButton = document.createElement('button');
        likeButton.classList.add('place-card__like-icon');

        const popupImageClose = document.querySelector('.popupImage__close');


        placeCard.appendChild(placeLink);
        placeLink.appendChild(deleteButton);

        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeName);
        placeCardDescription.appendChild(likeButton);

         /* REVIEW. Надо исправить. Не следует создавать экземпляры одного класса в другом. Экземпляр класса можно передать как параметр в конструктор
         другого класса. К тому же в данном случае добавление события раскрытия большого фото лучше осуществить в классе Popup, так как это фото - popup. */
        new Popup(placeLink, popupImageClose);

        /* REVIEW. Можно лучше:  можно было бы создать метод remove и использовать его в качестве коллбэка, так же, как like.*/
        deleteButton.addEventListener('click', (e) => {
            const targetClassName = e.target.className;
            if (targetClassName === 'place-card__delete-icon') {
                list.removeChild(placeCard);
            }
        })

    /* REVIEW. Отлично! Вы делаете возврат элемента карточки. Его можно использовать в дальнейшем. */
        return placeCard;
    }

    like(event){
        event.target.classList.toggle('place-card__like-icon_liked');
    }


}

class CardList {
    constructor(cardsContainer, cardsList) {
        this.cardsContainer = cardsContainer;
        this.cardsList = cardsList;
    }

    /* REVIEW. Можно лучше: метод addCard не участвует в рендере карточек.  Как его можно было бы задействовать в рендере карточек рассказано в REVIEW выше */
    addCard(card) {
        this.cardsContainer.appendChild(card);
    }

    /* REVIEW. Можно лучше: для рендера можно использовать метод forEach по массиву initialCards и метод addCard класса cardList, без получения массива
    cardsList из initialCards с помощью map */
    render() {
        for(let i = 0; i < this.cardsList.length; i++) {
            const card = this.cardsList[i];
            const cardElement = card.cardElement;
            this.cardsContainer.appendChild(cardElement);
        }
    }
}
/* REVIEW. Можно лучше: в классе PopUp можно предусмотреть закрытие окон PopUp по клавише Esc, обработав событие keydown в этом классе. */
class Popup {
    constructor(openButton, closeButton) {
        this.openButton = openButton;
        this.closeButton = closeButton;
        this.openButton.addEventListener('click', this.open);
        console.log(this.open);
        this.closeButton.addEventListener('click', this.close);
    }

    open(event) {
        const targetClassName = event.target.className;
        if (targetClassName === 'place-card__image') {
            const popupImageContent = document.querySelector('.popupImage');
            popupImageContent.classList.toggle('popupImage_is-opened');
            const popupImage = document.querySelector('.popupImage__picture');
            popupImage.src = event.target.style.backgroundImage.slice(4, -1).replace(/"/g, "");
        } else if (targetClassName === 'button user-info__button') {
            popup.classList.toggle('popup_is-opened');
        } else if (targetClassName === 'button edit__button') {
            popupProfile.classList.toggle('popupPr_is-opened');
            const userName = document.querySelector('.user-info__name');
            const userOccupation = document.querySelector('.user-info__job');
            formProf.elements.name.value = userName.textContent;
            formProf.elements.occupation.value = userOccupation.textContent;
        }
    }

    close(event) {
        console.log(event.target.className);
        const targetClassName = event.target.className;
        if (targetClassName === 'popupImage__close') {
            popupImage.classList.remove('popupImage_is-opened');
        } else if (targetClassName === 'popup__close') {
            popup.classList.remove('popup_is-opened');
        } else if (targetClassName === 'popupPr__close') {
            popupProfile.classList.remove('popupPr_is-opened');
        }
    }

}


/* REVIEW. Надо исправить: код, не содержащий объявления классов, содержащий только объявление констант и создание экземпляров классов и запуск их методов,
должен быть вынесен в отдельный файл и обёрнут в IIFE функцию или просто какую-либо функцию, для того, чтобы объявленные переменные и константы не находились
в глобальной области видимости и не могли конфликтовать с переменными возможно загружаемых сторонних скриптов. */

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];

const list = document.querySelector('.places-list');
/* REVIEW. Можно лучше: интересная находка получения массива элементов из массива объектов для рендера карточек в цикле for. Но, если использовать
для рендера метод forEach по массиву initialCards и метод addCard класса cardList, такого преобразования делать не нужно */
const cards = initialCards.map(initialCard => new Card(initialCard.name, initialCard.link));
const cardList = new CardList(list, cards);
cardList.render();


const popupImage = document.querySelector('.popupImage');
const userInfo = document.querySelector('.user-info');
const userInfoButton = userInfo.querySelector('.user-info__button');
const popup = document.querySelector('.popup');
const addButton = document.querySelector('.edit__button');
const popupProfile = document.querySelector('.popupPr');
const closeButton = document.querySelector('.popup__close');
const closeProfileButton = document.querySelector('.popupPr__close');
const formProf = document.forms.editProfile;
const form = document.forms.new;

new Popup(userInfoButton, closeButton);
new Popup(addButton, closeProfileButton);

/* REVIEW. Надо исправить: все операции над DOM должны быть инкапсулированы и  производиться внутри класса. Поэтому нижележащие функции
должны быть перенесены в качестве методов в какие-либо классы.*/

formProf.addEventListener('submit', editProfile);
formProf.addEventListener('input', checkInput);

form.addEventListener('submit',addCard);
form.addEventListener('input', checkInput);

/* REVIEW. Можно лучше: поскольку нижеследующая функция является коллбэком для события submit формы, ее лучше назвать так, чтобы в названии
было слово submit.*/
function addCard(event) {
    event.preventDefault();
    const name = form.elements.name.value;
    const link = form.elements.link.value;


    cardList.addCard(new Card(name, link).cardElement);
    form.reset();
    popup.classList.remove('popup_is-opened');
    const button = form.querySelector(".popup__button");
    enableButton(button, false);
}

/* REVIEW. Можно лучше: точно так же, как и предыдущая функция, поскольку  функция editProfile является коллбэком для события submit формы, ее лучше
назвать так, чтобы в названии было слово submit.*/
function editProfile(event) {
    event.preventDefault();
    const userName = document.querySelector('.user-info__name');
    const userOccupation = document.querySelector('.user-info__job');
    userName.textContent = formProf.elements.name.value;
    userOccupation.textContent = formProf.elements.occupation.value;
    formProf.reset();
    popupProfile.classList.remove('popupPr_is-opened');
    const button = formProf.querySelector(".popupPr__button");
    enableButton(button, false);
}


function checkInput(event) {
    const saveButton = event.currentTarget.querySelector(".button");
    if (validateCurrentInput(event.target) && validateAllInputs(event.currentTarget)) {
        enableButton(saveButton, true);
    } else {
        enableButton(saveButton, false);
    }
}


function validateCurrentInput(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if(element.value === "") {
        errorElement.textContent = 'Это обязательное поле';
        activateError(errorElement);
        return false;
    } else if (!element.checkValidity()) {
        errorElement.textContent = 'Должно быть от 2 до 30 символов';
        activateError(errorElement);
        return false;
    } else if(element.id==="URL") {
        if (!validateURL(element)){
            errorElement.textContent = 'Здесь должна быть ссылка';
            activateError(errorElement);
            return false;
        }
    }
    resetError(errorElement);
    return true;
}

function validateAllInputs(form) {
    const inputs = Array.from(form.getElementsByTagName("input"));
    const errors = form.querySelectorAll(".error-message");

    let isValidForm = true;

    inputs.forEach((input) => {
        if (input.value === "") isValidForm = false;
    });

    errors.forEach((error) => {
        if (error.textContent !== "") isValidForm = false;
    });

    return isValidForm;
}


function activateError(element) {
    element.parentNode.classList.add('input-container__invalid');
}

function resetError(element) {
    element.parentNode.classList.remove('input-container__invalid');
    element.textContent = '';
}

function enableButton(button, enabled) {
    if (enabled) {
        button.disabled = false;
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
    } else {
        button.disabled = true;
        button.style.backgroundColor = 'white';
        button.style.color = 'grey';
    }
}

function validateURL(element) {
    const url = element.value;
    let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return pattern.test(url);
}


/* REVIEW. Резюме.
Код  выполняет требуемый по заданиям функционал, кроме правильной валидации формы профиля (задания 6,7),
а именно: при открытии формы профиля кнопка "сохранить"  не активна, хотя должна быть активна, так как при открытии в форме содержится верная информация.
Рекомендация по исправлению: необходимо запускать функцию валидации формы при каждом её открытии.

В чем достигнут успех.
1. В коде использованы стрелочные функции.
2. Использовано надежное регулярное выражение для валидации ссылки.
3. Используется интерполяция строк из ES6.

Что можно улучшить.
1. Использовать метод forEach вместо цикла for для рендера карточек без преобразования исходного массива с помощью метода map.
2. Везде, где это возможно, использовать делегирование событий.
3. Более чётко определить функции, возложенные на каждый метод классов и место этих методов в классах.
4. В проекте можно предусмотреть закрытие окон PopUp по клавише Esc.


Что нужно исправить и над чем надо работать.

Цель задания была разбиение кода проекта на отдельные классы. Чтобы разбиение было более полным и структурированным,
нужно внести следующие изменения:

1. Не создавать экземпляры одного класса в других классах. Передавать экземпляры классов другим классам в качестве параметров.
2. Переместить операции над ДОМ, которые не содержатся ни в одном из классов, в подходящие им по смыслу классы, с возможной переработкой операций.
3. Код каждого класса поместить в отдельный файл. Все файлы с расширением js поместить в отдельную папку проекта. Осуществить загрузку всех файлов
js в index.html.
4. Организовать корневую точку сборки проекта - файл, где не объявляются классы, но происходит инициализация всего проекта. В ней создаются
   экземпляры классов, запускаются методы классов, инициализирующие проект. Так же файл index.js может содержать входные данные проекта, никаких
   логических операций он  содержать не должен. Здесь классы получают свои аргументы в виде экземпляров других классов,
   констант и коллбэк-функций.
5. Весь код index.js должен быть обернут в IIFE-функцию. или просто в какую-либо функцию, чтобы защитить своё содержимое от глобальной
   области видимости.

Ниже представлен вариант возможной организации кода задания.

Код задания можно разбить на 5 классов.
1. Класс Card, который формирует и возвращает одну карточку, имеющий методы create, like, remove.
2. Класс CardList, отрисовывающий карточки на страницу, принимающий в своём конструкторе в качестве параметров элемент-контейнер для карточек,
   массив карточек, экземпляр класса Card.
   Он имеет методы addCard, отвечающий за экземпляр карточки, принятой от Card и метод render, отвечающий за представление всего списка карточек
   на странице.
3. Класс UserInfo, отрисовывающий информацию о пользователе на страницу. В качестве параметров ему нужны 2 элемента, представляющие информацию
   о пользователе на странице и значения полей ввода в форму профиля.
4. Класс Validation, отвечающий за валидацию полей ввода. В качестве параметров ему нужны элементы полей ввода форм с их значениями,
   а так же элементы с сообщениями об ошибках для каждого поля ввода. Класс содержит функции валидации в качестве своих методов.
5. Класс Popup, отвечающий за поведение и содержимое всплывающих окон - большой картинки и двух форм.
   В качестве своих параметров он принимает экземпляры классов CardList (или Card), UserInfo, Validation, а так же элементы-контейнеры всплывающих окон.
   Каждый класс должен быть помещён в отдельный файл. Осуществить загрузку всех файлов js в index.html.
   Так же в проекте должен присутствовать файл, не содержащий определения классов, index.js - корневая точка сборки нашего проекта. В ней создаются
   экземпляры классов, запускаются методы классов, инициализирующие проект.
   Классы получают свои аргументы в виде экземпляров других классов, констант и коллбэк-функций.
   Весь код index.js должен быть обернут в IIFE-функцию. или просто в какую-либо функцию, чтобы защитить своё содержимое от глобальной
   области видимости.
*/