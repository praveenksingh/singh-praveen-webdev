(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.setWidgetTypeType = setWidgetTypeType;

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function setWidgetTypeType(type) {
            vm.widgetType = type;
        }


    }
})();