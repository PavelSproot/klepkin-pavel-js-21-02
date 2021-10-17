/* Задача 1.
На вход поступает массив, вывести массив, удалив неуникальные значения.
*/

console.log("Задача 1.");
const nonUnicArray  = [20, "ff", 15, 10, "unit", 0, 15, 20, "hot", "ff", "str"];
console.log(`Входной массив: ${nonUnicArray}`);
const unicSet = new Set(nonUnicArray);
console.log(`Результат: ${Array.from(unicSet.values())}`);


/* Задача 2.
На вход поступает массив, реверсировать значения (подобно методу reverse) метод reverse не использовать.
*/

console.log("\nЗадача 2.");
const directArray  = [20, "ff", 15, 10, "unit", 0, 15, 20, "hot", "ff", "str"];
console.log(`Входной массив: ${directArray}`);
let reverseArray = [];
while (directArray.length > 0) {
    reverseArray.push(directArray.pop());
}
console.log(`Результат: ${reverseArray}`);


/* Задача 3.
На вход поступает массив, содержащий массивы, в которых хранится два элемента.
Преобразовать массив в объект, где ключами являются нулевой индекс вложенныхых
массивов, а значениями являются элементы с индексом один.
*/

console.log("\nЗадача 3.");
const pairsArray = [
    ["a", "val1"],
    ["b", "val2"],
    ["c", "val3"],
    ["d", "val4"]
];
console.log(`Входной массив:`);
pairsArray.map(elem => console.log(`[${elem[0]}, ${elem[1]}]`));
const pairsObj = pairsArray.reduce((accum, elem) => {
    accum[elem[0]] = elem[1];
    return accum;
}, {});
console.log(`Результат:`);
Object.entries(pairsObj).forEach(([key, val]) => console.log(`${key}: ${val}`));


/*Задача 4.
На вход поступает объект, вывести сумму числовых свойств объекта.
*/

console.log("\nЗадача 4.");
const sumNumObj = {
  a: "str",
  b: 100,
  c: 250,
  d: "kkk",
  e: 360
};
console.log(`Входной объект:`);
Object.entries(sumNumObj).forEach(([key, val]) => console.log(`${key}: ${val}`));

const sumNumProps = Object.values(sumNumObj).reduce(((accum, elem) => {
    if (typeof(elem) == "number") {
        accum += elem;
    }
    return accum;
}), 0);
console.log(`Результат: ${sumNumProps}`);


/* Задача 5.
На вход поступает массив с числами, вывести среднее арифметическое элементов массива.
*/

console.log("\nЗадача 5.");
const numsArray  = [20, 10, 40, 10, 20, 0, 30, 50, 10, 70];
console.log(`Входной массив: ${numsArray}`);

let srednArefm = 0;
if (numsArray.length > 0) {
    srednArefm = numsArray.reduce(((accum, elem) => {
        accum += elem;
        return accum;
    }), 0) / numsArray.length;
}
console.log(`Результат: ${srednArefm}`);


/* Задача 6.
Создать функцию-конструктор для объекта "калькулятор", объект должен иметь поле,
хранящее текущее значение и методы сложения, вычитания, умножения и деления,
принимающие число и манипулирующий свойством значения в соответствии с назначением
метода, а так же функцию, сбрасывающую значение в ноль.
*/

console.log("\nЗадача 6.");
function Calculator () {
    this.amount = 0;
    this.sum = num => this.amount += num;
    this.sub = num => this.amount -= num;
    this.mul = num => this.amount *= num;
    this.dev = num => this.amount /= num;
    this.clear = () => this.amount = 0;
    this.showAmount = () => console.log(`Текущее значение: ${this.amount}`);
}

const calc = new Calculator();
calc.showAmount();
let tmpNum = 3;
console.log(`Прибавляем ${tmpNum}`);
calc.sum(tmpNum);
calc.showAmount();
tmpNum = 1;
console.log(`Отнимаем ${tmpNum}`);
calc.sub(tmpNum);
calc.showAmount();
tmpNum = 4;
console.log(`Умножаем на ${tmpNum}`);
calc.mul(tmpNum);
calc.showAmount();
tmpNum = 2;
console.log(`Делим на ${tmpNum}`);
calc.dev(tmpNum);
calc.showAmount();
console.log(`Сбрасываем значение`);
calc.clear();
calc.showAmount();


/* Задача 7.
Функция принимает смешанный массив (содержащий значения чисел, строк и объектов),
вернуть объект с полями numbers, strings и objects, содержащими массив со значениями,
соответствующими названию поля.
*/

console.log("\nЗадача 7.");
function filterTypeArray (mixArr) {
    return {
        numbers: mixArr.filter((elem) => typeof(elem) == "number"),
        strings: mixArr.filter((elem) => typeof(elem) == "string"),
        objects: mixArr.filter((elem) => typeof(elem) == "object")
    }
}
const mixedArray  = [20, "first string", 15, {val: "SuperString"}, "unit", 0, 15, 20, "Color", "Second value", {name: "Paul"}];
console.log(`Входной массив: ${mixedArray}`);
resultTypeArray = filterTypeArray(mixedArray);
console.log(`Результат. Числа: ${resultTypeArray.numbers}`);
console.log(`Результат. Строки: ${resultTypeArray.strings}`);
console.log(`Результат. Объекты: ${resultTypeArray.objects}`);


/* Задача 8.
Функция принимает массив чисел и два числовых значения, вернуть новый массив,
содержащий элементы первого массива, значение которых попадает под диапазон
переданных в функцию чисел (второе переданное число может быть больше первого)
*/

/* Задача 9.
Функция принимает две строки. Вывести true, если строки являются анаграммами,
в противном случае false
*/

/* Задача 10.
Создать объект, выводящий в консоль все ключи и значения объекта в формате
"ключ: значение" через запятую (считать, что значением ключа объекта не может
быть объектом или массивом, содержащими объекты) сама функция в консоль
выводиться не должна.
*/

/* Задача 11.
Создать функцию-конструктор для объекта, содержащего методы serProp (установить
значение свойства), метод принимает ключь (строка), значение (произвольное) и
объект со свойствами writable, configurable, enumerable (разрешение перезаписи
свойства, разрешение перечисления свойства и разрешение удаления свойства).
Если какое-то из свойств в объекте отсутствует, действие должно быть разрешено
*/

