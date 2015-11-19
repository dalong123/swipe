'use strict';

/**
 * Route configuration for the SwipeAdmin module.
 */
angular.module('SwipeAdmin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('genres', {
                url: '/genres',
                templateUrl: 'templates/genres.html',
                controller: 'GenresCtrl'
            })
            .state('blogs', {
                url: '/blogs',
                templateUrl: 'templates/blogs.html',
                controller: 'BlogsCtrl'
            })
            .state('curators', {
                url: '/curators',
                templateUrl: 'templates/curators.html',
                controller: 'CuratorCtrl'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            });
    }
]);
