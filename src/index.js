// 0. инициализировать карту
// 1. При клике на карте нужно 
//     a. получить координаты coord места;
//     b. поместить в массив объектов placemarks эти координаты;
//     c. вывести всплывающее окно;
//     d. в шапке вывести адрес.
// 2. Заполнить группу полей «Ваш отзыв» и нажать кнопку «Добавить». После нажатия кнопки «Добавить»:
//     a. Отзыв должен появиться в списке;
//     b. Данные отзыва должны поместить в массив placemarks;
//     c. На карте должна появиться метка.
// 3. При добавлении второго отзыва по месту нужно:
//     a. Отзыв добавить в список отзывов;
//     b. Увеличить счетчик на метке (кластеризация).

// 0. инициализация карты

// как только загрузится API и будет готов DOM начнет выполняться код функции init
ymaps.ready(init);

// объявление переменных
let placemarks;
// для кластеризации
let geoObjects = [];

function init() {
    
    // конструктор карты
    let map = new ymaps.Map('map', {
        // центр карты
        center: [59.94, 30.32],
        // коэффициент масштабирования
        zoom: 12,
        // элементы управления
        controls: ['zoomControl', 'searchControl'],
        behaviors: ['drag']
    }, {
        searchControlProvider: 'yandex#search'
    });
    
    // 1.a получить координаты coord места
    // Слушаем клик на карте.
    map.events.add('click', function (e) {
        let coords = e.get('coords');

        getAddress(coords);
        
    })

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            // строка с адресом
            let address = firstGeoObject.getAddressLine();

            return address;
        });
    }
    
    // b. поместить в массив объектов placemarks эти координаты;

    // c. вывести всплывающее окно;
    // констуктор меток
    let placemarkBalloon = new ymaps.Placemark(map.getCenter(), {
        // Зададим содержимое заголовка балуна.
        balloonContentHeader: '<div class="review__header">' +
            '<div class="review__header-point">'+
            '<a href="#" class="review__point-link"><img src="./img/point.png" alt="Close" class="review__point-img"></a>'+
            '</div>'+
            '<div class="review__header-address"><i></i></div>'+
            '<div class="review__close"><a href="#" class="review__close-link"><img src="./img/close.png" alt="Close" class="review__close-img"> </a></div>'+
            '</div>',
        // Зададим содержимое основной части балуна.
        balloonContentBody: '<div class="review__list">' +
            '<div class="review__list-info">' +
            '<div class="review__list-author"> {{author}}</div>'+
            '<div class="review__list-place"> {{place}} </div>'+
            '<div class="review__list-date"> {{date}} </div>'+
            '</div>'+
            '<div class="review__list-text"> {{text}} </div>'+
            '<div class="noReview">Отзывов пока нет</div>',
        // Зададим содержимое нижней части балуна.
        balloonContentFooter: '<form action="" class="review__form">'+
        '<h2 class = "review__form-header">Ваш отзыв</h2>'+
        '<input type="text" class="review__name" placeholder="Ваше имя">'+
        '<input type="text" class="review__place" placeholder="Укажите место">'+
        '<textarea name="text" id="review__text" cols="30" rows="10" class="review__text" placeholder="Поделитесь впечатлениями"></textarea>'+
        '<button class="btn btn-addReview">Добавить</button></form>'
        
    });
        
    // Откроем балун на метке.
    placemarkBalloon.balloon.open();

    // кластеризация
    let clusterer = new ymaps.Clusterer({
            
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);

}
