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

app.get('/cineview.js',  function (req, res) {
   res.sendFile( __dirname + "/client/" + "cineview.js" );
})
app.get('/cineview.css',  function (req, res) {
   res.sendFile( __dirname + "/client/" + "cineview.css" );
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