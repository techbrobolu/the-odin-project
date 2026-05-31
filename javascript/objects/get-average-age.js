function getAverageAge(arr){
    return arr.reduce((avg, item) => avg + (item.age/3), 0)
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let users = [john, pete, mary];

console.log(getAverageAge(users)); // (25 + 30 + 29) / 3 = 28
