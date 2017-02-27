(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .success(function (user) {
                    var loginUser = user;
                    if(loginUser != null) {
                        $location.url('/profile/' + loginUser._id);
                    } else {
                        vm.error = 'user not found';
                    }
                })
                .error(function(err) {
                    vm.error = 'user not found';
                });
        }
    }
})();