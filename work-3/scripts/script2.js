/* REVIEW. Надо исправить: код, не содержащий объявления классов, содержащий только объявление констант и создание экземпляров классов и запуск их методов,
должен быть вынесен в отдельный файл и обёрнут в IIFE функцию или просто какую-либо функцию, для того, чтобы объявленные переменные и константы не находились
в глобальной области видимости и не могли конфликтовать с переменными возможно загружаемых сторонних скриптов. */

const cardContainer = document.querySelector('.places-list');
const openCardsPop = document.querySelector('.user-info__button');
const openEditPop = document.querySelector('.user-info__edit');
const popupContainer = document.querySelector('.popups');
const popupCards = document.querySelector('.popup__cards');
const popupEdit = document.querySelector('.popup__useredit');
const popupImageContainer = document.querySelector('.popup__image');
const popupImage = popupImageContainer.querySelector('.popup__big-image');
const addButton = popupCards.querySelector('.popup__button_add');
const editButton = popupEdit.querySelector('.popup__button_edit');

const form = document.forms.new;
const name = form.elements.name;
const link = form.elements.link;

const editForm = document.forms.edit;
const username = editForm.elements.username;
const job = editForm.elements.userjob;

errorName = document.querySelector('.popup__error_name');
errorUser = document.querySelector('.popup__error_username');
errorJob = document.querySelector('.popup__error_userjob');
errorUrl = document.querySelector('.popup__error_url');

const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
  }
];

class Card {
  constructor(name, url) {
  /* REVIEW. Можно лучше: как мне кажется, логичнее вызывать метод create в методе addCard класса CardList, передав экземпляр класса Card в
   CardList в качестве параметра и затем метод addCard использовать в методе рендера карточек.*/
    this.cardElement = this.create(name, url);

  }
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  }
  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
      event.target.parentNode.parentNode.remove();
    }
  }
  create(nameValue, urlValue) {
    const newCard = document.createElement('div');
    newCard.classList.add('place-card');

    const cardBg = document.createElement('div');
    cardBg.classList.add('place-card__image');
    cardBg.style.backgroundImage = `url(${urlValue})`;

    const cardDelete = document.createElement('button');
    cardDelete.classList.add('place-card__delete-icon');

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = nameValue;

    const cardLike = document.createElement('button');
    cardLike.classList.add('place-card__like-icon');

    newCard.appendChild(cardBg);
    cardBg.appendChild(cardDelete);
    newCard.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardLike);

  /* REVIEW. Отлично! Вы делаете возврат элемента карточки. Его можно использовать в дальнейшем. */
    return newCard;
  }
}

class CardList {
  constructor(container, cardlist) {
    this.container = container;
    /* REVIEW. Надо исправить. Обычно с большой буквы называют классы и функции-конструкторы, чтобы сразу отличать их от других сущностей. В этой связи,
    не думаю, что свойство класса возможно называть с большой буквы, хотя оно и содержит основной источник информации для проекта.*/
    this.CardList = cardlist;
  }

   /* REVIEW. Надо исправить: в Вашей реализации метод addCard содержит методы класса Popup и является коллбэком для события submit формы и не используется
   для осуществления функций, возложенных на класс CardList (работа со списком карточек), поэтому  он является методом класса Popup,
   а не  класса CardList, хотя он и должен содержать вызов метода create класса Card.
   Какое содержание мог бы иметь метод addCard, чтобы его можно было отнести к классу CardList, было описано в ревью выше.*/
  addCard(event) {
    event.preventDefault();
    /* REVIEW. Надо исправить. Не следует создавать экземпляры одного класса в другом. Экземпляр класса можно передать как параметр в конструктор
    другого класса.*/
    const cardElement = new Card();
    this.container.appendChild(cardElement.create(name.value, link.value));
    popup.reset(form);
    const formname = event.target.parentNode.parentNode;
    popup.close(formname);
    addButton.setAttribute('disabled', true);
  }


  /* REVIEW. Можно лучше: для рендера можно использовать метод forEach по исходному массиву initialCards.*/
  render() {
    for (let i = 0; i < this.CardList.length; i++) {
    /* REVIEW. Надо исправить. Как уже было написано выше, не следует создавать экземпляры одного класса в другом. Экземпляр класса можно передать как
    параметр в конструктор другого класса.*/
      const { cardElement } = new Card(
        this.CardList[i].name,
        this.CardList[i].link
      );
      this.container.appendChild(cardElement);
    }
  }
}

/* REVIEW. Можно лучше: хорошо, что некоторые методы работы с popup отнесены к классу Popup. Но функции валидации можно было бы вынести
в отдельный класс, и передавать экземпляр этого класса как параметр в класс Popup, для использования его там при открытии и сабмите форм.*/
/* REVIEW. Можно лучше: в классе PopUp можно предусмотреть закрытие окон PopUp по клавише Esc, обработав событие keydown. */
class Popup {
  open(formname) {
    formname.classList.toggle('popup_is-opened');
  }
  checkName(error, field) {
    if (field.value.length === 0) {
      error.textContent = 'Это обязательное поле';
      this.disableButton(addButton);
      return false;
    } else if (field.validity.tooShort) {
      error.textContent = 'Должно быть от 2 до 30 символов';
      this.disableButton(addButton);
      return false;
    } else {
      error.textContent = '';
      this.enableButton(addButton);
      return true;
    }
  }
  checkUrl(url) {
    if (link.value.length === 0) {
      url.textContent = 'Это обязательное поле';
      this.disableButton(addButton);
      return false;
    }
    if (!link.validity.valid) {
      url.textContent = 'Здесь должна быть ссылка';
      this.disableButton(addButton);
      return false;
    } else {
      url.textContent = '';
      return true;
    }
  }
  /* REVIEW. Похвально, что использовано регулярное выражение для определения адреса фото. Отлично, что метод работы с большим фото отнесён к классу Popup! */
  setImg() {
    let imgBg = event.target.style.backgroundImage;
    let imgUrl = imgBg.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
    popupImage.src = imgUrl;
  }

  fillField(formname) {
    const userName = document.querySelector('.user-info__name').textContent;
    const userJob = document.querySelector('.user-info__job').textContent;
    formname.querySelector('.popup__input_type_username').value = userName;
    formname.querySelector('.popup__input_type_userjob').value = userJob;
  }

  /* REVIEW. Можно лучше: задание стилей элементам через атрибут style, когда это можно сделать через классы, не приветствуется
  из-за усложнения расширения и сопровождения проекта. Поэтому лучше задавать классы для элементов, а затем стили в CSS-файлах.*/
  disableButton(button) {
    button.setAttribute('disabled', true);
    button.style.backgroundColor = 'transparent';
    button.style.color = 'rgba(0, 0, 0, .2)';
  }
  enableButton(button) {
    button.removeAttribute('disabled');
    button.style.backgroundColor = '#000000';
    button.style.color = '#FFFFFF';
  }

  validateAddCardButton() {
    let isActiveName = this.checkName(errorName, name);
    let isActiveUrl = this.checkUrl(errorUrl);

    if (!isActiveName || !isActiveUrl) {
      this.disableButton(editButton);
    } else {
      this.enableButton(editButton);
    }
  }

  validateEditUserButton() {
    let isActiveName = this.checkName(errorJob, job);
    let isActiveJob = this.checkName(errorUser, username);
    if (!isActiveName || !isActiveJob) {
      this.disableButton(editButton);
    } else {
      this.enableButton(editButton);
    }
  }

  editUser(event) {
    event.preventDefault();
    let userName = document.querySelector('.user-info__name');
    let userJob = document.querySelector('.user-info__job');
    userName.textContent = username.value;
    userJob.textContent = job.value;
    const formname = event.target.parentNode.parentNode;
    this.close(formname); //закрываю попап
  }

  reset(formname) {
    formname.reset();
  }
  close(formname) {
    formname.classList.toggle('popup_is-opened');
  }
}

const popup = new Popup();
/* REVIEW. Можно лучше: по ошибке не использована "верблюжья" нотация в имени cardlist */
const cardlist = new CardList(cardContainer, initialCards);
const card = new Card();
cardlist.render();


/* REVIEW. Надо исправить: все операции над DOM должны быть инкапсулированы и  производиться внутри класса. Поэтому нижележащие функции
должны быть перенесены в качестве методов в какие-либо классы. Возможный вариант разбиения кода на классы приведен ниже. */
openCardsPop.addEventListener('click', function() {
  popup.open(popupCards);
  popup.reset(form);
  popup.checkUrl(errorUrl);
  popup.checkName(errorName, name);
});
openEditPop.addEventListener('click', function() {
  popup.open(popupEdit);
  popup.fillField(editForm);
  popup.checkName(errorUser, username);
  popup.checkName(errorJob, job);
});


/* REVIEW. Отлично, что использовано делегирование событий. */
cardContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('place-card__image')) {
    popup.open(popupImageContainer);
    popup.setImg();
  }
});

popupContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('popup__close')) {
    const popupName = event.target.parentNode.parentNode;
    popup.close(popupName);
  }
});

cardContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    card.remove(event);
  }
});
cardContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    card.like(event);
  }
});

popupCards.addEventListener('submit', function() {
  cardlist.addCard(event);
});
popupEdit.addEventListener('submit', function() {
  popup.editUser(event);
});

form.addEventListener('input', function() {
  popup.validateAddCardButton();
});

editForm.addEventListener('input', function() {
  popup.validateEditUserButton();
});



/* REVIEW. Резюме.
Код  выполняет требуемый по заданиям функционал, кроме правильной валидации формы профиля (задание 7),
а именно: после неправильного ввода в форму профиля и выходе из неё по крестику, при следующем входе в форму, кнопка "сохранить" не активна.
Рекомендация по исправлению: необходимо запускать функцию валидации формы при каждом её открытии.

В чем достигнут успех.
1. Студент разобрался в валидации форм с помощью свойства элемента validity. (задание 7)
2. Почти полностью(с небольшими недочетами) сделано дополнительное задание по валидации формы добавления карточки. (задание 7)
3. Использовано регулярное выражение для определения адреса фото.
4. Метод работы с большим фото отнесён к классу Popup.

Что можно улучшить.
1. Чтобы отказаться от встроенного дизайна обязательно заполняемых полей формы, лучше проводить валидацию без использования свойства
validity.Тогда можно будет не вводить в размётке атрибуты полей ввода формы minLength и maxLength, и сообщения об ошибках смогут
выводиться  на экран так же, как в образце задания. (задание 7).
2. Желательно исправить неправильную отрисовку сообщений об ошибках в обеих формах. Для того чтобы сообщения выводились не сбоку, а под полем,
нужно в CSS-файле сменить для элементов ошибок position: absolute; на position: relative;  и правильно назначить значения свойству top.(задание 6).
3. Везде, где это возможно, использовать классы для определения стилей HTML-элементов, а не атрибут style.
4. Для рендера карточек можно использовать метод forEach по исходному массиву initialCards.
5. В проекте можно предусмотреть закрытие окон PopUp по клавише Esc.

Что нужно исправить и над чем надо работать.

Цель задания была разбиение кода проекта на отдельные классы.Чтобы разбиение было более полным и структурированным,
нужно внести следующие изменения:

1. Свойство класса назвать с маленькой буквы (подробности в коментариях в коде).
2. Преобразовать или перенести метод, не выполняющий функции класса, где он находится, в другой класс.
3. Не создавать экземпляры одного класса в других классах. Передавать экземпляры классов другим классам в качестве параметров.
4. Переместить операции над ДОМ, которые не содержатся ни в одном из классов, в подходящие им по смыслу классы, с возможной переработкой операций.
5. Код каждого класса поместить в отдельный файл. Осуществить загрузку всех файлов js в index.html.
6. Организовать корневую точку сборки проекта - файл, где не объявляются классы, но происходит инициализация всего проекта.В ней создаются
экземпляры классов, запускаются методы классов, инициализирующие проект.Так же файл index.js может содержать входные данные проекта, никаких
логических операций он  содержать не должен. Здесь классы получают свои аргументы в виде экземпляров других классов,
констант и коллбэк - функций.
7. Весь код index.js должен быть обернут в IIFE-функцию, или просто в какую-либо функцию, чтобы защитить своё содержимое от глобальной
области видимости.

Ниже представлен вариант возможной организации кода задания.

Код задания можно разбить на 5 классов.
1. Класс Card, который формирует и возвращает одну карточку, имеющий методы create, like, remove.
2. Класс CardList, отрисовывающий карточки на страницу, принимающий в своём конструкторе в качестве параметров элемент - контейнер для карточек,
  массив карточек, экземпляр класса Card.
Он имеет методы addCard, отвечающий за экземпляр карточки, принятой от Card и метод render, отвечающий за представление всего списка карточек
на странице.
3. Класс UserInfo, отрисовывающий информацию о пользователе на страницу.В качестве параметров ему нужны 2 элемента, представляющие информацию
о пользователе на странице и значения полей ввода в форму профиля.
4. Класс Validation, отвечающий за валидацию полей ввода.В качестве параметров ему нужны элементы полей ввода форм с их значениями,
  а так же элементы с сообщениями об ошибках для каждого поля ввода.Класс содержит функции валидации в качестве своих методов.
5. Класс Popup, отвечающий за поведение и содержимое всплывающих окон - большой картинки и двух форм.
В качестве своих параметров он принимает экземпляры классов CardList (или Card), UserInfo, Validation, а так же элементы-контейнеры всплывающих окон.
Каждый класс должен быть помещён в отдельный файл.
Так же в проекте должен присутствовать файл, не содержащий определения классов, index.js - корневая точка сборки нашего проекта.В ней создаются
экземпляры классов, запускаются методы классов, инициализирующие проект.
Классы получают свои аргументы в виде экземпляров других классов, констант и коллбэк - функций.
Весь код index.js должен быть обернут в IIFE - функцию.или просто в какую - либо функцию, чтобы защитить своё содержимое от глобальной
области видимости.
*/