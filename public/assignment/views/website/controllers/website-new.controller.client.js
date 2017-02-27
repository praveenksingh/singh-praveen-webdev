(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesByUser(vm.userId)
                .success(renderWebSites);
        }
        init();

        function renderWebSites(websites) {
            vm.websites = websites;
        }

        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = 'sorry could not create';
                });
        }
    }
})();