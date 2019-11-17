// 通常の書き方
// 宣言より前に呼び出すことができる
console.log(fn1());
function fn1() {
  return 'text1'
}

// 変数に入れる書き方①
// 宣言より前で呼び出すことはできない
var fn2 = function fn2() {
  return 'text2'
}
console.log(fn2())

// 変数に入れる書き方②
// 宣言より前で呼び出すことはできない
// ①より短縮系
var fn3 = function() {
  return 'text3'
}
console.log(fn3());

// 変数に入れる書き方③
// 宣言より前で呼び出すことはできない
// ②よりさらに短縮系
var fn4 = () => {
  return 'text4'
}
console.log(fn4());

// 無名関数を宣言・実行したパターン
console.log((function() { return 'text5' })());

// 関数を渡して、実行結果を返す関数
var fn6 = function(fn) {
  return fn()
}
console.log(fn6(fn1));

// callメソッドで関数を実行するパターン
// 普通に実行するのとほとんど動きは変わらない
console.log(fn6.call(this, fn1));

// 関数を生成する関数？
// 良くわからないけど複雑
var fn8 = function(fn) {
  return fn()
}
var fn9 = fn8(function() {
  var fn = function () {
    return 'text9'
  }
  return fn
})
console.log(fn9());
