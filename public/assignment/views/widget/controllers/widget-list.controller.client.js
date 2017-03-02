(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.updateWidgetsPos = updateWidgetsPos;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            vm.widgets = widgets;
        }

        function updateWidgetsPos(initial, final) {
            WidgetService
                .updatesWidgetPosByPageId(vm.pageId, initial, final)
                .error(function () {
                    vm.error("could not update positions")
                })
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
        
        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();