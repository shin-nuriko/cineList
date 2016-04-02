var socket = io();

var saveList = function(list) {
    var ctr = 0;
	var newlist = {};

	for(var item in list) {
		if (ctr < 4) { //we just need for. should make this configurable
			eval('newlist.cine' + ctr + ' = list.' + item);
			ctr++;
		}
	}

	var hidden_list = JSON.stringify(newlist);
	$("#hiddenlist").text(hidden_list);
}

var loadCineList = function() {
  var hidden_list = $("#hiddenlist").text();
  list = JSON.parse(hidden_list);	
  //convert json to array
  var posters = [];
  for (i = 0; i < 4; i++) {
  	if (typeof eval("list.cine" + i) != 'undefined') {
  		posters[i] = eval("list.cine" + i + ".poster");
	}
  }
  imgName = loadImages(posters);
  saveList(rotateList(list));
};

var rotateList = function(list) {
	var newlist = {};
	var next = max = 0;
	for (i = 0; i < 4; i++) {
		next++;
		if (typeof eval("list.cine" + next) != 'undefined') {
			eval("newlist.cine" + i + " = list.cine" + next);
			max++;
		}
	}
	eval("newlist.cine" + max + " = list.cine0");
	return(newlist);
}

var loadImages = function(images) {
	var rand_name = "poster" + ( Math.floor((Math.random() * 100) + 1) );
	var poster = '<img class="'+ rand_name +'" src="' + images[0] + '">';
	$("#left img").remove();
	$("#right ul li").remove();
	$("#left").html(poster).fadeIn();

	for (i = 1; i < images.length; i++) {
		poster = '<li><img class="' + rand_name + '" src="' + images[i] + '"></li>';
		$("#right ul").append(poster).fadeIn();
	}

	return (rand_name);
}

socket.on('cine list', function(msg){
	var cineList = JSON.parse(msg);
		saveList(cineList);
		loadCineList();

		setInterval('loadCineList()', 30000);

});

