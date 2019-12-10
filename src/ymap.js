// как только загрузится API и будет готов DOM начнет выполняться код функции init
ymaps.ready(init);

// метки
let placemarks = [
        {
            latitude: 59.97,
            longitude: 30.31,
            hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
            balloonContent: [
                '<div class="map__balloon">',
                'Самые вкусные бургеры у нас!',
                '</div>'
            ]
        },
        {
            latitude: 59.94,
            longitude: 30.25,
            hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
            balloonContent: [
                '<div class="map__balloon">',
                'Самые вкусные бургеры у нас!',
                '</div>'
            ]
        },
        {
            latitude: 59.93,
            longitude: 30.34,
            hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
            balloonContent: [
                '<div class="map__balloon">',
                'Самые вкусные бургеры у нас!',
                '</div>'
            ]
        },
        {
            latitude: 59.92,
            longitude: 30.31,
            hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 123</div>',
            balloonContent: [
                '<div class="map__balloon">',
                'Самые вкусные бургеры у нас!',
                '</div>'
            ]
        }
    ],
    geoObjects= [];

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
        
    });

    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'images/contacts/map-marker.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
                iconImageClipRect: [[415, 0], [461, 57]]
            });
    }

    let clusterer = new ymaps.Clusterer({
        
    });

    // geoObject - коллекция геообъектов

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}