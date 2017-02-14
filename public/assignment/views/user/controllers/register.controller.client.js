(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);
    
    function registerController($location, UserService) {
        var vm = this;

        // event handlers
        vm.createUser = createUser;

        function init() {
        }
        init();

        function createUser(user) {
            var userAdded = UserService.createUser(user);
            if(userAdded) {
                $location.url("/user/"+userAdded._id);
            } else {
                vm.error = "Error Creating User";
            }
        }
    }
})();