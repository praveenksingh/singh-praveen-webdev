(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            WebsiteService
                .findAllWebsitesByUser(vm.userId)
                .success(renderWebSites);
        }
        init();

        function renderWebSites(websites) {
            vm.websites = websites;
        }
    }
})();