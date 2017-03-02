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
                if(widget.width === undefined)
                    widget.width = "100%";
                else
                    widget.width = widget.width + "%";

                if(vm.widgetType === "IMAGE" && vm.imageUrl === undefined){
                    vm.error = 'Upload Image First';
                    return;
                }else{
                    widget.url = vm.imageUrl;
                }
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
            promise.success(function(res) {
                console.log(res);
                vm.imageUrl = res.url;
                vm.message = "image successfully uploaded"
            }).error(function () {
                vm.error("could not upload image");
            });
        }
    }
})();