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

// 刷牙 -> 吃早餐 -> 寫功課
async function getData() {
    let job1 = await doWork("刷牙", 3000, true);
    console.log(job1);
    let job2 = await doWork("吃早餐", 5000, true);
    console.log(job2);
    let job3 = await doWork("寫功課", 3000, true);
    console.log(job3);
    console.log("print all at one time",job1, job2, job3);
}
getData();