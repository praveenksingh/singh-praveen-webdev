(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(renderPages);
        }
        init();

        function renderPages(pages) {
            vm.pages = pages;
        }
    }
})();