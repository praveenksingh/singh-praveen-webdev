(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });

        }

        init();

        function searchPhotos(searchTerm) {
            console.log("search photos client");
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            console.log(url);
            //var widget = WidgetService.findWidgetById(vm.widgetId);
            vm.widget.url =url;
            //console.log(widget);
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }
                );
        }
    }
})();