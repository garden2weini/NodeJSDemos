var Client = require('node-rest-client').Client;

var options = {
        mimetypes: {
            json: ["application/json", "application/my-custom-content-type-for-json;charset=utf-8"]
        }
    };
var client = new Client(options);

exports.demo1 = function () {
    // direct way
    client.get("http://127.0.0.1:8081/bjsonData", function (data, response) {
        // parsed response body as js object
        console.log(data);

        // raw response
        //console.log(response);
    });
}

//添加的新用户数据
var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
}

exports.demo2 = function (res, counter) {
    // registering remote methods
    client.registerMethod("jsonMethod", "http://127.0.0.1:8081/jsonData", "GET");

    client.methods.jsonMethod(function (data, response) {
        // parsed response body as js object
        // console.log(data.toString());
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        counter++;
        console.log("异步Counter:" + counter);
        res.end( JSON.stringify(data) );
    });
}
