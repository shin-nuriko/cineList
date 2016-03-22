var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var cine = require('./getlist.js')
app.use(express.static('public'));

//app.use(cine.cineList);

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/client/" + "cineview.html" );
})

app.get('/manage', function (req, res) {
   res.sendFile( __dirname + "/client/" + "cinemanage.html" );
})

app.get('/getlist', function (req, res) {
   res.send(cine.cineList());
})

app.get('/js/*', function (req, res) {
   var file = req.path.match(/[a-zA-Z]+.js/g);
   res.sendFile( __dirname + "/client/" + file );
})

app.get('/css/*',  function (req, res) {
   var file = req.path.match(/[a-zA-Z]+.css/g);
   res.sendFile( __dirname + "/client/" + file );
})

io.on('connection', function(socket){
  console.log('a user connected');
  console.log(cine.cineList())
  io.emit('cine list', cine.cineList());
});


http.listen(8081, function () {

  var host = http.address().address
  var port = http.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})