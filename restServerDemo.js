var express = require('express');
var app = express();
var mysql = require('mysql');
var request = require('request');
var fs = require("fs");
var rest = require("./restClientDemo.js");

// http://127.0.0.1:8081/bet:0001/cnt:123
app.get('/bet:gameId/cnt:cnt', function (req, res) {
    console.log( "hello nodejs" );
    var tmp1 = req.params.gameId;
    var tmp2 = req.params.cnt;
    var tmp0 = -100;

    var connection = mysql.createConnection({
      host     : '100.69.199.197',
      user     : 'root',
      password : '1qaz@WSX',
      database : 'rgs'
    });
    connection.connect();

    var sql = "select game_id as gameID from t_prize_level a where a.prize_level_id=10001201";
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      tmp0 = results[0].gameID;
      console.log('The solution is: ', tmp0);
      res.end( "hello nodejs:" + tmp1 + ":" + tmp2 + ":" + tmp0);
        connection.end();
    });

})

app.get('/bjlot', function (req, res) {
    request('http://www.bjlot.com/index.shtml', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 打印google首页
            res.end(body);
        } else {
            res.end(error);
        }
    })
    // *Node异步(IO)特性*：如果不注释如下语句，则在bjlot网站请求返回前（无论访问是否成功），就会response！
    // res.end("Error! can't connect google.");
})


app.get('/jsonData', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       //console.log( data );
       res.end( data );
   });
})

app.get('/getRestResult', function (req, res) {
    var counter = 0;
    console.log("Counter1:" + counter);
    rest.demo2(res, counter);
    // 验证异步调用与变量变更顺序
    console.log("Counter2:" + counter);
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://127.0.0.1:%s", port)
})