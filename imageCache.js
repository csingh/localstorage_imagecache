(function(window){
    'use strict';

    var libraryName = "ImageCache";
    var localStorageKey = "ImageCache";

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
    function defineLibrary(){
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
        Library.dump = function() {
            return cache;
        }
        Library.save = function() {
            try {
                localStorage.setItem(localStorageKey, JSON.stringify(cache));
                console.log(localStorageKey + " saved to localStorage.");
            } catch(e) {
                console.log("Could not save " + localStorageKey + " to localStorage: " + e);
            }
        }
        Library.load = function() {
            try {
                var item = localStorage.getItem(localStorageKey);
                var item_to_obj = JSON.parse(item);
                cache = item_to_obj;
                console.log(localStorageKey + " loaded from localStorage.");
            } catch(e) {
                console.log("Could not load " + localStorageKey + " from localStorage: " + e);
            }

        }
        return Library;
    }

    //define globally if it doesn't already exist
    if(typeof(Library) === 'undefined'){
        window[libraryName] = defineLibrary();
    }
    else{
        console.log("Error: " + libraryName + " already defined.");
    }
})(window);
