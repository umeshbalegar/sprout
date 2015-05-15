;Utilities = {};
Utilities.require = function (file, callback) {
//	console.log(file + "being loaded");
    callback = callback ||
    function () {};
    var filenode;
    var jsfile_extension = /(.js)$/i;
    var cssfile_extension = /(.css)$/i;

    if (jsfile_extension.test(file)) {
        filenode = document.createElement('script');
        filenode.src = file;
        // IE
        filenode.onreadystatechange = function () {
            if (filenode.readyState === 'loaded' || filenode.readyState === 'complete') {
                filenode.onreadystatechange = null;
                callback();
            }
        };
        // others
        filenode.onload = function () {
            callback();
        };
        document.head.appendChild(filenode);
    } else if (cssfile_extension.test(file)) {
        filenode = document.createElement('link');
        filenode.rel = 'stylesheet';
        filenode.type = 'text/css';
        filenode.href = file;
        document.head.appendChild(filenode);
        callback();
    } else {
        console.log("Unknown file type to load. - "+file);
    }
};

Utilities._isScriptAlreadyIncluded= function(src){
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
};

Utilities.requireFiles = function () {
    var index = 0;
    return function (files, callback) {
        index += 1;
        Utilities.require(files[index - 1], callBackCounter);

        function callBackCounter() {
            if (index === files.length) {
                index = 0;
                callback();
            } else {
                Utilities.requireFiles(files, callback);
            }
        };
    };
}();