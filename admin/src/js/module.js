angular.module('SwipeAdmin', ['ui.bootstrap', 'ui.router', 'ngResource', 'ngCookies', 'unsavedChanges','as.sortable', 'authService']);

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});
