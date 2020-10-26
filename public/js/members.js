$(document).ready(() => {
	// This file just does a GET request to figure out which user is logged in
	// and updates the HTML on the page
	$.get('/api/user_data').then((data) => {
		$('.member-name').text(data.email);
	});
});

// Hide all elements with class="containerTab", except for the one that matches the clickable grid column
function openTab(tabName) {
	var i, x;
	x = document.getElementsByClassName('containerTab');
	for (i = 0; i < x.length; i++) {
		x[i].style.display = 'none';
	}
	document.getElementById(tabName).style.display = 'block';
}

var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleString();