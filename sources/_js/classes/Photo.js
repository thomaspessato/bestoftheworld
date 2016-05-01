var Photo = function (data){
		
	this.author = data.author;
	this.description = data.description;
	this.url = data.url;

	Photo.prototype.zoomPhoto = function (photoElement){
  		if(photoElement.classList.contains("zoomed")) {
			photoElement.classList.remove("zoomed");
    	}
		else {
	 		photoElement.classList.add("zoomed");
	  	}
	}

	Photo.prototype.renderPhoto = function (albumContainer,divWrapper){
		if(!this.url.match("creative")){
			var photoElement =$( "<div class='card' style='background: url("+this.url+")'><p class='author'>"+this.title+"/ by "+this.author+"</p></div>");
			photoElement.appendTo(divWrapper);
		}
		albumContainer.firstChild.remove();
		albumContainer.appendChild(divWrapper);
	}
};