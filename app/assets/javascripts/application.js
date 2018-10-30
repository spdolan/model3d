// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require openjscad_min
//= require_tree .

// $(window).load(function() {
	
// });

$(document).ready(function(){

	//initial check if jSCAD lib is loaded
	var err_div = $('#errordiv').attr('style');
	console.log(err_div);

	if(err_div != 'display: none;'){
		window.location.reload(true);
	};

	$('.downloadOutputFileLink').on('click', function (e) {		  
		  //check if user is signed in
		  var sign_in = document.getElementById('signin');
		  var msg = "We hope you enjoy your custom model! Sign In to share with others or order a print."
		  if(sign_in !== null){
		  //prevent JSCAD save file
		  e.preventDefault();
		  
		  //grab tmp file url, and named variables from params
		  var file_url = $(this).attr('href');
		  var url_array = file_url.split(":")
		  var thing_path = "localhost:" + url_array[url_array.length - 1]
		  var file_title = $('[name="text"]').val();
		  var msg = "Congrats on your custom model! Redirecting you to your home page."
		  //create formData upload
		  var data = new FormData();
		  data.append(file_title, thing_path)
		  
		  console.log(thing_path);
		  console.log(file_title);
		  

		  var get_url = "/things";
		  $.ajax({
				    
				    type: "POST",
				    url: get_url,
				    data: { thing: { name: file_title + "_Stamp", description: "my thing", thing_url: thing_path, image_url:"" } },
					
    				
				});

			//window.location.reload(true);		  
		}

		alert(msg);
	});
});

$('.carousel').carousel({
  interval: 2000
})