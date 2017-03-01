(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams,$location, WidgetService,$scope) {
        // $scope.widget = {};
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.setWidgetTypeType = setWidgetTypeType;
        vm.addWidget = addWidget;
        vm.uploadImg = uploadImg;

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

            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise.success(function(){
                vm.showFlag = false;
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            })
            .error(function () {
                vm.error = 'sorry could not create';
            });
        }

        function uploadImg(widget) {
            var promise = WidgetService.uploadImage(widget);
            promise.success(function (url) {
               vm.url = url;
            });
            console.log(vm.url);
        }
    }
})();