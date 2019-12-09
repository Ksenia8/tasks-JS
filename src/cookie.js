/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    function isMatching(full, chunk) {
        if (full.toLowerCase().includes(chunk.toLowerCase())) {
            return true;
        }

        return false;
    }
    // функция создает таблицу с cookie
    function createTable(name, value) {
        let tr = document.createElement('tr');

        listTable.appendChild(tr);
        tr.innerHTML = '<th>' + `${name}` + '</th><th>' + `${value}` + '</th><th><button>Удалить</button></th>';

        return tr;
    }
    // функция преобразует document.cookie в объект
    function convertObj() {
        if (document.cookie) {
      
            return document.cookie.split('; ').reduce((obj, current) => {
                const [name, value] = current.split('=');

                obj[name]=value;

                return obj;
            }, {});
        }
    }
    // очищаем таблицу
    while (listTable.firstChild) {
        listTable.removeChild(listTable.firstChild);
    }

    let obj = convertObj();

    // если текстовое поле не пустое
    if (filterNameInput.value !=='') {
        // перебираем cookies на совпадения
        for (let cookie in obj) {
            // если есть совпадения, то выводим в таблицу
            if (isMatching(cookie, filterNameInput.value) || isMatching(obj[cookie], filterNameInput.value)) {
                listTable.appendChild(createTable(cookie, obj[cookie]));
            }
            // если нет совпадений, то ничего не делать, т.к. таблица очищена
        }
    // если текстовой поле пустое
    } else if (filterNameInput.value === '') {
        // добавляем все cookies в таблицу
        for (let cookie in obj) {
            if (obj.hasOwnProperty(cookie)) {
                listTable.appendChild(createTable(cookie, obj[cookie]));
            }
        }
    }

    filterNameInput.innerText = '';

});

addButton.addEventListener('click', () => {
// здесь можно обработать нажатие на кнопку "добавить cookie"
    // function isMatching(full, chunk) {
    //     if (full.toLowerCase().includes(chunk.toLowerCase())) {
    //         return true;
    //     }

    //     return false;
    // }
    
    // функция добавляет таблицу с cookie
    function createTable(name, value) {
        const tr = document.createElement('tr');

        listTable.appendChild(tr);
        tr.innerHTML = '<th>' + `${name}` + '</th><th>' + `${value}` + '</th><th><button>Удалить</button></th>';

        return tr;
    }
    // функция преобразует document.cookie в объект
    function convertObj() {
        if (document.cookie) {
        
            return document.cookie.split('; ').reduce((obj, current) => {
                const [name, value] = current.split('=');

                obj[name]=value;

                return obj;
            }, {});
        }
    }
    // создание и добавление cookie в document.cookie
    if ((addNameInput.value !== undefined) && (addValueInput.value !== undefined)) {
        document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
    }
    // очищаем таблицу
    while (listTable.firstChild) {
        listTable.removeChild(listTable.firstChild);
    }

    let obj = convertObj();

    // если текстовое поле не пустое
    
    if (filterNameInput.value.length) {
        // перебираем cookies на совпадения
        for (let cookie in obj) {
            // если есть совпадения, то выводим в таблицу
            // if (isMatching(cookie, filterNameInput.value) || isMatching(obj[cookie], filterNameInput.value)) {
            let filterNameLower = filterNameInput.value.toLowerCase();

            if (cookie.toLowerCase().includes(filterNameInput.value.toLowerCase()) ||
                obj[cookie].toLowerCase().includes(filterNameInput.value.toLowerCase())) {
                listTable.appendChild(createTable(cookie, obj[cookie]));
            }
            // если нет совпадений, то ничего не делать, т.к. таблица очищена
        }
    // если текстовой поле пустое
    } else {
        // добавляем все cookies в таблицу
        for (let cookie in obj) {
            if (obj.hasOwnProperty(cookie)) {
                listTable.appendChild(createTable(cookie, obj[cookie]));
            }
        }
    }

    // удаление cookie
    listTable.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            
            let objCookie = convertObj();

            let name = e.target.parentNode.parentNode.firstChild.innerText;
            let value = objCookie[e.target.parentNode.parentNode.firstChild.innerText];

            // удаление из браузера
            document.cookie = `${name} = ${value}; expires=` + new Date(0);
            // удаление из таблицы
            e.target.parentNode.parentNode.innerHTML = '';

        }
    });     
});
