var Connect = Connect || {};

Connect.Phonebook = function() {	


	var phonebookSearchInput = $('#search-input');
	var currentLetter = '';
	var fName = '';
	var namesBox = $("#phonebook-names dl");

	function init() {

		loadStaffFromJSON();
		phonebookSearchInput.keyup(searchFunction)

	}

	function searchFunction() {

     // searchTerm variable is stored as the value of #search
        var searchTerm = $(this).val().toLowerCase();

        // Empty the #result ul as the search elements will differ
        $results = phonebookSearchInput.empty();

        // Log the search term in the console
        console.log("searchterm is " + searchTerm)

        if (searchTerm>'') {

        	namesBox.empty();

        	$.ajax ({

				url:"test.json",
				dataType:"json",

					success:function(data) {

						var i;

						for(i = 0; i < data.length; i++) {

							fName = data[i].name.toLowerCase();
							console.log("fName is " + fName)
							fNameFLetter = fName.charAt(0);

							avatar = data[i].picture;

							if(! avatar){
							   
								avatar = "avatar.jpg";

							};

							if (fName.indexOf(searchTerm) > -1 && fNameFLetter != currentLetter) {

								namesBox.append('<dt>' + fNameFLetter + '</dt><dd><img src="' + avatar + '"/>' + data[i].name + '</dd>');

								currentLetter = fNameFLetter;

							}

							else if (fName.indexOf(searchTerm) > -1) {

								namesBox.append('<dd><img src="' + avatar + '"/>' + data[i].name + '</dd>');

							}

						}
					}

			});

        }

        else {

        	loadStaffFromJSON();

        }

    };

	function loadStaffFromJSON() {

		namesBox.empty();

		$.ajax ({

			url:"test.json",
			dataType:"json",

				success:function(data) {

					var i;

					for(i = 0; i < data.length; i++) {

						//$("#phonebook-names dl").append('<dd><img src="' + data[i].picture + '"/>' + data[i].name + '</dd>');

						fName = data[i].name;
						fNameFLetter = fName.charAt(0);

						avatar = data[i].picture;

						if(! avatar){
						   
							avatar = "avatar.jpg";

						};

						if (fNameFLetter != currentLetter) {

							namesBox.append('<dt>' + fNameFLetter + '</dt><dd><img src="' + avatar + '"/>' + data[i].name + '</dd>');

							currentLetter = fNameFLetter;

						}

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

	new Connect.Phonebook();
	
});