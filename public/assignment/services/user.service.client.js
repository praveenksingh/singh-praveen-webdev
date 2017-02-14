(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "updateUser": updateUser,
            "findUserByUserName": findUserByUserName,
            "deleteUser" : deleteUser
        };
        return api;

        function findUserByUserName(userName) {
            for(var u in users) {
                var user = users[u];
                if( user.username === userName ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    return true;
                }
            }
            return null;
        }

        function updateUser(uid, newUser) {
            for(var u in users) {
                if( users[u]._id === uid ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function createUser(userNew) {
            var id = (Math.random()*1000 | 0).toString();
            var use = {"_id": id, "username": userNew.username, "password": userNew.password, "firstName" : "", "lastName":""};
            users.push(use);
            return use;
        }

        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
    }
})();