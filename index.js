/**
 * AsyncForEach Module
 * @author  Valeriya Tokareva
 * @version 0.0.1
 */

'use strict';

/**
 * @name asyncForEach
 * @description Асинхронный цикл вычислений над каждым элементом массива
 * @param  {Array}   arr  исходный массив
 * @param  {Function} cb  колбэк для обработки каждого элемента
 * @return {Object}       промис
 */
const asyncForEach = (arr, cb) => {
  let i = 0;

  // индикатор статуса асинхронных итераций
  let iterFinished = false;

  /**
   * @name innerFunc
   * @description внутренняя функция, обеспечивающая промисификацию
   * @return {Object} Промис, выполняющий основной блок вычислений
   */
  const innerFunc = () => {
    return new Promise(resolve => {

      /**
       * @name mainPromise
       * @description Основной промис, вызывающий внешний коллбэк и resolve внешнего промиса
       * @return {Object} Промис, внутри которого происходят все вычисления
       */
      const mainPromise = function mainPromise() {
        if (arr.length > 0 && i < arr.length) {
          return new Promise(() => {
            if (!iterFinished) {
              cb(arr[i], i, increment);
            } else {
              iterFinished = false;
              mainPromise();
            }
          });
        } else resolve();
      };

      /**
       * @name increment 
       * @description коллбэк внутри внешнего коллбэка увеличивает значение
       * индекса и снова запускает основной промис
       * @return {Object} выполнение основного промиса, который тоже возвращает промис
       */
      const increment = () => {
        iterFinished = true;
        i++;
        return mainPromise();
      };

      // setTimeout необходим, чтобы выполнение основного промиса было отложено,
      // пока не отработают блоки кода ниже вызова asyncForEach. Отсрочка 0,
      // потому что в данном случае не важно, через какой промежуток функция 
      // выполнится.
      setTimeout(() => {
        // блок try-catch для обработки ошибок в основном блоке вычислений
        try {
          setTimeout(mainPromise, 0);
        } catch(e) {
          console.warn(`Something went wrong: ${e.message}!`);
        }
      }, 0);
    });
  }

  return innerFunc();
}