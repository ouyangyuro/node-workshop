// 請問下列程式碼印出的順序為何？//41352

function syncF() {
    console.log(1);
  
    setTimeout(() => {
      console.log(2);
    }, 0);
    console.log(3);
  }
  
  console.log(4);
  syncF();
  console.log(5);

  /* 4跑完後->下一行就進去function跑１遇到setTimeout先丟給libuv(node.js(瀏覽器上是web api))做,然後跑３->funnction 跑完後跑５->最後eventloop看到stack空了將Q裡的東西搬過去跑２ */