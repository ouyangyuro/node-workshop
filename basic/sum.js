console.log("hello");

// way 1
// function sum(n) {
//     let result = 0;
//     for (let i = 1; i <= n; i++) {
//         result += i;
//     }
//     return result;
// }

// way 2 better
function sum(n) {
    let result = ((n+1)*n)/2;
    return result;
}

// console.log(sum(1));
// console.log(sum(3));
// console.log(sum(10));
