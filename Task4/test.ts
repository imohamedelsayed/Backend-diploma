// let myvar: string;
// myvar = "Hello, World!";


// interface Person {
//     name: string;
//     age: number;
//     eyecolor: string;
// }
// let getPerson = (person: Person) => {
//     console.log(`Name: ${person.name}, Age: ${person.age}, Eye Color: ${person.eyecolor}`);
// };
// getPerson({ name: "John", age: 30, eyecolor: "blue" });


class Car {
    model: string;
    speed: number;
    price: number;

    constructor(model: string, speed: number, price: number) {
        this.model = model;
        this.speed = speed;
        this.price = price;
    }   
        carinfo() {
        console.log(`Model: ${this.model}, Speed: ${this.speed}, Price: ${this.price}`);
    }
}
car1 = new Car("Toyota", 120, 20000);
car1.carinfo();