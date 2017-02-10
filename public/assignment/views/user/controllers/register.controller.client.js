(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);
    
    function registerController($location, UserService) {
        var vm = this;

        // event handlers
        vm.addUser = addUser;

        function init() {
        }
        init();

        function addUser(user) {
            var userAdded = UserService.addUser(user.username, user.password);
            if(userAdded) {
                $location.url("/user/"+userAdded._id);
            } else {
                vm.error = "Error Creating User";
            }
        }
    }
})();