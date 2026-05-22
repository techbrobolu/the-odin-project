function leapYears(year){
    if (year % 400 == 0){
        return true
    } else if(year % 4 == 0 && year % 100 !== 0){
        return true
    } else{
        return false
    }
}

console.log(leapYears(2000)); // is a leap year: returns true
console.log(leapYears(1985)); // is not a leap year: returns false
