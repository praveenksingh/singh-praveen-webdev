(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser (newUser) {
            var userId = newUser._id;
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        }

        function deleteUser() {
            UserService.deleteUser(userId);
            $location.url("/login");
        }

        var user = UserService.findUserById(userId);
        vm.user = user;

        console.log(user);
    }
})();