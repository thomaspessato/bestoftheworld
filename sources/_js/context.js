(function (){
	var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
		arrayCountries = [],
		DOM = {
	    	albumContainer: document.getElementById("album-container"),
	    	countryList: document.getElementById("country-list"),
	    	listCountries: document.getElementsByClassName("navbar__item"),
	    	mainTitle: document.getElementById("main-title")
		};

	window.addEventListener("click",function(evt){
		var target = evt.target;
		if(target.classList.contains("navbar__item")){
			getFlickrImages(target.innerHTML);
			DOM.mainTitle.innerHTML = target.innerHTML;
		}
		if(target.classList.contains("card")) {
			zoomPhoto(target);
		}
	}, false);

	function zoomPhoto(photoElement){
  		if(photoElement.classList.contains("zoomed")) {
			photoElement.classList.remove("zoomed");
    	}
		else {
	 		photoElement.classList.add("zoomed");
	  	}
	}

	function getFlickrImages(country){

		var divWrapper = document.createElement("div"),
			counter = 0;
		
		switchVisibility(DOM.albumContainer);

		$.getJSON( flickrURL, {
		    tags: "landscape,city,"+country,
		    tagmode: "all",
		    format: "json"
	  	}).done(function( data ) {

	      $.each( data.items, function( i, item ) {
	      	if(!item.media.m.match("creative")){
	      		console.log(i);
	      		$( "<div class='card' style='background: url("+item.media.m+")'><p class='author'>"+item.title+"/ by "+item.author+"</p></div>" ).appendTo(divWrapper);
	      	}
	      });
	      DOM.albumContainer.firstChild.remove();
	      DOM.albumContainer.appendChild(divWrapper);
	      switchVisibility(DOM.albumContainer);
	      
		});
	}

	function switchVisibility(element){
		if(element.classList.contains("invisible")){
			element.classList.remove("invisible");
		} else {
			element.classList.add("invisible");
		}	
	}



})();
