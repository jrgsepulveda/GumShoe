$(document).ready(function() {
	// Getting references to the name input and contacts container, as well as the table body
	var nameInput = $('#Products-id');
	var nameInput2 = $('#Products-type');
	var nameInput3 = $('#Products-amount');
	var nameInput4 = $('#Products-price');
	
	var ProductsList = $('tbody');
	var ProductsContainer = $('.products-container');
		
	
	$(document).on('submit', '#products-form', handleProductsFormSubmit);

	// Variable to hold our product
	var product;

	// Getting the initial list of products
	getProducts();

	// A function to handle what happens when the form is submitted to create a new contacts
	function handleProductsFormSubmit(event) {
		event.preventDefault();
		// Don't do anything if the name fields hasn't been filled out
		if (!nameInput.val().trim()) {
			return;
		}

		// Calling the upsertcontacts function and passing in the value of the name input
		upsertProducts({
			id:nameInput.val().trim(),
			type:nameInput2.val().trim(),
			amount:parseInt( nameInput3.val().trim() ),
			price:parseInt( nameInput4.val().trim() ),
			UserId: 1

		});
	}

	// A function for creating an contacts. Calls getContacts upon completion
	function upsertProducts(productsData) {
		console.log(productsData);
		$.post('/api/products', productsData).then(getProducts);
    }
    
    function createProductsRow(dbProducts) {
		var newTr = $("<tr>");
		newTr.data("products", dbProducts);
		newTr.append("<td>" + dbProducts.id + "</td>");
		newTr.append("<td>" + dbProducts.type + "</td>");
		newTr.append("<td>" + dbProducts.amount + "</td>");
		newTr.append("<td>" + dbProducts.price + "</td>");
		if (dbProducts.Posts) {
		  newTr.append("<td> " + dbProducts.Posts.length + "</td>");
		} else {
		  newTr.append("<td>0</td>");
		}
		return newTr;
	  }
	

	// Function for retrieving contacts and getting them ready to be rendered to the page
	function getProducts() {
		$.get('/api/products', function(data) {
			var rowsToAdd = [];
			for (var i = 0; i < data.dbProducts.length; i++) {
				rowsToAdd.push(createProductsRow(data.dbProducts[i]));
			}
			renderProductsList(rowsToAdd);
			nameInput.val('');
		});
	}


	// Variable to hold our customers
	var product;

	var url = window.location.search;
	var productsId;
	if (url.indexOf('?products_id=') !== -1) {
		productsId = url.split('=')[1];
		getProduct(productsId);
	}
	// If there's no contactsId we just get all customers as usual
	else {
		getProduct();
	}

	// This function grabs customers from the database and updates the view
	function getProduct(products) {
		productsId = products || '';
		if (productsId) {
			productsId = '/?products_id=' + productsId;
		}
		$.get('/api/products' + productsId, function(data) {
			console.log('product', data);
			product = data;
			if (!product || !product.length) {
				displayEmpty(products);
			} else {
				initializeRows();
			}
		});
	}

});