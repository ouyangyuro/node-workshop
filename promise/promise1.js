let doWork = function (job, timer, isOK) {
    return new Promise((resolve, reject) => { //resolve == true, reject ==false
        setTimeout(() => {
            let dt = new Date();
            if (isOK) { //true
                resolve(`finish job: ${job} at ${dt.toISOString()}`);
            }
            else { //false
                reject(`fail ${job}`);
            }
        }, timer);
    });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);


let job1 = doWork("刷牙", 3000, false);
// 刷牙 -> 吃早餐 -> 寫功課
job1.then(
    function(resolve){
        console.log("first function:",resolve);
    },
    function(reject){
        console.log("second function:",reject);
    }
);

