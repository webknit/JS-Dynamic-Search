var Webknit = Webknit || {};

Webknit.NamesList = function() {	

	// Variables
	var phonebookSearchInput = $('#search-input');
	var currentLetter = '';
	var fName = '';
	var namesBox = $("#phonebook-names dl");

	// Call initial fuunctions
	function init() {

		loadStaffFromJSON();
		phonebookSearchInput.keyup(searchFunction)

	}

	// Search function
	function searchFunction() {

     	// searchTerm variable is stored as the value of #search
        var searchTerm = $(this).val().toLowerCase();

        // Log the search term in the console
        console.log("searchterm is " + searchTerm)

        // If Search term exists
        if (searchTerm>'') {

        	// Empty name box
        	namesBox.empty();

        	// AJAX call
        	$.ajax ({

				url:"test.json",
				dataType:"json",

					success:function(data) {

						// For loop to run through the JSON
						for(i = 0; i < data.length; i++) {

							// Change the name to lowercase
							fName = data[i].name.toLowerCase();

							// Get the first letter of the name
							fNameFLetter = fName.charAt(0);

							// Get picture from json
							avatar = data[i].picture;

							// If it doesn't exist then use a default one
							if(! avatar){
							   
								avatar = "avatar.jpg";

							};

							// If the first letter of the name doesn't equal the current letter then output the letter and change it
							if (fName.indexOf(searchTerm) > -1 && fNameFLetter != currentLetter) {

								namesBox.append('<dt>' + fNameFLetter + '</dt><dd><img src="' + avatar + '"/>' + data[i].name + '</dd>');

								currentLetter = fNameFLetter;

							}

							// Else output the name only
							else if (fName.indexOf(searchTerm) > -1) {

								namesBox.append('<dd><img src="' + avatar + '"/>' + data[i].name + '</dd>');

							}

						}
					}

			});

        }

        else {

        	// If search result == nothing then reload the names
        	loadStaffFromJSON();

        }

    };

	function loadStaffFromJSON() {

		// Empty the box
		namesBox.empty();

		// AJAX call
		$.ajax ({

			url:"test.json",
			dataType:"json",

				success:function(data) {

					for(i = 0; i < data.length; i++) {

						// Check the name and its first character
						fName = data[i].name;
						fNameFLetter = fName.charAt(0);

						// Get picture from json
							avatar = data[i].picture;

						// If it doesn't exist then use a default one
						if(! avatar){
						   
							avatar = "avatar.jpg";

						};

						// If the first letter of the name doesn't equal the current letter then output the letter and change it
						if (fNameFLetter != currentLetter) {

							namesBox.append('<dt>' + fNameFLetter + '</dt><dd><img src="' + avatar + '"/>' + data[i].name + '</dd>');

							currentLetter = fNameFLetter;

						}

						// Else output the name only
						else {

							namesBox.append('<dd><img src="' + avatar + '"/>' + data[i].name + '</dd>');

						}

					}
				}

		});

	}

	init();

};

// ON DOC READY
$(function() {	

	new Webknit.NamesList();
	
});