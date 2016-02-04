var express = require('express');
var app     = express();

app.use(express.static(__dirname + '/public/dist'));

app.get('/', function(req, res) {
    res.sendfile('./public/dist/views/index.html');
});

app.listen(9001);
console.log('project running on 9001');