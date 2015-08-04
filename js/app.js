'use strict';
angular.module('app', ['ngRoute', 'ngAnimate', 'controllers'])
// configure routes
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
	when('/home', {
		templateUrl: 'home-template',
		controller: 'IdentityManagerCtrl',
		controllerAs: 'identityManager'
	}).
	when('/create', {
		templateUrl: 'create-template',
		controller: 'IdentityManagerCtrl',
		controllerAs: 'identityManager'
	}).
	when('/register', {
		templateUrl: 'register-template',
		controller: 'IdentityManagerCtrl',
		controllerAs: 'identityManager'
	}).
	when('/log', {
		templateUrl: 'log-template',
		controller: 'IdentityManagerCtrl',
		controllerAs: 'identityManager'
	}).
	otherwise({
		redirectTo: '/home'
	});
	// $locationProvider.html5Mode({enabled:true, requireBase:true});
}]);