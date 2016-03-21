var fs = require("fs");
var buf = new Buffer(1024);
var list_bytes = 0;

module.exports = {
	cineList : function () {
		fs.open('./cine.json', 'r+', 
			function(err, fd) {
			   if (err) {
			       return console.error(err);
			   }

			   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
			      if (err){
			         console.log(err);
			      }
			      list_bytes = bytes;
			      console.log(bytes + " bytes read");
			      
			      // Print only read bytes to avoid junk.
			      if(bytes > 0){
			      	list_bytes = bytes;
			      }
			   });
			});

	  var list = buf.slice(0, list_bytes).toString();  
	  return(list);
	},
	cineView : function (req, res, next) {
	console.log('cineView');
	  next();
	}
};
