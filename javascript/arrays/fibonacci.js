function getFibonacci(num){
    let sequence = [1, 1]
    let accVal = 1

    for(let i = 0; i < num; i++){
        accVal += sequence[sequence.length - 2]
        sequence.push(accVal)
    }

    return sequence[num - 1]
}

console.log(getFibonacci(4)); // returns the 4th member of the series: 3  (1, 1, 2, 3)
console.log(getFibonacci(6)); // returns 8