
/* Задание 1. Написать скрипт, предлогающий пользователю ввести две строки через запятую.
Вывести сообщение true, если вторая строка содержится в первый, в противном случае false,
регистр при проверке не учитывать.
*/

let result = false;
const twoStrings = prompt("Задание 1.\nВведите две строки через запятую...");
if (twoStrings !== null) {
    const arr = twoStrings.toLowerCase().split(",");
    if (arr.length > 1) {
        result = arr[0].includes(arr[1]);
    }
}
alert(result);

/* Задание 2. Пользователь вводит строку, затем число (кол-во символов).
Функция усекает строку до кол-ва символов и добавляет многоточие.
*/

function CutString (str, num) {
    if (str.length > num) {
        str = str.substr(0, num).concat('...');
    }
    return str;
}
const inputStr = prompt("Задание 2.\nВведите строку");
const inputNum = prompt("Задание 2.\nВведите количество символов, до которого усекается строка");
if (inputStr !== null && inputNum !== null) {
    alert (CutString (inputStr, inputNum));
}


/* Задание 3. Написать функцию, преобразующее строку с датой и временем
формата '12/02/2021 12-00' в строку формата 12.02.2021 12:00, используя
регулярные выражения
*/

function TransformDate (datestr) {
    const regexp = /^\d{2}\/\d{2}\/\d{4} \d{2}-\d{2}$/;
    if (!regexp.test(datestr)) {
        return "Неверный формат даты!";
    }
    return datestr.replace(/\//g, ".").replace(/-/g, ":");
}
const userDate = prompt("Задание 3.\nВведите дату в формате 12/02/2021 12-00")
if (userDate !== null) {
    alert(TransformDate(userDate));
}


/* Задание 4. Написать функцию, валидирующую ФИО из кирилличиских символов
(считать, что отчество может оканчиваться только на "вна" или "вич" или может
отсутствовать)
*/

function CheckName (name) {
    const regexp = /^[а-яА-Я]+ [а-яА-Я]+( [а-яА-Я]+(вич|вна)+)*$/;
    return regexp.test(name);
}
const userName = prompt("Задание 4.\nВведите ФИО")
if (userName !== null) {
    alert(CheckName(userName));
}


/* Задание 5. На вход дана строка в PamalCase, преобразовать строку в snake_case
 */

function TransformPalmToSnake (str) {
    const regexp = /[A-Z]+[a-z]*/g;
    return str.match(regexp).join("_").toLowerCase();
}
const pamalStr = prompt("Задание 5.\nВведите строку в формате PamalCase")
if (pamalStr !== null) {
    alert(TransformPalmToSnake(pamalStr));
}



