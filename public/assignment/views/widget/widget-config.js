(function(){
    angular
        .module("WebAppMaker")
        .config(widgetConfiguration);

    function widgetConfiguration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: "WidgetNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'views/widget/templates/widget-edit.view.client.html'
                ,controller: "WidgetEditController",
                controllerAs: "model"
            });
    }
})();