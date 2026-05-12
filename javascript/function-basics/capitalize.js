function capitalize(str){
    let newStr = str.toLowerCase()
    return newStr.charAt(0).toUpperCase() + newStr.slice(1)
}

console.log(capitalize("abcd")); // should return "Abcd"
console.log(capitalize("ABCD")); // should return "Abcd"
console.log(capitalize("aBcD")); // should return "Abcd"