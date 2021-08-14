console.log("main")
const car = require("./car1");
console.log("car1 after main")
const car2 = require("./car2")
console.log("car2 after main")

console.log(car2);
console.log(car);
console.log(car.showBrand());
car.setOwner("ou");
console.log(car.showOwner());