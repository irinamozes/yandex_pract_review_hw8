(function () {
    const cards = document.querySelector('.places-list');
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');
    const formPopupAddCard = document.querySelector("#add-card");
    const formPopupProfile = document.querySelector("#profile");
    const bigSizeImage = document.querySelector("#big-size-image");
    const formNew = formPopupAddCard.querySelector("form");
    const newInputName = formNew.querySelector("input[name='name']");
    const newInputLink = formNew.querySelector("input[name='link']");
    const newErrorName = formNew.querySelector("#error-card-name");
    const newErrorLink = formNew.querySelector("#error-card-link");
    const buttonNew = formNew.querySelector(`button`);
    const formProfile = formPopupProfile.querySelector("form");
    const profileInputName = formProfile.querySelector("input[name='name']");
    const profileInputJob = formProfile.querySelector("input[name='job']");
    const profileErrorName = formProfile.querySelector("#error-profile-name");
    const profileErrorJob = formProfile.querySelector("#error-profile-job");
    const buttonProfile = formProfile.querySelector(`button`);

    const popupObj = { formPopupAddCard, formPopupProfile, bigSizeImage };
    const newArr = [newInputName, newInputLink, newErrorName, newErrorLink, buttonNew];
    const profileArr = [profileInputName, profileInputJob, profileErrorName, profileErrorJob, buttonProfile];


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

    const cardInstance = new Card();

    const cardList = new CardList(initialCards, cards, cardInstance);

    const validFormCard = new Validation(...newArr);
    const validFormProfile = new Validation(...profileArr, false);

    validFormCard.validateForm();

    const userInfo = new UserInfo(profileInputName, profileInputJob, userInfoName, userInfoJob);

    userInfo.formProfileInit();
    validFormProfile.validateForm();

    const popup = new Popup(popupObj, userInfo, validFormProfile, validFormCard, cardList);

})();