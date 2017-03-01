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
[spac, createInfoWindowHTML("SPAC", "9 a.m.-12:45 a.m", "Instagram", "15m"), markerInstagram],
[kemper2, createInfoWindowHTML("Kemper", "8:30 a.m.-12:45 a.m", "Twitter", "30m"), markerTwitter ],

];

// This is a fundamental function to generate the google map
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {lat: 42.056869, lng:-87.675571}
	});

	//use usageData array to make markers on the map
	var markers=[];
	for (i=0;i<usageData.length;i++){
		markers[i] = new google.maps.Marker({
			position: usageData[i][0],
			map: map,
			content: usageData[i][1],
			icon: usageData[i][2]
		})
		//Make the markers clickable, displaying content about social media usage.
		google.maps.event.addListener(markers[i], 'click', function() {
			infowindow.close(); // Close the previously open window, if there is one.
			infowindow.setContent(this.content); // Set new content to info window.
		infowindow.open(map, this); // open the info window above the clicked marker.
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
	// hide the trash icon to start
    $("#myGoals li span").each(function() {
    	$(this).toggleClass('glyphicon-remove glyphicon-time');
    })
}

function prependGoal(goal, parentElem, progress) {
	var progressStatus;

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

	var newElem =
	'<li class="col-md-12">' +
		'<span class="btn-circle glyphicon glyphicon-remove col-md-3"></span> ' + goal +
		'<div class="progress col-md-9" style="padding: 0;">' +
			'<div class="col-md-12 progress-bar progress-bar-' + progressStatus + '" ' +
				'role="progressbar"' +
				'style="width: ' + ((progress/monthLength)*100) + '%;">' + progress +'/'+monthLength +
			'</div>'+
		'</div>'+
	'</li>';
	console.log(newElem);
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

var goalStatusLegend = ["#ec971f", "#c9302c", "#449d44"];


var tmpInd, statusColor;
// function showProgressOnCalendar(){
// 	$(".days li").each(function() {
// 		tmpInd = getRandomIntInclusive(0,2);
// 		statusColor = goalStatusLegend[tmpInd];
// 		statusColor = '\"background-color: ' + statusColor + '\"';
// 		$(this).css(statusColor);
// 	})
// }


// We need to wait for the document to be "ready" before we can update html elements
// like the list of goals.
$(document).ready(function(){

	// Make our scrollbar nicer for goals
    $('#myGoals').slimScroll({ height: '490px' });

	// call tootip if the element is hovered.
    $('[data-toggle="tooltip"]').tooltip();

    // display myGoals array as a list in the dom.
	showMyGoals(myGoals,"#myGoals");

	// The user has clicked the Green Button with a check mark on it
	// to submit a new goal to the list.
	$("#newGoalSubmit").click(function() {
		// alert("CLICKED BITCH");
		var userInputGoal = $("#newGoalInput").val();
		console.log("userInputGoal", userInputGoal);
		if (userInputGoal !== "") {
			// alert(userInputGoal);
			myGoals.push(userInputGoal);
			prependGoal(userInputGoal, "#myGoals", 3);
			$("#draftNewGoal").toggleClass("hidden");
			$("#draftNewGoalBtn").children().toggleClass("glyphicon-menu-up glyphicon-remove");
		    $("#myGoals li span").each(function() {
		    	$(this).toggleClass('glyphicon-remove glyphicon-time');
		    })
		    // display infowindow that alerts user there new goals is registered.
		    $("#goals").append('<li id="newGoalAlert" class="alert alert-success alert-dismissible">' +
		    	'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
				'You have set a <strong>new goal!</strong></li>');
		}
	});

	// Remove goal if the "remove" icon next to it is clicked.
    $("#myGoals li").find("glyphicon-remove").click(function() {
    	$(this).parent().remove();
    	// we would also remove the goal from the goals db if we had one.
    });

    	// Click the circular orange button to draft a new goal.
	$("#draftNewGoalBtn").click(function() {
		$("#draftNewGoal").toggleClass("hidden");
	    $("i", this).toggleClass("glyphicon-menu-up glyphicon-asterisk");
	    // Make a clickable icon next to each existing goal
	    // this will let user delete goals.
	    $("#myGoals li span").each(function() {
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