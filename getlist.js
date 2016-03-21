module.exports = {
	cineList : function () {
	  console.log('inside getlist.js cineList');
	  var list = '{"cine0":{"title":"Fight Club","poster":"images/fightclub.jpeg","text":{"0":"","1":"","2":"","3":""},"id":0},"cine1":{"title":"Gone With The Wind","poster":"images/gonewiththewind.jpeg","text":{"0":"","1":"","2":"","3":""},"id":1},"cine2":{"title":"Princess Bride","poster":"images/princessbride.jpeg","text":{"0":"","1":"","2":"","3":""},"id":2}}';
	  return(list);
	},
	cineView : function (req, res, next) {
	console.log('cineView');
	  next();
	}
};
