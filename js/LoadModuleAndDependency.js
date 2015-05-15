;var LoadModuleAndDependency = (function(){
	
		function _insertHTML(htmlObj){
			if(htmlObj && htmlObj.innerHTML){
				var insertLocation = document.getElementsByTagName("body");
				if(htmlObj.positionId){
					insertLocation = document.getElementById(htmlObj.positionId);
				}				
				insertLocation.innerHTML += htmlObj.innerHTML;
			}
		}
	
		function _loadAllCSS(css_files){
			var css_src = css_files.css_source;
			var css_inline = css_files.css_inline;
			if (css_src && css_src.length>0){
			    var ss = document.styleSheets;
			    for (var j=0; j< css_src.length; j++){
				    for (var i = 0, max = ss.length; i < max; i++) {
				        if (ss[i].href == (css_src[j]+"").trim())
				            continue;
				    }
				    var link = document.createElement("link");
				    link.rel = "stylesheet";
				    link.href = css_src[j];

				    document.getElementsByTagName("head")[0].appendChild(link);				    	
			    }
			}else if(css_inline && css_inline+"".trim() != ""){
				// Add code to embedd the inline css. 
			}
		}
		

	
		function _loadAllJS(core_lib, customScriptFile , callback) {

			var core_lib_url = core_lib.core_source;
			if (core_lib_url && core_lib_url.length > 0){				
				for (var i=0; i<core_lib_url.length ; i++){
					if (_isScriptAlreadyIncluded(core_lib_url[i])){
						console.log("Sorce Script already included. Calling custom Script include");
						if(i==core_lib_url.length - 1){
							_loadCustomScript(customScriptFile,callback);
						}						
					
					}else{
						var url = core_lib_url[i];
						 
						var script = document.createElement("script");
						script.type = "text/javascript";
							 
						if (script.readyState) { //IE
						    script.onreadystatechange = function () {
						    	if(i==(core_lib_url.length)){
						    		_callNext(script,_loadCustomScript,customScriptFile,callback);
						    	}
						    		
							};
						} else { //Others
						    script.onload = function () {
						    	if(i==(core_lib_url.length)){
						    		_callNext(script,_loadCustomScript,customScriptFile,callback);
						    	}						    		
							};
						}
							 
						script.src = url;
						document.getElementsByTagName("head")[0].appendChild(script);
					}				
				}				
			}

			var core_lib_inline = core_lib.core_inline;
			if (core_lib_inline && core_lib_inline != ""){
				
			}
		}


		function _callNext(){
			if(arguments && arguments[0]){
				if (arguments[0].readyState && arguments[0].readyState == "loaded" || arguments[0].readyState == "complete") {
					
					arguments[0].onreadystatechange = null;
				}
				
				if(arguments && arguments[1] && arguments[2] && arguments[3]){
					arguments[1].call(this,arguments[2],arguments[3]);
				}else if(arguments && arguments[1]){
					arguments[1].call(this);
				}
							
			}
		}


		function _isScriptAlreadyIncluded(src){
			var flag = false;
		    var scripts = document.getElementsByTagName("script");
		    for(var i = 0; i < scripts.length; i++) {
		    	var includedSrc = scripts[i].getAttribute('src');
		       if(includedSrc && includedSrc == src) {
		       		flag = true;
		       }

		       if(includedSrc && includedSrc.substring(includedSrc.lastIndexOf('/')) === src.substring(src.lastIndexOf('/'))){
		       		flag = true;
		       }
		    }

		    return flag;
		}



		function _loadCustomScript (customScript, callback) {
			var customScriptFile = customScript.custom_sorce;
			var loaded_files_count = 0;
			if (customScriptFile && customScriptFile.length > 0){
				for (var i=0; i<customScriptFile.length ; i++){				
					if(_isScriptAlreadyIncluded(customScriptFile[i])){
						console.log("Custom Script already included. Calling callback");
						loaded_files_count++;
						if(loaded_files_count == customScriptFile.length){
							_callNext(scriptElt,callback);
						}
					}else{						
//						_addCustomScriptTag(customScriptFile[i], loaded_files_count, callback);
						var scriptElt = document.createElement('script');
					    scriptElt.type = 'text/javascript';
					    scriptElt.async = true;

					    if(callback ){
							if (scriptElt.readyState) { //IE
							    scriptElt.onreadystatechange = function () {
							    	if (scriptElt.readyState == "loaded" || scriptElt.readyState == "complete") {
							        	 scriptElt.onreadystatechange = null;
							        	 loaded_files_count++;
										 if(loaded_files_count == customScriptFile.length){
											_callNext(scriptElt,callback);
										 }
							    	}
								};
							} else { //Others
							    scriptElt.onload = function () {
							    	loaded_files_count++;
									if(loaded_files_count == customScriptFile.length){
										_callNext(scriptElt,callback);
									}							    	
								};
							}					    	
					    }

					    scriptElt.src = customScriptFile[i];
					    document.getElementsByTagName('head')[0].appendChild(scriptElt);						
					}				
				}	
			}
		}
		
//		function _addCustomScriptTag(customScript, loaded_files_count, callback){
//			var scriptElt = document.createElement('script');
//		    scriptElt.type = 'text/javascript';
//
//		    if(callback ){
//				if (scriptElt.readyState) { //IE
//				    scriptElt.onreadystatechange = function () {
//				    	if (scriptElt.readyState == "loaded" || scriptElt.readyState == "complete") {
//				        	 scriptElt.onreadystatechange = null;
//				        	 loaded_files_count++;
//				    	}
//					};
//				} else { //Others
//				    scriptElt.onload = function () {
//				    	loaded_files_count++;
//					};
//				}					    	
//		    }
//
//
//		    scriptElt.src = customScript;
//		    document.getElementsByTagName('head')[0].appendChild(scriptElt);
//		}


	     return {
	     			loadJS : _loadAllJS,
	     			loadCSS : _loadAllCSS,
	     			insertHTML : _insertHTML
	     		};
})();