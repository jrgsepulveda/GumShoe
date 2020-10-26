

$(document).ready(function() {
	// Getting references to the name input and contacts container, as well as the table body
	var nameInput = $('#contacts-firstName');
	var nameInput2 = $('#contacts-lastName');
	var nameInput3 = $('#contacts-phoneNumber');
	var nameInput4 = $('#contacts-email');
	var nameInput5 = $('#contacts-notes');
	var ContactsList = $('tbody');
	var ContactsContainer = $('.contacts-container');
	var blogContainer = $('.blog-container');
	
	
	$(document).on('submit', '#contacts-form', handleContactsFormSubmit);

	// Variable to hold our customers
	var customers;

	// Getting the initial list of contacts
	getContacts();

	// A function to handle what happens when the form is submitted to create a new contacts
	function handleContactsFormSubmit(event) {
		event.preventDefault();
		// Don't do anything if the name fields hasn't been filled out
		if (!nameInput.val().trim()) {
			return;
		}

		// Calling the upsertcontacts function and passing in the value of the name input
		upsertContacts({
			firstName: nameInput.val().trim(),
			lastName: nameInput2.val().trim(),
			phoneNumber: nameInput3.val().trim(),
			email: nameInput4.val().trim(),
			date: moment().format(),
			notes: nameInput5.val().trim(),
			UserId: 1

		});
	}

	// A function for creating an contacts. Calls getContacts upon completion
	function upsertContacts(contactsData) {
		console.log(contactsData);
		$.post('/api/contacts', contactsData).then(getContacts);
	}

	/* Function for creating a new list row for contacts
	function createfirstNameRow(firstNameData) {
		console.log.firstNameData
		var newTr = $('<tr>');
		newTr.data('firstName', firstNameData);
		newTr.append('<td>' + firstNameData.firstName + '</td>');
		if (ContactsData.Users) {
			newTr.append('<td> ' + firstNameData.Users.length + '</td>');
		} else {
			newTr.data('lastName', lastNameData);
			newTr.append('<td>' + lastNameData.lastName + '</td>');
		}
		if (ContactsData.Users) {
				newTr.append('<td> ' + lastNameData.Users.length + '</td>');
		} else {
			newTr.data('phoneNumber', phoneNumberData);
			newTr.append('<td>' + phoneNumberData.phoneNumber + '</td>');
		}
		if (ContactsData.Users) {
				newTr.append('<td> ' + phoneNumberData.Users.length + '</td>');
		} else {
			newTr.data('email', emailData);
			newTr.append('<td>' + emailData.email + '</td>');
		}
		if (ContactsData.Users) {
			newTr.append('<td> ' + emailData.Users.length + '</td>');
		} else {
			newTr.data('date', dateData);
			newTr.append('<td>' + dateData.date + '</td>');
		}
		if (ContactsData.Users) {
				newTr.append('<td> ' + dateData.Users.length + '</td>');
			} else {
				newTr.data('notes', notesData);
				newTr.append('<td>' + notesData.notes + '</td>');
			}
    return newTr;
	}*/

	function createContactsRow(dbContacts) {
		var newTr = $("<tr>");
		newTr.data("contacts", dbContacts);
		newTr.append("<td>" + dbContacts.firstName + "</td>");
		newTr.append("<td>" + dbContacts.lastName + "</td>");
		newTr.append("<td>" + dbContacts.phoneNumber + "</td>");
		newTr.append("<td>" + dbContacts.email + "</td>");
		newTr.append("<td>" + dbContacts.notes + "</td>");
		if (dbContacts.Posts) {
		  newTr.append("<td> " + dbContacts.Posts.length + "</td>");
		} else {
		  newTr.append("<td>0</td>");
		}
		return newTr;
	  }
	

	// Function for retrieving contacts and getting them ready to be rendered to the page
	function getContacts() {
		$.get('/api/contacts', function(data) {
			var rowsToAdd = [];
			for (var i = 0; i < data.dbContacts.length; i++) {
				rowsToAdd.push(createContactsRow(data.dbContacts[i]));
			}
			renderContactsList(rowsToAdd);
			nameInput.val('');
		});
	}

	// A function for rendering the list of contacts to the page
	function renderContactsList(rows) {
		ContactsList.children()
			.not(':last')
			.remove();
		ContactsContainer.children('.alert').remove();
		if (rows.length) {
			console.log(rows);
			ContactsList.prepend(rows);
		} else {
			renderEmpty();
		}
	}

	// Function for handling what to render when there are no contacts
	function renderEmpty() {
		var alertDiv = $('<div>');
		alertDiv.addClass('alert alert-danger');
		alertDiv.text('You must create a customer.');
		ContactsContainer.append(alertDiv);
	}
	// Variable to hold our customers
	var customers;

	var url = window.location.search;
	var contactsId;
	if (url.indexOf('?contacts_id=') !== -1) {
		contactsId = url.split('=')[1];
		getCustomers(contactsId);
	}
	// If there's no contactsId we just get all customers as usual
	else {
		getCustomers();
	}

	// This function grabs customers from the database and updates the view
	function getCustomers(contacts) {
		contactsId = contacts || '';
		if (contactsId) {
			contactsId = '/?contacts_id=' + contactsId;
		}
		$.get('/api/contacts' + contactsId, function(data) {
			console.log('customers', data);
			customers = data;
			if (!customers || !customers.length) {
				displayEmpty(contacts);
			} else {
				initializeRows();
			}
		});
	}

	// InitializeRows handles appending all of our constructed post HTML inside blogContainer
	/*function initializeRows() {
		blogContainer.empty();
		var customersToAdd = [];
		for (var i = 0; i < customers.length; i++) {
			customersToAdd.push(createNewRow(customers[i]));
		}
		blogContainer.append(customersToAdd);
	}

	/* This function constructs a post's HTML
	function createNewRow(post) {
		var formattedDate = new Date(post.createdAt);
		formattedDate = moment(formattedDate).format('MMMM Do YYYY, h:mm:ss a');
		var newPostCard = $('<div>');
		newPostCard.addClass('card');
		var newPostCardHeading = $('<div>');
		newPostCardHeading.addClass('card-header');
		var editBtn = $('<button>');
		editBtn.text('EDIT');
		editBtn.addClass('edit btn btn-info');
		var newPostTitle = $('<h2>');
		var newPostDate = $('<small>');
		var newPostcontacts = $('<h5>');
		newPostcontacts.text('Written by: ' + post.contacts.name);
		newPostcontacts.css({
			float: 'right',
			color: 'blue',
			'margin-top': '-10px',
		});
		var newPostCardBody = $('<div>');
		newPostCardBody.addClass('card-body');
		var newPostBody = $('<p>');
		newPostTitle.text(post.title + ' ');
		newPostBody.text(post.body);
		newPostDate.text(formattedDate);
		newPostTitle.append(newPostDate);
		newPostCardHeading.append(deleteBtn);
		newPostCardHeading.append(editBtn);
		newPostCardHeading.append(newPostTitle);
		newPostCardHeading.append(newPostAuthor);
		newPostCardBody.append(newPostBody);
		newPostCard.append(newPostCardHeading);
		newPostCard.append(newPostCardBody);
		newPostCard.data('post', post);
		return newPostCard;
	}

	 /*This function figures out which post we want to edit and takes it to the appropriate url
	function handlePostEdit() {
		var currentPost = $(this)
			.parent()
			.parent()
			.data('post');
		window.location.href = '/cms?post_id=' + currentPost.id;
	}*/

	/*This function displays a message when there are no posts
	function displayEmpty(id) {
		var query = window.location.search;
		var partial = '';
		if (id) {
			partial = ' for Customer #' + id;
		}
		blogContainer.empty();
		var messageH2 = $('<h4>');
		messageH2.css({ 'text-align': 'center', 'margin-top': '50px' });
		messageH2.html(
			'No contacts yet' +
				partial +
				", click <a href='/contacts.html" +
				query +
				"'>here</a> in order to add a new contact."
		);
		blogContainer.append(messageH2);
	}*/
});
