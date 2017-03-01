(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);
    
    function WidgetService($http) {

        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget" : deleteWidget,
            "updatesWidgetPosByPageId" : updatesWidgetPosByPageId,
            "uploadImage" : uploadImage
        };
        return api;

        function uploadImage(data) {
            var fd = new FormData();
            for(var key in data)
                fd.append(key, data[key]);
            return $http.post("/api/upload", fd,{
                transformRequest: angular.indentity,
                headers: {
                    'Content-Type': undefined
                }
            });
        }

        function updateWidget(widgetId, newWidget) {
            return $http.put("/api/widget/"+widgetId, newWidget);
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }
        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

        function createWidget(pageId, widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function updatesWidgetPosByPageId(pageId, initial, final) {
            return $http.put("/api/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }
    }
})();