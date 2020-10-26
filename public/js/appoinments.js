$(document).ready(function() {
	// Getting references to the name input and contacts container, as well as the table body
    var appoinmentsInput = $('#Appointments-date');
    var appoinmentsInput2 = $('#Appointments-typeOfAppointment');
	var AppoinmentsList = $('tbody');
    
    
    $(document).on('submit', '#appoinments-form', handleAppoinmentsFormSubmit);

	// Variable to hold our customers
	var customers;

	// Getting the initial list of contacts
	getContacts();

// A function to handle what happens when the form is submitted to create a new appoinment
function handleAppoinmentsFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!appoinmentsInput.val().trim()) {
      return;
    }
    // Calling the upsertAppoinment function and passing in the value of the name input
    upsertAppoinments({
      date: appoinmentsInput.val().trim()
      typeOfAppointment: appoinmentsInput2.val().trim()

    });
  }

  // A function for creating an appoinment. Calls getAppoinments upon completion
  function upsertAppoinments(appoinmentsData) {
    $.post("/api/appoinments", appoinmentsData)
      .then(getAppoinments);
  }

// Function for creating a new list row for appoinments
function createAppoinmentsRow(appoinmentsData) {
    var newTr = $("<tr>");
    newTr.data("appoinments", appoinmentsData);
    newTr.append("<td>" + appoinmentsData.date + "</td>");
    if (appoinmentsData.Posts) {
      newTr.append("<td> " + appoinmentsData.Posts.length + "</td>");
    } else {
      newTr.append("<td>Type Of Appoinment</td>");
    }
    
    return newTr;
  }

// Function for retrieving appoinments and getting them ready to be rendered to the page
function getAppoinments() {
    $.get("/api/appoinments", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAppoinmentsRow(data[i]));
      }
      renderAppoinmentsList(rowsToAdd);
      appoinmentsInput .val("");
    });
  }

  // A function for rendering the list of appoinments to the page
  function renderAppoinmentsList(rows) {
    appoinmentsList.children().not(":date").remove();
   appoinmentsContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      appoinmentsList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

    // This function displays a message when there are no appoinments
	function displayEmpty(id) {
		var query = window.location.search;
		var partial = '';
		if (id) {
			partial = ' a new appoinment' + id;
		}
		blogContainer.empty();
		var messageH2 = $('<h4>');
		messageH2.css({ 'text-align': 'center', 'margin-top': '50px' });
		messageH2.html(
			'Need to schedule' +
				partial +
				", click <a href='/calendar.html" +
				query +
				"'>here</a> so you can see the calendar."
		);
		blogContainer.append(messageH2);
	}
});
