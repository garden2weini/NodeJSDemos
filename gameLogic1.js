require('crypto').randomBytes(16, function(ex, buf) {
    var token = buf.toString('hex');
    console.log(token);

});

console.log(process.argv.slice(1));

var numInput = 100;
var tt = Number(Math.random() * numInput).toFixed(0);
console.log(tt);
