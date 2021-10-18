/*
Задача 1.
Реализовать функцию, принимающую число (индекс в последовательности Фибоначчи),
функция должна вернуть значение числа. Использовать рекурсию.
 */

console.log('Домашнее задание 6. Задача 1');

const getFibonachiByIndex = (index) => {
    const firstNum = 0;
    const secondNum = 1;
    if (index === 1) return firstNum;
    if (index === 2) return secondNum;

    let count = 3;
    return (function getNextFibonachiItem (fNum, sNum) {
        if (count === index) {
            return fNum + sNum;
        } else {
            ++count;
            return getNextFibonachiItem (sNum, fNum + sNum);
        }
    })(firstNum, secondNum);
}

console.log(getFibonachiByIndex(8));

/*
Задача 2.
Модернизировать написанную функцию, добавив кэширование (функция ""запоминает""
входной параметр и вычесленное значение, при следующем вызыве с этим же параметром,
функция не вычисляет значение, а возвращает из памяти)
 */

console.log('\nДомашнее задание 6. Задача 2. (Модернизация функции - внедрение кэша)');

const getFibonachiByIndexNew = (() => {
    let cache = new Map();
    return function (index) {
        const firstNum = 0;
        const secondNum = 1;
        if (index === 1) return firstNum;
        if (index === 2) return secondNum;
        if (cache[index]) {
            console.log(`Беру данные из кэша для ${index} => ${cache[index]}`);
            return cache[index];
        }

        let count = 3;
        return (function getNextFibonachiItemNew (fNum, sNum) {
            if (count === index) {
                cache[index] = fNum + sNum;
                return fNum + sNum;
            } else {
                ++count;
                return getNextFibonachiItemNew (sNum, fNum + sNum);
            }
        })(firstNum, secondNum);
    }
})();

console.log(getFibonachiByIndexNew(9));
console.log(getFibonachiByIndexNew(6));
console.log(getFibonachiByIndexNew(5));
console.log(getFibonachiByIndexNew(9));
console.log(getFibonachiByIndexNew(5));


/*
Задача 3.
Разработать рекурсивную функцию, принимающую массив, содержащий массивы
из двух элементов, в каждом из которых первый элемент является строкой,
а второй строкой, числом, логическим значением, объектом, или таким же массивом.
Функция должна преобразовать массив в объект
*/

console.log('\nДомашнее задание 6. Задача 3');

function transformArray (arr) {
    return arr.reduce((accum, elem) => {
        if (Array.isArray(elem[1])) {
            accum[elem[0]] = transformArray(elem[1]);
            return accum;
        } else {
            accum[elem[0]] = elem[1];
            return accum;
        }
    }, {});
}

const inputArray = [
    ['name', 'Anna'],
    ['age', 22],
    ['pets', [
        ['dog', 'Faust'],
        ['cat', 'Balthazar'],
        ['parrot', [
            ['colour', 'yellow'],
            ['size', 'small']
        ]]
    ]],
    ['page', 101]
];
console.log(inputArray);
console.log(transformArray(inputArray));