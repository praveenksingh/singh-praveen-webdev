(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhotos":searchPhoto
        };
        return api;

        function searchPhoto(searchTerm) {
            var key = "6fa8f654704d60a8a354a2e7fe9aaf21";
            var secret = "c1db5bea1253f74d";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();