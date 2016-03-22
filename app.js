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
app.use(multer({ dest: './public/images/'}).single('poster'));

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
console.log(req.file);

   var file = __dirname + "/" + req.file.originalname;
   fs.readFile( req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
			       title:req.body.title,
			       line0:req.body.line0,
			       line1:req.body.line1,
			       line2:req.body.line2,
			       line3:req.body.line3,
                   poster:req.file.filename
              };
          }
       });
   });

		console.log( response );
        res.end( JSON.stringify( response ) );
});

io.on('connection', function(socket){
  io.emit('cine list', cine.cineList());
});

http.listen(8081, function () {

  var host = http.address().address
  var port = http.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})