(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(renderPages);
            PageService
                .findPageById(vm.pageId)
                .success(renderPage);
        }
        init();

        function renderPages(websites) {
            vm.pages = websites;
        }
        function renderPage(website) {
            vm.page = website
        }

        function updatePage(updatedPage) {
            var promise = PageService.updatePage(vm.pageId, updatedPage)
            promise.success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page")
                })
                .error(function () {
                    vm.error = "unable to update page";
                });
        }

        function deletePage () {
            var promise = PageService.deletePage(vm.pageId)
            promise.success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error = "unable to delete page";
                });
        }
    }
})();