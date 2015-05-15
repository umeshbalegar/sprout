;var sprout = {
	/*
		Method equivalent to JQuery extend() function. 
		i.e copying of objects. 

	*/
	extend : function() {
		for (var i=1; i<arguments.length; i++)
			for (var key in arguments[i])
				if(arguments[i].hasOwnProperty(key))
					arguments[0][key] = arguments[i][key];
		return arguments[0];
	},

	getContentForURL: function(url, callback) {   

	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
	    xobj.onreadystatechange = function () {
	          if (xobj.readyState == 4 && xobj.status == "200") {
	            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
	            callback(xobj.responseText);
	          }
	    };
	    xobj.send(null);  
	 }	
};
