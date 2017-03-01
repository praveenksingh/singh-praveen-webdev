(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWi = true;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(renderWidget);
        }
        init();

        function renderWidget(widget) {
            vm.widget = widget;
        }

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(vm.widgetId)
            promise.success(function () {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            })
            .error(function () {
                vm.error = "unable to delete website";
            });
        }

        function updateWidget(widget) {
            var promise = WidgetService.updateWidget(vm.widgetId, widget)
            promise.success(function () {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            })
            .error(function () {
                vm.error = "unable to update widget";
            });
        }

    }
})();