function isPalindrome(word){
    let newWord = word.split(" ").join("").split(",").join("")
    let i = 0
    let j = newWord.length - 1

    for(; i < Math.floor(newWord.length/2); i++){
        if(newWord[i] !== newWord[j]){
            return false
        }

        j--
    }

    return true
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("tacos")); // false
