function copySorted(arr){
    let cloneArr = arr.slice().sort()

    return cloneArr
}

let arr = ["HTML", "JavaScript", "CSS"];
let sorted = copySorted(arr);

console.log( sorted ); // CSS, HTML, JavaScript
console.log( arr ); // HTML, JavaScript, CSS (no changes)