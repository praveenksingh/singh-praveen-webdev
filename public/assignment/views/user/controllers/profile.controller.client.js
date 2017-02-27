(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user;
            });
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if(user != null) {
                        vm.message = "User Successfully Updated!"
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }

        function deleteUser() {
            var promise = UserService.deleteUser(userId)
            promise.success($location.url("/login"))
        }

        // var user = UserService.findUserById(userId);
        // vm.user = user;
        //
        // console.log(user);
    }
})();