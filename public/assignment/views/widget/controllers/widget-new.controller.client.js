(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams,$location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.setWidgetTypeType = setWidgetTypeType;
        vm.addWidget = addWidget;

        function init(){
            vm.showFlag = false;
            vm.addSe = true;
        }
        init();

        function getEditorTemplateUrl(type) {
            if(!vm.showFlag)
                return null;
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function setWidgetTypeType(type) {
            vm.showFlag = true;
            vm.widgetType = type;
        }

        function addWidget(widget) {
            widget.widgetType = vm.widgetType;
            if(vm.widgetType === "YOUTUBE" || vm.widgetType === "IMAGE")
                widget.width = widget.width + "%";
            WidgetService.createWidget(vm.pageId, widget);
            vm.showFlag = false;
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();