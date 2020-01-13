const fs = require("fs");

const myname = String(process.argv[1]);
const fname = String(process.argv[2]);

// Streamを準備
const stream = fs.createReadStream(fname, {
                    encoding: "utf8",         // 文字コード
                    highWaterMark: 1024       // 一度に取得するbyte数
                });

let count = 0;    // 読み込み回数
let total = 0;    // 合計byte数

// データを取得する度に実行される
stream.on("data", (chunk) => {
  count++;                 // 読み取り回数
  total += chunk.length;   // これまで読み取ったbyte数

  console.log(chunk.toString("utf8"));
});

// データをすべて読み取り終わったら実行される
stream.on("end", () => {
  console.log(`${count}回に分けて取得しました`);
  console.log(`合計${total}byte取得しました`);
});

// エラー処理
stream.on("error", (err)=>{
  console.log("ERROR : " + err.message + "\n\
		usage : " + myname + " <filename>" );
});
