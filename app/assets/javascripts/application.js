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

$( document ).on('turbolinks:load', function() {

	//initial check if jSCAD lib is loaded
	var jscad = $('#errordiv'); //document.getElementById('jscad-container');
	if(jscad.length){
		
		var err_div = $('#errordiv').attr('style');
		console.log(err_div);

		if(err_div != 'display: none;'){
			window.location.reload(true);
		};
	};

	$('.downloadOutputFileLink').on('click', function (e) {		  
		  //check if user is signed in
		  var sign_in = document.getElementById('signin');
		  var msg = "We hope you enjoy your custom model! Sign In to share with others or order a print.";
		  if(sign_in !== null){
		  //prevent JSCAD save file
			  e.preventDefault();
			  console.log("I think you're logged in!");
			  //grab tmp file url, and named variables from params
			  var file_url = $(this).attr('href');
			  var f = new File([""], file_url);
			  //var i = new File([""], "http://localhost:3000/assets/images/oshw.png");
			  var url_array = file_url.split(":");
			  var thing_path = "localhost:" + url_array[url_array.length - 1];
			  var file_title = $('[name="text"]').val();
			  var my_id = $('#myid').attr('href');
			  //housekeeping stuff
			  var msg = "Congrats on your custom model! Redirecting you to your home page.";
			  var today = new Date();
			  var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
			  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			  var dateTime = date+' '+time;

			  //create formData upload
			  var formData = new FormData(), $input = $(this);
			  
			  	//populate our flat formData
			  	formData.append('thing[name]',file_title);
			  	formData.append('thing[thing_url]',f);
			  	formData.append('thing[description',"Created with model3d on " + dateTime);
			  	formData.append('thing[image_url]',"");
			  	formData.append('thing[user_id]', my_id);

				$.ajax({
				  url: "/things",
				  data: formData,
				  cache: false,
				  contentType: false,
				  processData: false,
				  type: 'POST'
				});

			//window.location.reload(true);		  
		};

		alert(msg);
	});
});

$('.carousel').carousel({
  interval: 2000
})