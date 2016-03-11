(function(window){
    'use strict';

    var library_name = "ImageCache";

    // http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
    function toDataUrl(url, callback){
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function() {
          var reader  = new FileReader();
          reader.onloadend = function () {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
    }

    // define library
    function define_library(){
        var Library = {};
        var cache = {};
        Library.get = function(url){
            if (cache.hasOwnProperty(url)) {
                return cache[url];
            } else {
                toDataUrl(url, function(base64img) {
                    cache[url] = base64img;
                });
                return url;
            }
        }
        return Library;
    }

    //define globally if it doesn't already exist
    if(typeof(Library) === 'undefined'){
        window[library_name] = define_library();
    }
    else{
        console.log("Error: " + library_name + " already defined.");
    }
})(window);
