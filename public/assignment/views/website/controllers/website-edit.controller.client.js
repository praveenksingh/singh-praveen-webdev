(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesByUser(vm.userId)
                .success(renderWebSites);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(renderWebSite);
        }
        init();

        function renderWebSites(websites) {
            vm.websites = websites;
        }
        function renderWebSite(website) {
            vm.website = website
        }

        function updateWebsite(updatedWebsite) {
            WebsiteService
                .updateWebsite(vm.websiteId, updatedWebsite)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "unable to delete website";
                });
        }

        function deleteWebsite () {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "unable to delete website";
                });
        }
    }
})();