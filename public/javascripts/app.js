/**
 * Created by Urvesh on 10/7/15.
 */

angular.module('is421', [
    'ngRoute',
    'ui.bootstrap',
    'controllers',
    'ngMessages'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'partials/index.html',
            controller: 'MainCtrl'
        })
        .when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl'
        })
        .when('/:username/signup/', {
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })
        .when('/forgotusername', {
            templateUrl: 'partials/forgotusername.html',
            controller: 'ForgotUsernameCtrl'
        })
        .when('/forgotpassword', {
            templateUrl: 'partials/forgotpassword.html',
            controller: 'ForgotPasswordCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when('/admin', {
            templateUrl: 'partials/admin.html',
            controller: 'AdminCtrl'
        })
        .when('/profile', {
            templateUrl: 'partials/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/confirmation', {
            templateUrl: 'partials/confirmation.html',
            controller: 'ConfirmationCtrl'
        })
        .when('/project/:projectId', {
            templateUrl: 'partials/project.html',
            controller: 'ProjectCtrl'
        })
        .when('/manageusers', {
            templateUrl: 'partials/manageusers.html',
            controller: 'ManageUsersCtrl'
        })
        .when('/users/:username', {
            templateUrl: 'partials/managetasks.html',
            controller: 'ManageTasksCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);
