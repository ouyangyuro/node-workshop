const express = require("express");

// 利用 express 建立了一個 express application
let app = express();

//HTTP Method: get, post, put, patch, delete
app.get("/", function(requset, response, next){
    response.send("Hello Home")
})

app.get("/about", function(requset, response, next){
    response.send("about")
})

app.listen(3000, ()=>{
    console.log("star web server");
})