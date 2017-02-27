(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.userId)
                .success(renderPages);
        }
        init();

        function renderPages(pages) {
            vm.pages = pages;
        }

        function createPage (page) {
            var promise = PageService.createPage(vm.websiteId, page)
            promise.success(function(){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                }).error(function () {
                    vm.error = 'sorry could not create';
                });
        }
    }
})();