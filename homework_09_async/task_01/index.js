/*
Домашнее задание 9
Задача 1. (Вариант через setTimeout)
Разработать скрипт. Пользователь вводит два числа (i, j), каждую секунду выводить
число от i до j (реализовать через setTimeout и setInterval).
*/

console.log(`Домашне задание 9. Задача 1 (через setTimeout)`);

const num1 = +prompt('Введите первое число');
const num2 = +prompt('Введите второе число');

console.log(`Введены числа ${num1} и ${num2}`);
let t = setTimeout(function step (a, b) {
    if (a <= b) {
        console.log(`${a}`);
        a++;
        t = setTimeout(step, 1000, a, b);
    } else {
        clearTimeout(t);
    }
}, 1000, num1, num2);

/*
(Вариант через setInterval)
*/

setTimeout(() => { // Эта обертка только для того, чтобы запустить вторую часть задания последовательно после первой.
console.log(`Домашне задание 9. Задача 1 (через setInterval)`);
let idx = num1;
const interval = setInterval(function intervalCallback (j) {
    if (idx > j) {
        clearInterval(interval);
    } else {
        console.log(`${idx}`);
        idx++;
    }
}, 1000, num2);
}, (num2 - num1 + 2) * 1000);
