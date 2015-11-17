/**
 * Created by Urvesh on 10/7/15.
 */

var app = angular.module('controllers', []);

app.controller('NavCtrl', function($scope, $modal, $location, $http) {

    $scope.logout = function() {
        $http({
            method: 'POST',
            url: '/api/logout'
        }).then(function(response) {
            console.log(response);
            window.location.href = '/login';
        }, function(err) {
            console.log(err);
        })
    }
});

app.controller('MainCtrl', function($scope) {

});

app.controller('LoginCtrl', function($scope, $location, $http) {
    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $scope.username,
                password: $scope.password
            }
        }).then(function(response) {
            console.log(response);
            window.location.href = '/dashboard';
        }, function(err) {
            console.log(err);
        });
    }
});

app.controller('ForgotUsernameCtrl', function($scope, $http, $location) {

    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/api/forgotUsername',
            data: {
                email: $scope.email
            }
        }).then(function (response) {
            console.log(response);
            $location.path('/login');
        }, function (err) {
            console.log(err);
        })
    }
});

app.controller('ForgotPasswordCtrl', function($scope, $http, $location) {
    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/api/forgotPassword',
            data: {
                username: $scope.username
            }
        }).then(function(response) {
            console.log(response);
            $location.path('/login');
        }, function(err) {
            console.log(err);
        })
    }
});

app.controller('SignupCtrl', function($scope, $location, $http, $routeParams) {
    var host = $routeParams.username;
    if (host) {
        $http({
            method: 'GET',
            url: '/api/host',
            params: {
                username: host
            }
        }).then(function(response) {
            console.log(response);
        }, function(err) {
            $location.path('/signup');
            console.log(err);
        })
    }

    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/api/signup',
            data: {
                host: host,
                username: $scope.username,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                password: $scope.password,
                password2: $scope.password2
            }
        }).then(function(response) {
            console.log(response);
            window.location.href = '/confirmation';
        }, function(err) {
            console.log(err);
        })
    };
});

app.controller('ConfirmationCtrl', function($scope, $http, $location) {
    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/api/confirmation',
            data: {
                confirmation: $scope.confirmation
            }
        }).then(function(response) {
            console.log(response);
            $location.path('/login');
        }, function(err) {
            console.log(err);
        })
    }
});

app.controller('DashboardCtrl', function($scope, $http, $location) {
    $http({
        method: 'GET',
        url: '/auth/dashboard'
    }).then(function(response) {
        console.log(response);
        $scope.message = response.data.message;
        $scope.username = response.data.user.username;
    }, function(err) {
        console.log(err);
        $location.path('/login');
    })
});

app.controller('ProfileCtrl', function($scope, $http, $location) {
    $http({
        method: 'GET',
        url: '/auth/user'
    }).then(function(response) {
        $scope.user = response.data.user;
    }, function(err) {
        $location.path('/login');
        console.log(err);
    })
    
});

app.controller('AdminCtrl', function($scope, $http, $location) {

    onLoad();

    function onLoad() {
        $http({
            method: 'GET',
            url: '/auth/admin'
        }).then(function(response) {
            console.log(response);
            var userList = response.data.data;
            $scope.currentUser = response.data.user;
            $scope.userList = userList;
        }, function(err) {
            console.log(err);
            window.location.href = '/login';
        });
    }

    $scope.selectedAll = false;

    $scope.all = function() {
        $scope.selectedAll = !$scope.selectedAll;
        for (var i = 0; i < $scope.userList.length; i++) {
            var user = $scope.userList[i];

            user.isSelected = $scope.selectedAll;
        }
    };

    $scope.selectUser = function() {
        var selectedCount = 0;
        for (var i = 0; i < $scope.userList.length; i++) {
            var user = $scope.userList[i];
            if (user.isSelected) {
                selectedCount++;
            } else {
                selectedCount--;
            }
        }
        if (selectedCount != $scope.userList.length) {
            $scope.selectedAll = false;
        } else if (selectedCount === $scope.userList.length) {
            $scope.selectedAll = true;
        }
    };



    $scope.deleteUsers = function() {
        var selected = [];
        var users = $scope.userList;

        for (var i = 0; i < users.length; i++) {
            if (users[i].isSelected) {
                if (users[i].username === 'urvesh') {
                    continue;
                }
                selected.push(users[i].username);
            }
        }

        if (selected.length > 0 ) {
            $http({
                method: 'POST',
                url: '/auth/admin/delete',
                data: selected
            }).then(function(response) {
                console.log(response);
                onLoad();
            }, function(err) {
                console.log(err);
            })
        }
    };

    $scope.save = function() {
        var selected = [];
        var users = $scope.userList;

        for (var i = 0; i < users.length; i++) {
            if (users[i].isSelected) {
                if (users[i].username === 'urvesh') {
                    continue;
                }
                selected.push({
                    username: users[i].username,
                    isAdmin: users[i].isAdmin == 1 //boolean true otherwise false
                });
            }
        }

        if (selected.length > 0) {
            $http({
                method: 'POST',
                url: '/auth/admin/save',
                data: selected
            }).then(function(response) {
                console.log(response);
            }, function(err) {
                console.log(err);
            })
        }
    };

    $scope.loginAs = function(username) {
        $http({
            method: 'POST',
            url: '/auth/loginas',
            data: {
                username: username,
                password: 'test'
            }
        }).then(function (response) {
            console.log(response);
            $scope.username = response.data.user.username;
            $location.path('/dashboard');
        }, function (err) {
            console.log(err);
        })
    }
});