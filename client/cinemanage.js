var socket = io();

var saveList = function(list) {
	var hidden_list = JSON.stringify(list);
	$("#hiddenlist").text('');//clear first
	$("#hiddenlist").text(hidden_list);
}

var getList = function() {
	var hidden_list = $("#hiddenlist").text();
    return(JSON.parse(hidden_list));
}

var displayManageList = function() {
	var list = getList();
	$(".shows_list").text('');//clear first
	for(var item in list) {
		var show = eval("list." + item);
		displayItem( show );
	}
}

//rewrite to use a templating system 
var displayItem = function(item) {
	var cine = '<div class="item" data-id="'+ item.id +'" id="cine' + item.id +'">';
	var show = buildShow(item);
	var form = buildForm(item);

	cine += show + form + '</div>';
	$(".shows_list").append(cine);

	$(".action .edit").on("click", function() {
		var id = $(this).data('id');
		var show_item = eval('$("#cine'+ id +' .update")');
		var hide_item = eval('$("#cine'+ id +' .show")');
		swapViews(show_item, hide_item);
	});

	$(".action .close").on("click", function() {
		var id = $(this).data('id');
		var hide_item = eval('$("#cine'+ id +' .update")');
		var show_item = eval('$("#cine'+ id +' .show")');
		swapViews(show_item, hide_item);
	});

}

var buildShow = function(item) {
	var show = '';
	show += '<div class="show">' +
			'	<div class="info">' +
			'		<div class="title">'+ item.title +'</div>';
	for (var id in item.text) {
		var text = eval("item.text." + id);
		show += '<div class="text">'+ text +'</div>';
	}
	
	show +=	'	</div>' +
			'	<div class="poster">' +
			'		<img src="'+ item.poster +'">' +
			'	</div>' +
			'	<div class="action">' +
			'		<i data-id="'+ item.id +'" class="material-icons w3-large edit">edit</i>' +
			'		<i data-id="'+ item.id +'" class="material-icons w3-large delete">delete</i>' +
			'	</div>' +
			'</div>' ;
	return (show);
}

var buildForm = function(item) {
	var form = '<div class="update hide"><div class="form"><form action="" method="" accept-charset="utf-8">' +
					'<input type="hidden" name="id" value="'+ item.id +'">' +
					'<table width="100%" border="0">'+
					'<tr><td>Title</td><td> <input name="title" value="'+ item.title +'"></td></tr>';

		for (var id in item.text) {
			var text = eval("item.text." + id);
			form += '<tr><td>Line '+ id +'</td><td><input name="text1" value="'+ text +'"></td></tr>';
		}

		form += '<tr><td>Poster Image</td><td><input type="file" name="poster"></td></tr></table>' +
				'<p><input type="submit" value="Update" /></p>' +
				'</form></div><div class="action">'+ 
				'<i data-id="'+ item.id +'" class="material-icons w3-large close">close</i></div></div>';

	;
	return(form);
}

var swapViews = function(show_item, hide_item) {
	show_item.removeClass("hide");
	hide_item.addClass("hide");
}

$( document ).ready(function() {
    $.get( "getList", function( response ) {
    	var cineList = JSON.parse(response);
		saveList(cineList);
		displayManageList();
	});

	$("#addShow").submit( function() {
		var formData = new FormData($(this));
		formData.append('title', $(this)[0].ntitle.value);
		formData.append('line0', $(this)[0].line0.value);
		formData.append('line1', $(this)[0].line1.value);
		formData.append('line2', $(this)[0].line2.value);
		formData.append('line3', $(this)[0].line3.value);
		formData.append('poster', $(this)[0].poster.files[0]);
		$.ajax({
		    url: 'new_show',
		    type: 'POST',
		    data: formData,
		    async: false,
		    success: function (data) {
		    	$("#addShow")[0].reset();
		        saveList( JSON.parse(data) );
				displayManageList();
		    },
		    cache: false,
		    contentType: false,
		    processData: false
		});
		event.preventDefault();
		return false;		
	});

});//document ready
