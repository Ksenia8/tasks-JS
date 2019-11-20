/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    
    for (let i=0; i<array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArr=[];

    for (let i=0; i<array.length;i++) {
        let elem=fn(array[i], i, array);

        newArr.push(elem);
    }
  
    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial=array[0]) {
    let result = initial;

    for (let i=0;i<array.length;i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr=[];

    for (let propValue in obj) {
        if (obj.hasOwnProperty(propValue)) {
            let value = propValue.toUpperCase();

            arr.push(value);
        }
    }
   
    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let arr=[];

    if (to > 0 && to > from) {
        for (let i=from; i<to; i++) {
            arr.push(array[i]);
        }
    } else if (to<0) {
        for (let i=from; i<array.length+to; i++) {
            arr.push(array[i]);
        }
    } else if (typeof from === 'undefined' && typeof to === 'undefined') {
        arr=array
    } else if (typeof to ==='undefined') {
        for (let i=from; i<array.length; i++) {
            arr.push(array[i]);
        }
    }

    return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    obj = new Proxy(obj, {
        set(target, prop, val) {
            if (typeof target[prop] === 'number') {
                target[prop]=val;

                return val*val;
            } 
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
