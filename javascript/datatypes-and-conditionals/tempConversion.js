function convertToCelsius(temp){
    return ((temp - 32) * 5/9)
}

function convertToFahrenheit(temp){
    return ((temp * 9/5) + 32)
}

console.log(convertToCelsius(32).toFixed(1));
 // fahrenheit to celsius, should return 0.0

console.log(convertToFahrenheit(0).toFixed(1));
 // celsius to fahrenheit, should return 32.0