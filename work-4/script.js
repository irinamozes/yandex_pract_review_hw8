/* URL для ручного добавления в карточку

https://images.unsplash.com/photo-1562874724-b33411b38141?ixlib=rb-1.2.1&auto=format&fit=crop&w=802&q=80
*/

/*  Инициирование массива данных */

/* REVIEW. Надо исправить: код, не содержащий объявления классов, содержащий только объявление констант и создание экземпляров классов и запуск их методов,
должен быть вынесен в отдельный файл и обёрнут в IIFE функцию или просто какую-либо функцию, для того, чтобы объявленные переменные и константы не находились
в глобальной области видимости и не могли конфликтовать с переменными возможно загружаемых других (не Ваших) скриптов. */

const initialCards = [{
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

/* Классы */

class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
    this.cardElement = this.create(name,link);
  /* REVIEW. Можно лучше: добавлять обработчики событий лучше (для расширяемости проекта, удобства удаления обработчиков, быстродействия при рендере списка)
    не на каждый элемент каждой карточки, а на контейнер карточек, или document. Например, можно передавать экземпляр класса Card в качестве
    параметра в конструктор класса CardList и, после рендера всех карточек, используя методы экземпляра Card и event.target, навесить обработчики на document. */
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
  }
  create(name, link) {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');

    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    const imageLink = 'background-image: url(' + link + ')';
    placeCardImage.setAttribute('style', imageLink);

    const placeCardDeleteIcon = document.createElement('div');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');

    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description');

    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = name;

    const placeCardLikeIcon = document.createElement('button');
    placeCardLikeIcon.classList.add('place-card__like-icon');

    cardList.container.appendChild(placeCard);
    placeCard.appendChild(placeCardImage);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCard.appendChild(placeCardDescription);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);
  /* REVIEW. Отлично! Вы делаете возврат элемента карточки. Его можно использовать в дальнейшем. */
    return placeCard;
  }
  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  remove() {
    // добавил метод removeCard для класса Card вместо этого
  }
}

 class CardList {
  constructor(container,array) {
    this.container = container;
    this.array = array;
  }

  /* REVIEW. Отлично, что метод addCard использован для рендера карточек. */
  render() {
    this.array.forEach(function (element) {
      const initName = element.name;
      const initLink = element.link;
      cardList.addCard(initName,initLink);
    });
  }

  /* REVIEW. Надо исправить. Это правильно, что Вы используете свойство класса Card в методе addCard, а затем используете addCard для рендера карточек. Но,
  1. не следует создавать экземпляры одного класса в другом. Экземпляр класса можно передать как параметр в конструктор другого класса.
  2. в Вашей реализации addCard содержит инструкции, которые не задействованы при рендере карточек и не относятся к функциям класса Cardlist.
     Поэтому, метод addCard, я думаю, лучше использовать только как коллбэк для события submit формы добавления карточки, и, возможно, назвав
     его по-другому. В классе CardList оставить преобразованный метод addCard так, чтобы он отвечал только за формирование карточки при рендере списка.*/
  addCard(name,link) {
    const { cardElement } = new Card(name, link);
    this.container.appendChild(cardElement);
    this.container.querySelectorAll('.place-card');
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup_is-opened');
    const openPopupButton = document.querySelector('.popup__button');
    openPopupButton.setAttribute('disabled', true);
    openPopupButton.classList.add('popup__button_disabled');
  }

  /* REVIEW. Можно лучше: метод removeCard относится к методам одной карточки, поэтому его лучше было оставить в классе Card.*/
  removeCard(element) {
    const firstToRemove = element.parentElement;
    const childToRemove = firstToRemove.parentElement;
    this.container.removeChild(childToRemove);
  }
}

/* REVIEW. Можно лучше: в классе PopUp можно предусмотреть закрытие окон PopUp по клавише Esc, обработав событие keydown. */
class Popup {
  constructor(container) {
    this.container = container;
  }
  open(element) {
    if (element.target.id === 'open_card') {
      const popup = document.querySelector('.popup');
      popup.classList.add('popup_is-opened');
    } else if (element.target.id === 'open_profile') {
      const popup = document.querySelector('.popup_edit-profile');
      popup.classList.add('popup_is-opened');
      fillProfile();
      validate(profile_name);
      validate(profile_about);
    } else if (element.target.classList.value === 'place-card__image') {
      const url = element.target.getAttribute('style').slice(22, -1);
      const popup = document.querySelector('.popup_open-photo');
      const photo = popup.querySelector('.popup_open-photo__image');
      popup.classList.add('popup_is-opened');
      photo.setAttribute('src', url);
    }
  }
  close(element) {
    if ((element.target.id === 'close_card')||(element.id === 'close_card_button')) {
      const popup = document.querySelector('.popup');
      popup.classList.remove('popup_is-opened');
    } else if ((element.target.id === 'close_profile')||(element.id === 'close_profile_button')) {
      const popup = document.querySelector('.popup_edit-profile');
      popup.classList.remove('popup_is-opened');
    } else if (element.target.id === 'close_photo') {
      const popup = document.querySelector('.popup_open-photo');
      popup.classList.remove('popup_is-opened');
    }
}
}

/* Определение переменных */

const cardList = new CardList(document.querySelector('.places-list'),initialCards);

const newCardPopup = new Popup(document.querySelector('.popup_create-card'));
const editProfilePopup = new Popup(document.querySelector('.popup_edit-profile'));
const openPhotoPopup = new Popup(document.querySelector('.popup_open-photo'));

const userInfoButton = document.querySelector('.user-info__button');
const openPopupButton = document.querySelector('.popup__button');
const closePopupButton = document.querySelector('.popup__close');
const form = document.forms.new; // получаем форму
const name = form.elements.name; // получаем название
const link = form.elements.link; //получаем URL картинки
const userProfileButton = document.querySelector('.user-info__edit');
const profile = document.querySelector('.popup_edit-profile');
const openProfileButton = profile.querySelector('.popup__button');
const closeProfileButton = profile.querySelector('.popup__close');
const profile_form = document.forms.profile; // получаем форму профиля
const profile_name = profile_form.elements.profile_name; // получаем имя
const profile_about = profile_form.elements.profile_about; //получаем доп. информацию
const photo = document.querySelector('.popup_open-photo');
const closePhotoButton = photo.querySelector('.popup__close');

/* Заполнение полей профиля */


/* REVIEW. Надо исправить: все операции над DOM должны быть инкапсулированы и должны производиться внутри класса. Поэтому нижележащие функции
должны быть перенесены в качестве методов в какие-либо классы.*/

/* REVIEW. Надо исправить: коды тел нескольких нижеследующих функций записаны без двухпробельных отступов с левой стороны,
 что является нарушением стиля записи кода функций.*/
function fillProfile() {
const name_content = document.querySelector('.user-info__name');
const about_content = document.querySelector('.user-info__job');
const name_target = profile.querySelector('.popup__input_type_name');
const about_target = profile.querySelector('.popup__input_type_link-url');
/* REVIEW. Надо исправить: вместо innerHTML следует использовать textContent, чтобы информация от одного элемента к другому передавалась
не как размётка, а как текст. Кроме большей безопасности, такая передача происходит гораздо быстрее.*/
name_target.value = name_content.innerHTML;
about_target.value = about_content.innerHTML;
}

/* Рендер профиля */
/* REVIEW. Можно лучше: функция названа renderProfile, хотя она отвечает за закрытие формы профиля, возможно её стоит назвать по-другому. */
function renderProfile(name, about) {
const name_placeholder = document.querySelector('.user-info__name');
const about_placeholder = document.querySelector('.user-info__job');

name_placeholder.textContent = name;
about_placeholder.textContent = about;
const popup = document.querySelector('.popup_edit-profile');
popup_button = popup.querySelector('.popup__button');
popup.classList.remove('popup_is-opened');
}

/* Редактирование профиля */

/* REVIEW. Можно лучше: функция названа editProfile, хотя она вызывается при событии submit формы профиля, возможно её стоит назвать по-другому. */
function editProfile(event) {
event.preventDefault();
const name = profile_name.value;
const about = profile_about.value;
renderProfile(name, about);
}

/*  Валидация форм */

function handleValidate(event) {
resetError(event.target);
validate(event.target);
}

function validate(element) {
const errorElement = document.querySelector(`#error-${element.id}`);
if (!element.checkValidity()) {
  errorElement.textContent = element.validationMessage;
  activateError(errorElement);
  errorElement.textContent = 'Это обязательное поле!';
  openProfileButton.setAttribute('disabled', true);
  openProfileButton.classList.add('popup__button_disabled');
  return false
} else if ((element.value.length < 2) || (element.value.length > 30)) {
  errorElement.textContent = element.validationMessage;
  activateError(errorElement);
  const errorMessage = 'Должно быть от 2 до 30 символов!';
  errorElement.textContent = errorMessage;
  openProfileButton.setAttribute('disabled', true);
  openProfileButton.classList.add('popup__button_disabled');
  return false
} else {
  resetError(errorElement);
  return false
}
}

function activateError(element) {
element.parentNode.classList.add('input-container__invalid');
}

function resetError(element) {
element.parentNode.classList.remove('input-container__invalid');
element.textContent = '';
}

/* Обработчики событий */

// Обработчик события ввода значений в форму
form.addEventListener('input', function () {

if (name.value.length === 0 || link.value.length === 0) {
  openPopupButton.setAttribute('disabled', true);
  openPopupButton.classList.add('popup__button_disabled');
} else {
  openPopupButton.removeAttribute('disabled');
  openPopupButton.classList.remove('popup__button_disabled');
}
});

// Обработчик события ввода значений в форму
profile_form.addEventListener('input', function () {

if (profile_name.value.length === 0 || profile_about.value.length === 0) {
  openProfileButton.setAttribute('disabled', true);
  openProfileButton.classList.add('popup__button_disabled');
} else {
  openProfileButton.removeAttribute('disabled');
  openProfileButton.classList.remove('popup__button_disabled');
}
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  cardList.addCard(form.elements.name.value, form.elements.link.value);
  form.reset();
});
profile_form.addEventListener('submit', editProfile);
profile_form.addEventListener('input', handleValidate);


cardList.container.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    cardList.removeCard(event.target)
  } else if (event.target.classList.contains('place-card__image')) {
    openPhotoPopup.open(event)
  }
});

userInfoButton.addEventListener('click', newCardPopup.open);
closePopupButton.addEventListener('click', newCardPopup.close);
closePhotoButton.addEventListener('click', openPhotoPopup.close);
userProfileButton.addEventListener('click', editProfilePopup.open);
closeProfileButton.addEventListener('click', editProfilePopup.close);

/* Вызов функций */

cardList.render();



/* REVIEW. Резюме.
Код  выполняет требуемый по заданиям функционал, но отправляет форму профиля на сервер, что не предполагается логикой задания.
Так же не совсем правильно происходит валидация формы профиля (задания 6,7),
а именно: при открытии формы профиля кнопка "сохранить"  не активна, хотя должна быть активна, так как при открытии в форме содержится верная информация.
Рекомендация по исправлению валидации: необходимо запускать функцию валидации формы при каждом её открытии.

В чем достигнут успех.
1. Для рендера картолчек использован метод addCard класса CardList.
2. Используется интерполяция строк из ES6.
3. Используется делегирование событий.

Что можно улучшить.
1. Дать более подходящие названия функциям, вызываемым при событии submit и закрытии формы профиля.
2. В проекте можно предусмотреть закрытие окон PopUp по клавише Esc.

Что надо исправить.
1.коды тел нескольких функций записать с двухпробельными отступами с левой стороны.
2.вместо ссылки <a> в файле index.html необходимо использовать <button>, иначе приложение работает неверно: происходит отправка
  введённой информации на сервер. (подробности в файле index.html).
3.вместо innerHTML следует использовать textContent (подробности в комментариях в коде).

Что нужно ещё исправить и над чем надо работать.

Цель задания была разбиение кода проекта на отдельные классы. Чтобы разбиение было более полным и структурированным,
нужно внести следующие изменения:

2. Не создавать экземпляры одного класса в других классах. Передавать экземпляры классов другим классам в качестве параметров.
3. Переместить операции над ДОМ, которые не содержатся ни в одном из классов, в подходящие им по смыслу классы, с возможной переработкой операций.
4. Код каждого класса поместить в отдельный файл. Все файлы с расширением js поместить в отдельную папку проекта. Осуществить загрузку всех файлов
js в index.html.
5. Организовать корневую точку сборки проекта - файл, где не объявляются классы, но происходит инициализация всего проекта. В ней создаются
   экземпляры классов, запускаются методы классов, инициализирующие проект. Так же файл index.js может содержать входные данные проекта, никаких
   логических операций он  содержать не должен. Здесь классы получают свои аргументы в виде экземпляров других классов,
   констант и коллбэк-функций.
6. Весь код index.js должен быть обернут в IIFE-функцию. или просто в какую-либо функцию, чтобы защитить своё содержимое от глобальной
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
   Так же в проекте должен присутствовать файл, не содержащий определения классов, index.js - корневая точка сборки нашего проекта. В ней создаются
   экземпляры классов, запускаются методы классов, инициализирующие проект.
   Классы получают свои аргументы в виде экземпляров других классов, констант и коллбэк-функций.
   Весь код index.js должен быть обернут в IIFE-функцию. или просто в какую-либо функцию, чтобы защитить своё содержимое от глобальной
   области видимости.
*/