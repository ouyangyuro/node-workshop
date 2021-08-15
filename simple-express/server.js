const express = require("express");

// 利用 express 建立了一個 express application
let app = express();

//使用一個"中間件"(middleware)
app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來訪問了 at ${current.toISOString()}`);
  console.log("i am first middleware");
  next();
});

app.use((req, res, next) => {
  console.log("i am second middleware");
  next();
});

//HTTP Method: get, post, put, patch, delete
app.get("/", function (requset, response, next) {
  response.send("Hello Home");
});

app.get("/about", function (requset, response, next) {
  response.send("Hello about");
});

app.listen(3000, () => {
  console.log("star web server");
});
