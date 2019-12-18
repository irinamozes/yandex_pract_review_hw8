// Объявляем классы

// Создание карточки, ее лайк и удаление
class Card {
    /* REVIEW. Можно лучше: параметры name и link нет необходимости задавать, как параметры всего класса, так как они нужны только методу
    createCard */
    constructor(name, link) {
        /* REVIEW. Можно лучше: как мне кажется, логичнее вызывать метод createCard в методе addCard класса CardList, передав экземпляр класса Card в
        CardList в качестве параметра.*/
        this.card = this.createCard(name, link);
    }

    createCard(name, link) {
        const theCard = document.createElement('div');
        const cardImageElement = document.createElement('div');
        const deleteIconElement = document.createElement('button');
        const cardDescription = document.createElement('div');
        const cardName = document.createElement('h3');
        const likeIcon = document.createElement('button');

        theCard.classList.add('place-card');

        cardImageElement.classList.add('place-card__image');
        /* REVIEW. Можно лучше: нет необходимости вводить новый аттрибут. Адрес большого фото можно извлечь из значения backgroundImage. */
        cardImageElement.setAttribute('imageURL', link);
        cardImageElement.style.backgroundImage = `url(${link})`;

        deleteIconElement.classList.add('place-card__delete-icon');
        cardImageElement.appendChild(deleteIconElement);

        cardDescription.classList.add('place-card__description');

        cardName.classList.add('place-card__name');
        cardName.textContent = name;

        likeIcon.classList.add('place-card__like-icon');

        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeIcon);

        theCard.appendChild(cardImageElement);
        theCard.appendChild(cardDescription);

        thePlaces.appendChild(theCard);

        /* REVIEW. Можно лучше: добавлять обработчики событий лучше (для расширяемости проекта, удобства удаления обработчиков, быстродействия при рендере списка)
        не на каждый элемент каждой карточки, а на контейнер карточек, или document. Например, можно передавать экземпляр класса Card в качестве
        параметра в конструктор класса CardList и, после рендера всех карточек, используя методы экземпляра Card и event.target, навесить обработчики на document.*/
        theCard.querySelector('.place-card__delete-icon').addEventListener('click', this.removeCard);
        theCard.querySelector('.place-card__like-icon').addEventListener('click', this.likeCard);
    }

    removeCard(event) {
        thePlaces.removeChild(event.target.closest('.place-card'));
    }

    likeCard(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
}

// Создание дефолтных карточек, добавление пользовательких  и их отрисовка
class CardList {
    constructor(container, initialCards) {
        this.container = container;

        /* REVIEW. Отлично, что Вы предусмотрели ситуацию, когда первоначальный массив карточек null! */
        this.initialCards = initialCards || [];
    }


    /* REVIEW. Можно лучше: метод addCard нигде не вызывается. Пример его возможного использования был описан в review выше. */
    addCard(name, link) {
        /* REVIEW. Надо исправить: при использовании метода addCard необходимо избавиться от создания экземпляра класса Card внутри другого класса, передав
        экземпляр класса Card в качестве параметра в конструктор класса CardList. Тогда в addCard можно сделать вызов метода класса Card createCard
        и использовать addCard для рендера карточек и добавления новой карточки. */
        const { theCard } = new Card(name, link);
        this.initialCards.push(theCard);
        this.container.appendChild(theCard);
        this.render();
    }


    /* REVIEW. Надо исправить: метод render должен отвечать только за рендер карточек на страницу. Все остальные его методы должны
    быть разнесены по другим  классам. */
    render() {
        const popup = new PopUp(document.querySelector('.popup'));
        let closeButtonArray = document.querySelectorAll('.popup__close');

        closeButtonArray.forEach(function(elem) {
            elem.addEventListener('click', function(event) {
                popup.close(event);
            });
        });

        /* REVIEW. Надо исправить: необходимо избавиться от создания экземпляра класса Card. Вместо него в коллбэке forEach можно вызывать метод addCard,
        исправленный по данному к этому методу review. */
        initialCards.forEach(function (item) {
            CardList.createCard = new Card(item.name, item.link);
        });

        /* REVIEW. Отлично! Использовано делегирование события!*/
        document.querySelector('.user-info__button').addEventListener('click', function (event) {
            popup.open(event);
        });

        document.querySelector('.user-info__edit-button').addEventListener('click', function (event) {
            popup.open(event);
        });
        /* REVIEW. Отлично! Использовано делегирование события!*/
        document.querySelector('.places-list').addEventListener('click', function (event) {
            popup.open(event);
        });

        disablePopUpButton(submitFormButton);
    }
}

// Открытие и закрытие модальных окон
/* REVIEW. Можно лучше: в классе PopUp можно предусмотреть закрытие окон PopUp по клавише Esc, обработав событие keydown. */
class PopUp {

    open(event) {
        if (event.target.classList.contains('user-info__button')) {
            popUpDialog.classList.add('popup_is-opened');
            theForm.elements.name.value = '';
            theForm.elements.link.value = '';
            disablePopUpButton(submitFormButton);
        }
        if (event.target.classList.contains('user-info__edit-button')) {
            popUpEditUserInfo.classList.add('popup_is-opened');
            theEditForm.elements.username.value = document.querySelector('.user-info__name').textContent;
            theEditForm.elements.about.value = document.querySelector('.user-info__job').textContent;
        }
        if (event.target.classList.contains('place-card__image')) {
            const bigPicture = document.querySelector('.popup__big-image');
            bigPicture.src = event.target.getAttribute('imageURL');
            popUpBigImage.classList.add('popup_is-opened');
        }
    }

    close(event) {
        if (event.target.classList.contains('popup__close')) {
            event.target.closest('.popup').classList.remove('popup_is-opened');
            if (event.target.closest('#edit-user-info')) {
                resetErrorMessages(theEditForm);
            }
            if (event.target.closest('#add-new-card')) {
                resetErrorMessages(theForm);
            }
            if (event.target.closest('#show-image')) {
                event.target.closest('#show-image').querySelector('.popup__big-image').src = '';
            }
        }
    }
}


/* REVIEW. Надо исправить: код, не содержащий объявления классов, содержащий только объявление констант и создание экземпляров классов и запуск их методов,
должен быть вынесен в отдельный файл и обёрнут в IIFE функцию или просто какую-либо функцию, для того, чтобы объявленные переменные и константы не находились
в глобальной области видимости и не могли конфликтовать с переменными возможно загружаемых сторонних скриптов. */
// Объявляем переменные
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

const thePlaces = document.querySelector('.places-list');
const openDialogButton = document.querySelector('.user-info__button');
const openEditUserButton = document.querySelector('.user-info__edit-button');
const popUpDialog = document.querySelector('#add-new-card');
const popUpEditUserInfo = document.querySelector('#edit-user-info');
const theForm = document.forms.new;
const theEditForm = document.forms.user;
const submitFormButton = popUpDialog.querySelector('.popup__button');
const submitEditUser = popUpEditUserInfo.querySelector('.popup__button');
const popUpBigImage = document.querySelector('#show-image');
const defaultCards = new CardList(this.name, this.link);
defaultCards.render();


/* REVIEW. Надо исправить: все операции над DOM должны быть инкапсулированы и  производиться внутри класса. Поэтому нижележащие функции
должны быть перенесены в качестве методов в какие-либо классы.*/
// Объявляем функции
function disablePopUpButton(button) {
    button.setAttribute('disabled', true);
    button.classList.add('popup__button_disabled');
}

function enablePopUpButton(button) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled');
}

function isValid(elementToCheck) {
    const errorElement = document.querySelector(`#error-${elementToCheck.name}`)

    if (!elementToCheck.validity.valid) {

        if (elementToCheck.validity.typeMismatch) { errorElement.textContent = 'Здесь должна быть ссылка'; }
        if (elementToCheck.value.length < Number(elementToCheck.getAttribute('minlength'))) {
            if (elementToCheck.validity.valueMissing) { errorElement.textContent = 'Это обязательное поле'; }
            else { errorElement.textContent = 'Длина должна быть от 2 до 30 символов'; }
        }
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function resetErrorMessages(parentNode) {
    const errorsCollection = Array.from(parentNode.getElementsByTagName('span'));
    errorsCollection.forEach(function (item) {
        let idToCheck = item.id;
        if (idToCheck.includes('error')) { item.textContent = ''; }
    });
}

function formInputHandler() {
    let validatePlace = isValid(theForm.elements.name);
    let validateURL = isValid(theForm.elements.link);
    if (validatePlace && validateURL) {
        enablePopUpButton(submitFormButton);
    } else {
        disablePopUpButton(submitFormButton);
    }
}

function editFormHandler() {
    let validateUserName = isValid(theEditForm.elements.username);
    let validateAbout = isValid(theEditForm.elements.about);

    if (validateUserName && validateAbout) { enablePopUpButton(submitEditUser); }
    else { disablePopUpButton(submitEditUser); }
}
/* REVIEW. Можно лучше: поскольку нижеследующая функция является коллбэком для события submit формы, ее лучше назвать так, чтобы в названии
было слово submit.*/
function editFormSubmit(event) {
    event.preventDefault();
    document.querySelector('.user-info__name').textContent = theEditForm.elements.username.value;
    document.querySelector('.user-info__job').textContent = theEditForm.elements.about.value;
    popUpEditUserInfo.classList.remove('popup_is-opened');
}

/* REVIEW. Можно лучше: точно так же, как и предыдущая функция, поскольку  функция editProfile является коллбэком для события submit формы, ее лучше
назвать так, чтобы в названии было слово submit.*/
function formAddElement(event) {
    event.preventDefault();
    const name = theForm.elements.name;
    const link = theForm.elements.link;
   /* REVIEW. Надо исправить: Не следует создавать экземпляры одного класса в другом. Экземпляр класса можно передать как параметр в конструктор
   другого класса, или в функцию */
    Card.createCard = new Card(name.value, link.value);
    theForm.reset();
    disablePopUpButton(submitFormButton);
    popUpDialog.classList.remove('popup_is-opened');
}


// Слушатели форм
theForm.addEventListener('input', formInputHandler);
theForm.addEventListener('submit', formAddElement);

theEditForm.addEventListener('input', editFormHandler);
theEditForm.addEventListener('submit', editFormSubmit);



/* REVIEW. Резюме.
Код работоспособный, в целом выполняет нужный функционал.

В чем достигнут успех.
1. Студент разобрался в валидации форм с помощью свойства элемента validity. (задание 7)
2. Почти полностью (с небольшими недочетами) сделано дополнительное задание по валидации формы добавления карточки. (задание 7)
3. Предусмотрена ситуация, когда первоначальный массив карточек  null.

Что можно улучшить.
1. Чтобы отказаться от встроенного дизайна обязательно заполняемых полей формы, лучше проводить валидацию без использования свойства
   validity. Тогда можно будет не вводить в размётке атрибуты полей ввода формы minLength и maxLength, и сообщения об ошибках смогут
   выводиться  на экран так же, как в образце задания. (задание 7).
2. Желательно исправить неправильную отрисовку названия формы Edit. Для того чтобы содержимое помещалось в своём контейнере нужно в CSS
   правилах задать свойства элемента: width: auto; height: auto. (задание 6).
3. При открытии формы добавления новой карточки не выполняется требуемый функционал по валидации, а именно:
   а)при пустых полях не выводятся сообщения: "Это обязательное поле".
   б)не сохраняется введённая информация и сообщения об ошибках при закрытии формы по крестику и последующем её открытии.
   Рекомендации по исправлению: необходимо запускать функцию валидации формы при каждом её открытии и не производить reset формы,
   если форма закрывается без добавления новой карточкию. (задание 7)
4. Везде, где это возможно, использовать делегирование событий.
5. В проекте можно предусмотреть закрытие окон PopUp по клавише Esc.

Что нужно исправить и над чем надо работать.

Цель задания была разбиение кода проекта на отдельные классы. Чтобы разбиение было более полным и структурированным,
нужно внести следующие изменения:

1. Преобразовать, или удалить неиспользуемый метод класса. ( подробнее комментарии даны в коде )
2. Метод класса, отвечающий сразу за несколько функций, разделить на несколько методов и разнести их по разным классам.
3. Не создавать экземпляры одного класса в других классах. Передавать экземпляры классов другим классам в качестве параметров.
4. Переместить операции над ДОМ, которые не содержатся ни в одном из классов, в подходящие им по смыслу классы, с возможной переработкой операций.
5. Код каждого класса поместить в отдельный файл. Осуществить загрузку всех файлов js в index.html.
6. Организовать корневую точку сборки проекта - файл, где не объявляются классы, но происходит инициализация всего проекта. В ней создаются
   экземпляры классов, запускаются методы классов, инициализирующие проект. Так же файл index.js может содержать входные данные проекта, никаких
   логических операций он  содержать не должен. Здесь классы получают свои аргументы в виде экземпляров других классов,
   констант и коллбэк-функций.
7. Весь код index.js должен быть обернут в IIFE-функцию. или просто в какую-либо функцию, чтобы защитить своё содержимое от глобальной
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
