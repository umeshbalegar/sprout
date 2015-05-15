;var sproutConfigFactory = (function(){

	var config_loc_prefixes = {
								"config_suffix" : "-config.json",
								"parent_folder":"/sprout_config/"
							  };
	
	var callbackFun = null;

	function setConfigLocPrefixes(config_loc){
		sprout.extend(config_loc_prefixes , config_loc);
	}

	function loadModules(){
		
		if(arguments && arguments.length > 0){
			if(arguments[arguments.length -1]){
				callbackFun = arguments[arguments.length - 1];
			}			
			for (var j=0; j<arguments.length-1; j++){
				var componentName = (""+arguments[j]).trim();
				componentName = config_loc_prefixes.parent_folder+componentName+config_loc_prefixes.config_suffix;
				try{
					 sprout.getContentForURL(componentName,_handleConfigFile);	
				}catch (err){
					throw "Config file loading error, Reasons could be config file "+componentName+" not present.";
				}
				
			}
		}
	}

	function _handleConfigFile(config_data){
		var config = JSON.parse(config_data);
		
		if (config.callback || (config.callback && config.callback.trim() !== "") ){
			callbackFun = new Function(config.callback);
		}
		
		LoadModuleAndDependency.insertHTML(config.html);
		
		var files_required = [];
		if(config.css.css_source){
			files_required = files_required.concat(config.css.css_source);
		}
		if(config.coreJS.core_source){
			files_required = files_required.concat(config.coreJS.core_source);
		}
		if(config.customJS.custom_source){
			files_required = files_required.concat(config.customJS.custom_source);
		}
		
//		LoadModuleAndDependency.loadRequiredFiles(files_required,callbackFun);
		
		Utilities.requireFiles(files_required,callbackFun);
		

//		LoadModuleAndDependency.loadCSS(config.css);
//		LoadModuleAndDependency.loadJS(config.coreJS, config.customJS, callbackFun);
	}	


	 return {
	 			loadModules : loadModules,
	 			setConfigLocation : setConfigLocPrefixes
	 		};

})();




