/**
	We did not write the getRandomInt function.
    Returns a random integer between min (inclusive) and max (inclusive)
    Using Math.round() will give you a non-uniform distribution!
    Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* The function above was taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
**  We did not write the getRandomIntINclusive Function. */

// ***** Usage Map Feature ***** \\
   	var monthLength = 28;

// This is the format of the infoWindow in the Usage Map
// It will tell the user how long they used x social media at a certain location
// may expand to have activity overview.
function createInfoWindowHTML(location, when, socialmedia, duration){
	var newcontent = '<div id="content">'+
	'<h3 style="background-color: #FFF;">You spent ' + duration + ' on ' + socialmedia + ' at ' + location +'</h3>' +
	// '<h2 style="background-color: #FFF!important; " id="firstHeading" class="firstHeading">'+ location +'</h2>'+
	'<h4 style="background-color: #FFF!important; " id="secondHeading" class="secondHeading"> From ' + when + '</h4>'+
	'<div id="bodyContent">'+
	'</div>'+
	'</div>';
	return newcontent;
}

// This is a google map marker that looks like the Facebook Icon
var markerFacebook = {
	path: fontawesome.markers.FACEBOOK_SQUARE,
	scale: 0.7,
	strokeWeight: 0.2,
	strokeColor: 'black',
	strokeOpacity: 1,
	fillColor: '#3b5998',
	fillOpacity: 1,
}

// This is a google map marker that looks like the Insta Icon
var markerInstagram = {
	path: fontawesome.markers.INSTAGRAM,
	scale: 0.7,
	strokeWeight: 0.2,
	strokeColor: 'black',
	strokeOpacity: 1,
	fillColor: '#fbad50',
	fillOpacity: 1,
}

// This is a google map marker that looks like the Twitter Icon
var markerTwitter = {
	path: fontawesome.markers.TWITTER,
	scale: 0.7,
	strokeWeight: 0.2,
	strokeColor: 'black',
	strokeOpacity: 1,
	fillColor: '#1da1f2',
	fillOpacity: 1,
}

// Lat/Longitude for places the user used social media on campus
var tech = {lat: 42.058, lng: -87.676};
var kemper = {lat: 42.061073, lng: -87.674911};
var kemper2 = {lat: 42.060608, lng: -87.675671};
var mainLibrary = {lat: 42.053249, lng: -87.674109};
var noyes = {lat: 42.058205, lng: -87.683476};
var lakefill = {lat: 42.054239, lng: -87.670287};
var plex = {lat: 42.052896, lng: -87.678804};
var spac = {lat: 42.059383, lng: -87.672731};


// Populate array with variables to make markers.
// Will use this data to make markers on map inside the initMap() function.
var usageData = [
[tech, createInfoWindowHTML("Tech", "2:25 p.m.-4:45 p.m.", "Facebook", "2h 20m"), markerFacebook ],
[kemper, createInfoWindowHTML("Kemper", "4:45 p.m.-5:45 p.m.", "Instagram", "45m"), markerInstagram ],
[mainLibrary, createInfoWindowHTML("Tech", "5:30 p.m.-6:45 p.m.", "Twitter", "1h"), markerTwitter ],
[noyes, createInfoWindowHTML("Noyes", "10:30 p.m.-12:45 a.m.", "Twitter", "15m"), markerTwitter ],
[lakefill, createInfoWindowHTML("Lakefill", "11 a.m.-12:45 a.m", "Instagram", "15m"), markerInstagram],
[spac, createInfoWindowHTML("SPAC", "9 a.m.-12:45 a.m", "Instagram", "15m"), markerInstagram],
[plex, createInfoWindowHTML("Plex", "12:30 p.m.-12:45 a.m", "Facebook", "30m"), markerFacebook],
[kemper2, createInfoWindowHTML("Kemper", "8:30 a.m.-12:45 a.m", "Twitter", "30m"), markerTwitter ],

];

// This is a fundamental function to generate the google map
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: {lat: 42.056869, lng:-87.675571}
	});

	//use usageData array to make markers on the map
	var markers=[];
	for (var i=0;i<usageData.length;i++){
		markers[i] = new google.maps.Marker({
			position: usageData[i][0],
			map: map,
			content: usageData[i][1],
			icon: usageData[i][2]
			// ,animation: google.maps.Animation.BOUNCE
			/* This is buggy and we tried a few known workaround,
			but couldn't get a really good solution. We think it's
			better to have it buggy but show the pins drop in order
			for the user to understand that they can click the pins.*/
		});


		//Make the markers clickable, displaying content about social media usage.
		google.maps.event.addListener(markers[i], 'click', function() {
			// Close old infowindow + open new one
			infowindow.close();
			infowindow.setContent(this.content);
			infowindow.open(map, this);
		});
		//Make the markers bounce when your mouse hovers over them
		google.maps.event.addListener(markers[i], 'mouseover', function() {
			// Close old infowindow + open new one
			this.setAnimation(google.maps.Animation.BOUNCE);
		});
		//Make the markers stop bouncing, when you stop hovering.
		google.maps.event.addListener(markers[i], 'mouseover', function() {
			// Close old infowindow + open new one
			this.setAnimation(null);
		});

	}


	//This variable will handle the information for all the markers on the map
	var infowindow = new google.maps.InfoWindow({});

  // Load the map when Usage tab is opened.
  $('a[href=".usage"]').on('shown.bs.tab', function(e){
  	initMap();
  });
}


// ***** Goals Feature ***** \\

function showMyGoals(listOfGoals, parentElem) {
	for (x=0; x< listOfGoals.length; x++) {
		prependGoal(listOfGoals[x], parentElem, getRandomIntInclusive(0, monthLength));
	}
}

function prependGoal(goal, parentElem, progress) {
	var progressStatus;
	console.log("progress: " + progress);
	// the progress bar goes from -100 to 100, based on whether user is progressing or regressing.
	// use the margin to create the offset visually.
	var warningLevel = monthLength * 2/3;
	var dangerLevel = monthLength * 1/3;

	if (progress >= warningLevel) {
		progressStatus = "success";
	} else if (progress >= dangerLevel) {
		progressStatus = "warning";
	} else {
		progressStatus = "danger";
	}
	var progressPercent = (progress/monthLength)*100;
	var newElem =
	'<li class="col-md-12 col-sm-12">' +
		'<div class="col-md-12 col-sm-12" style="padding:0;">'+
		'<span class="btn-circle glyphicon glyphicon-time col-md-2 col-sm-2"></span>'+
		'<p class="col-md-10 col-sm-10">'+goal+'</p>' +
		'</div>'+
		'<div class="col-md-12 col-sm-12" style="padding:0;">'+
			'<span class="col-md-2 col-sm-2" id="progressBarText">' + progress +'/'+monthLength +'</span>'+
			'<div class="progress col-md-10 col-sm-10" style="padding: 0;">' +
				'<div class="col-md-12 col-sm-12 progress-bar progress-bar-' + progressStatus + '" ' +
					'role="progressbar" aria-valuenow="'+progressPercent+'" aria-valuemin="0" aria-valuemax="100" ' +
					'style="width: ' + progressPercent + '%;">' +
				'</div>'+
			'</div>'+
		'</div>'+
	'</li>';
	// console.log(newElem);
	$(parentElem).prepend(newElem);
}


// This will hold all set goals for the user
var myGoals =[
	"Don't use Facebook at Tech",
	"Don't use any SM before 9 am",
	"Don't use any SM after 9 pm",
	"Talk to Francine at least bi-weekly",
	"Use SM for less than 2 hours a day"
	// ,"Don't use Twitter at lunch."
];

var myInteractions = [
	["SpongeBob SquarePants", "Exchanged 1000 messages on Facebook this month.", "You liked 10 of their photos on Instagram.", "They favorited 6 of your tweets.", "You were tagged in 12 of their photos together."],
	["Patrick Star", "Sent you 9 snaps this month.", "You commented on 4 of their posts.", "You retweeted 9 of their tweets."],
	["Sandy Cheeks", "@replied them 12 times on Twitter.", "You exchanged 20 direct messages on Twitter.", "They commented on 3 of your Facebook statuses."]
];
// Interactions
// function showMyInteractions(listOfInteractions, parentElem) {

// 	var interaction, newElem, interactionHTML = "";
// 	console.log("length of interactions: " + listOfInteractions.length);
// 	for (var x=0; x<listOfInteractions.length; x++) {
// 		console.log("x: " + x);
// 		interaction = listOfInteractions[x];
// 		newElem =
// 			'<li class="col-md-12 col-sm-12">' +
// 			'<span class="btn-circle glyphicon glyphicon-menu-down col-md-2 col-sm-2"></span>'+
// 			interaction[0]+
// 			'<ul>';
// 		// Create list elements for everthing else in 'interaction'
// 		for (var x=1; x<interaction.length; x++) {
// 			newElem = newElem + '<li>'+interaction[x]+'</li>';
// 		}
// 		newElem = newElem + '</ul></li>';
// 		// append this to interactionHTML before sending to HTML DOM.
// 		interactionHTML = interactionHTML + newElem;
// 	}
// 	console.log(interactionHTML);
// 	$(parentElem).prepend(interactionHTML);

// }

function preprendInteraction(interaction, parentElem) {

	var newElem =
	'<li class="col-md-12 col-sm-12">' +
		'<div class="col-md-12 col-sm-12" style="padding:0;">'+
		'<span class="btn-circle glyphicon glyphicon-menu-down col-md-2 col-sm-2"></span>'+
		interaction[0]+
		'</div>'+
		'<ul>';
	// Create list elements for everthing else in 'interaction'
	for (x=1; x<interaction.length; x++) {
		newElem = newElem + '<li>'+interaction[x]+'</li>';
	}
	newElem = newElem + '</ul></li>';
	console.log(newElem);
	$(parentElem).prepend(newElem);

}

// Color information for calendar.
var goalStatusLegend = ["#ec971f", "#c9302c", "#449d44"];
var tmpInd, statusColor;

// We need to wait for the document to be "ready" before we can update html elements
// like the list of goals.
$(document).ready(function(){

	// Make our scrollbar nicer for scrolls
    // $('#myGoals').slimScroll({ height: '475px' });
    // $('#myInteractions').slimScroll({ height: '475px' });

	// call tootip if the element is hovered.
    $('[data-toggle="tooltip"]').tooltip();

    // display myGoals array as a list in the dom.
	showMyGoals(myGoals,"#myGoals");

	$("#newGoalSubmit").click(function() {
		// alert("CLICKED BITCH");
		var userInputGoal = $("#newGoalInput").val();
		console.log("userInputGoal", userInputGoal);
		if (userInputGoal !== "") {
			// alert(userInputGoal);
			myGoals.push(userInputGoal);
			prependGoal(userInputGoal, "#myGoals", 0);
			$("#draftNewGoal").toggleClass("hidden");
			$("#draftNewGoalBtn").children().toggleClass("glyphicon-menu-up glyphicon-pencil");
		    $("#myGoals li .btn-circle").each(function() {
		    	$(this).toggleClass('glyphicon-remove glyphicon-time');
		    })
		    // display infowindow that alerts user there new goals is registered.
		    $("#goals").append('<li id="newGoalAlert" class="alert alert-success alert-dismissible">' +
		    	'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
				'You have set a <strong>new goal!</strong></li>');
		}
	});

	// Remove goal if the "remove" icon next to it is clicked.
    $('body').on('click', 'span.glyphicon-remove', function(e) {
    	$(this).parent().parent().remove();
    });

	$('body').on('click', 'span.glyphicon-menu-down', function(e) {
		$(this).parent().next().toggleClass("hidden");
		$(this).toggleClass("glyphicon-menu-down glyphicon-menu-right");
	});

	$('body').on('click', 'span.glyphicon-menu-right', function(e) {
		$(this).parent().next().toggleClass("hidden");
		$(this).toggleClass("glyphicon-menu-down glyphicon-menu-right");
	});

    	// Click the circular orange button to draft a new goal.
	$("#draftNewGoalBtn").click(function() {
		$("#draftNewGoal").toggleClass("hidden");
	    $("i", this).toggleClass("glyphicon-menu-up glyphicon-pencil");
	    // Make a clickable icon next to each existing goal
	    // this will let user delete goals.
	    $("#myGoals li .btn-circle").each(function() {
	    	$(this).toggleClass('glyphicon-remove glyphicon-time');
	    })
	});

	// generate random colors on cal for days that have past.
	$(".days li").each(function() {
		if ($(this).hasClass('active')) {
			return false;
		} else {
			tmpInd = getRandomIntInclusive(0,2);
			statusColor = goalStatusLegend[tmpInd];
			$(this).css('background', statusColor);
		}
	});
});