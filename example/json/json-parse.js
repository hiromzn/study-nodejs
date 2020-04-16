var obj = {
  name: '太郎',
  age: 30,
  area: 'Tokyo'
 }
// オブジェクトデータをJSON化
 var json = JSON.stringify( obj );
 
 // JSONを再びオブジェクトデータの形式に変換
 json = JSON.parse( json );
 console.log( json.name );
