function repeatString(str, num){
    let newStr = str;

    if(num <= 0){
        return "ERROR"
    }

    for(let i = 1; i < num; i++){
        newStr += str
    }
    return newStr
}

console.log(repeatString("hey", 3)); // returns 'heyheyhey'