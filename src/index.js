/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
function returnFirstArgument(n) {
  console.log(n);
}
  
returnFirstArgument(10);
returnFirstArgument("привет");
  
  /*
   Задание 2:
  
   2.1: Функция должна возвращать сумму переданных аргументов
  
   Пример:
     sumWithDefaults(10, 20) вернет 30
     sumWithDefaults(2, 4) вернет 6
  
   2.1 *: Значение по умолчанию для второго аргумента должно быть равно 100
  
   Пример:
     sumWithDefaults(10) вернет 110
   */
  
  //  1-ый вариант:
  function sumWithDefaults(a, b) {
    if (typeof b==="undefined") {
      b = 100;
    }
    console.log(a+b);
  }
  
  sumWithDefaults(10, 20);
  sumWithDefaults(2, 4);
  sumWithDefaults(10);
  
  // 2-ой вариант:
  function sumWithDefaults(a, b=100) {
    console.log(a+b);
  }
  
  sumWithDefaults(10, 20);
  sumWithDefaults(2, 4);
  sumWithDefaults(10);
  
  /*
   Задание 3:
  
   Функция должна принимать другую функцию и возвращать результат вызова этой функции
  
   Пример:
     returnFnResult(() => 'привет') вернет 'привет'
   */
  function returnFnResult(fn) {
    let result = fn();
    console.log(result);
  }
  
  returnFnResult(() => "привет");
  
  /*
   Задание 4:
  
   Функция должна принимать число и возвращать новую функцию (F)
   При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F
  
   Пример:
     var f = returnCounter(10);
  
     console.log(f()); // выведет 11
     console.log(f()); // выведет 12
     console.log(f()); // выведет 13
   */
  function returnCounter(number) {
    return (() => number += 1);
  }
  
  let f = returnCounter(10);
  console.log(f());
  console.log(f());
  console.log(f());
  
  /*
   Задание 5 *:
  
   Функция должна возвращать все переданные ей аргументы в виде массива
   Количество переданных аргументов заранее неизвестно
  
   Пример:
     returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
   */
  function returnArgumentsArray() {
    let arr=[];
    for (var i=0; i<arguments.length;i++) {
      arr[i]=arguments[i];
    } 
    console.log(arr);  
  }
    
  returnArgumentsArray(1,2,3);
  
  /*
   Задание 6 *:
  
   Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
   Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
  
   Пример:
     function sum(a, b) {
       return a + b;
     }
  
     var newSum = bindFunction(sum, 2, 4);
  
     console.log(newSum()) выведет 6
   */
  function bindFunction(fn) {
  }
  
  export {
      returnFirstArgument,
      sumWithDefaults,
      returnArgumentsArray,
      returnFnResult,
      returnCounter,
      bindFunction
  }
