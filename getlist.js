var fs = require("fs");
var buf = new Buffer(128000);
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
	cineNew : function (req) {
		//https://jsfiddle.net/35pcuxoo/ 
		var show =  '{ "cine0" : { ' +
				    '    "title" : "' + req.body.title + '",  ' +
					'    "poster" : "images/'+ req.file.originalname +'",  ' +
					'    "text": {  ' +
					'  		"line0": "'+ req.body.line0 +'",  ' +
					'  		"line1": "'+ req.body.line1 +'",  ' +
					'		"line2": "'+ req.body.line2 +'",  ' +
					'		"line3": "'+ req.body.line3 +'"   ' +
					'  		},    ' +
	  				'    "id": 0  ' +
   					'	}  ' +  
    				'}';

    	var new_show = JSON.parse( show );
    	var old_list = JSON.parse( this.cineList() );

		var newlist = {};

		newlist.cine0 = new_show.cine0;
		
		for ( var i in old_list) {
			var item = eval("old_list."+ i);
			item.id++;
			eval("newlist.cine"+ item.id + "= item;");		
		}
		this.saveList( JSON.stringify(newlist) );
		console.log( JSON.stringify(newlist) ) ;
		return( JSON.stringify(newlist) );
	},
	saveList : function (data) {
	    var file = __dirname + "/cine.json";
			
        fs.writeFile(file, data, function (err) {
        if( err ){
              console.log( err );
            }else{
            	console.log('list updated');
            	return (data);
            }
        });

	}
};
