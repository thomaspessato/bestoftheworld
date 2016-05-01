(function (){
	const flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	var DOM = {
	    	albumContainer: document.getElementById("album-container"),
	    	countryList: document.getElementById("country-list"),
	    	listCountries: document.getElementsByClassName("navbar__item"),
	    	mainTitle: document.getElementById("main-title")
		};

	window.addEventListener("click",function(evt){
		var target = evt.target;
		if(target.classList.contains("navbar__item")){
			var clickedCountry = target.innerHTML;
			getFlickrImages(clickedCountry);
			DOM.mainTitle.innerHTML = clickedCountry;
		}
		if(target.classList.contains("card")) {
			zoomPhoto(target);
		}
	}, false);

	function getFlickrImages(country){
		var divWrapper = document.createElement("div"),
			counter = 0,
			photoData = {};

		showPhotos(DOM.albumContainer);

		$.getJSON( flickrURL, {
		    tags: "landscape,city,"+country,
		    tagmode: "all",
		    format: "json"
	  	}).done(function( data ) {

	  		$.each( data.items, function( i, item ) {

	  			photoData.url = item.media.m;
	  			photoData.author = item.author;
	  			photoData.description = item.title;

	  			var newPhoto = new Photo(photoData);
	  			newPhoto.renderPhoto(DOM.albumContainer,divWrapper);

	  		});
	  		showPhotos(DOM.albumContainer);
		});
	}
	

	function switchVisibility(element){
		if(element.classList.contains("invisible")){
			element.classList.remove("invisible");
		} else {
			element.classList.add("invisible");
		}	
	}

	function showPhotos(album){
		switchVisibility(album);
	}

})();
