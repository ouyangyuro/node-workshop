const mysql = require("mysql");
require("dotenv").config(); 
const Promise = require("bluebird");

// 透過dotenv設定連線資料，以免資料外洩
let connection = mysql.createPool({ //宣告時要用let不能用const
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.CONNECTION_LIMIT, //預先設置連線的數量
});

connection = Promise.promisifyAll(connection);

module.exports = connection; //原本記憶體會被釋放module.exports指向connection的記憶體
// module.exports.connection = connection; //複製connection到自己的記憶體去變自己的屬性用

