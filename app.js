var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var multer  = require('multer'); 
var fs = require("fs");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var cine = require('./getlist.js')
app.use(express.static('public'));
app.use(multer({ dest: '/tmp/'}).single('poster'));

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

app.post('/new_show', urlencodedParser, function (req, res) {
   var file = __dirname + "/public/images/" + req.file.originalname;
   fs.readFile( req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
        if( err ){
              console.log( err );
            }else{
            	var new_list = cine.cineNew(req);
            	console.log('forwarded response');
            	io.emit('cine list', new_list);
            	res.send( new_list ); //updated list
            }
        });
    });
});

io.on('connection', function(socket){
  io.emit('cine list', cine.cineList());
});

http.listen(8081, function () {

  var host = http.address().address
  var port = http.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})