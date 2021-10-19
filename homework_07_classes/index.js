/*
Задача 1.
Реализовать объект animal, с полем клички, методом eat, выводящим сообщение "Кличка ест"
и методом say, выводящим фразу, "неизвестное животное молчит", путём прототипного
наследования создать объекты кота, собаки и попугая. Переопределить в них метод say,
в зависимости от типа животного. Для кота добавить новый метод hunt, выводящий сообщение
"Кличка охотится". Все перечисленные методы и свойства должны быть защищены от удаления и
перезаписи. Методы должны быть неперечисляемыми. Разработать метод rename, для смены клички
животного. Новая кличка должна содержать только кирилические символы, пробелы или символ "-".
 */

console.log('Домашнее задание 7. Часть 1');

const animal = {
    name: 'Животное',
    eat () {
        console.log(`${this.name} ест`);
    },
    say () {
        console.log(`неизвестное животное молчит`);
    },
    rename (newName) {
        const regexp = /^[а-яА-ЯёЁ\s-]+$/g;
        if (newName.match(regexp)) Object.defineProperty(this, 'name', {value: newName});
    }
}

const cat = {
    __proto__: animal,
    name: "Мурка",
    say () {
        console.log(`Кошка говорит`);
    },
    hunt () {
        console.log(`${this.name} охотится`);
    }
}

const dog = {
    __proto__: animal,
    name: "Тузик",
    say () {
        console.log(`Собака говорит`);
    }
}

const parrot = {
    __proto__: animal,
    name: "Кеша",
    say () {
        console.log(`Попугай говорит`);
    }
}

Object.defineProperty(animal, 'name', {writable: false, configurable: false, enumerable: true});
Object.defineProperty(animal, 'eat', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(animal, 'say', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(animal, 'rename', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(cat, 'name', {writable: false, configurable: true, enumerable: true});
Object.defineProperty(cat, 'say', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(cat, 'hunt', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(dog, 'name', {writable: false, configurable: true, enumerable: true});
Object.defineProperty(dog, 'say', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(parrot, 'name', {writable: false, configurable: true, enumerable: true});
Object.defineProperty(parrot, 'say', {writable: false, configurable: false, enumerable: false});

console.log(Object.getOwnPropertyDescriptors(animal));
console.log(Object.getOwnPropertyDescriptors(cat));
console.log(Object.getOwnPropertyDescriptors(dog));
console.log(Object.getOwnPropertyDescriptors(parrot));

animal.say();
cat.eat();
cat.say();
cat.hunt();
dog.eat();
dog.say();
parrot.eat();
parrot.say();

dog.rename('Бобик');
dog.eat();


/*
Выполнить то же самое использую функции конструкторы.
*/

console.log('\nДомашнее задание 7. Часть 2 (Функции-конструкторы)');

function Animal (name) {
    this.name = name;
    this.eat = function () {
        console.log(`${this.name} ест`);
    }
    this.say = function () {
        console.log(`неизвестное животное молчит`);
    }
}

function Cat () {
    Animal.call(this, "Мурка");
    this.say = function () {
        console.log(`Кошка говорит`);
    }
    this.hunt = function () {
        console.log(`${this.name} охотится`);
    }
}

function Dog () {
    Animal.call(this, "Тузик");
    this.say = function () {
        console.log(`Собака говорит`);
    }
    this.rename = function (newName) {
        const regexp = /^[а-яА-ЯёЁ\s-]+$/g;
        if (newName.match(regexp)) Object.defineProperty(this, 'name', {value: newName});
    }
}

function Parrot () {
    Animal.call(this, "Кеша");
    this.say = function () {
        console.log(`Попугай говорит`);
    }
}

const cat2 = new Cat();
const dog2 = new Dog();
const parrot2 = new Parrot();

Object.defineProperty(cat, 'name', {writable: false, configurable: true, enumerable: true});
Object.defineProperty(cat, 'say', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(cat, 'eat', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(cat, 'rename', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(cat, 'hunt', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(dog, 'name', {writable: false, configurable: true, enumerable: true});
Object.defineProperty(dog, 'say', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(dog, 'eat', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(dog, 'rename', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(parrot, 'name', {writable: false, configurable: true, enumerable: true});
Object.defineProperty(parrot, 'say', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(parrot, 'eat', {writable: false, configurable: false, enumerable: false});
Object.defineProperty(parrot, 'rename', {writable: false, configurable: false, enumerable: false});

console.log(Object.getOwnPropertyDescriptors(cat));
console.log(Object.getOwnPropertyDescriptors(dog));
console.log(Object.getOwnPropertyDescriptors(parrot));

cat2.eat();
cat2.say();
cat2.hunt();
dog2.eat();
dog2.say();
parrot2.eat();
parrot2.say();

dog2.rename('Бобик');
dog2.eat();


/*
Выполнить то же самое, используя классы.
*/

console.log('\nДомашнее задание 7. Часть 3 (Классы)');

