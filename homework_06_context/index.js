/*
Реализовать функцию, принимающую число (индекс в последовательности Фибоначчи),
функция должна вернуть значение числа. Использовать рекурсию.
 */

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
Модернизировать написанную функцию, добавив кэширование (функция ""запоминает""
входной параметр и вычесленное значение, при следующем вызыве с этим же параметром,
функция не вычисляет значение, а возвращает из памяти)
 */

