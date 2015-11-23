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
            .state('genre', {
                url: '/genres/:genreId',
                templateUrl: 'templates/genre.html',
                controller: 'GenreCtrl'
            })
            .state('blogs', {
                url: '/blogs',
                templateUrl: 'templates/blogs.html',
                controller: 'BlogsCtrl'
            })
            .state('blog', {
                url: '/blogs/:blogId',
                templateUrl: 'templates/blog.html',
                controller: 'BlogCtrl'
            })
            .state('channels', {
                url: '/channels',
                templateUrl: 'templates/channels.html',
                controller: 'ChannelsCtrl'
            })
            .state('channel', {
                url: '/channels/:channelId',
                templateUrl: 'templates/channel.html',
                controller: 'ChannelCtrl'
            })
            .state('toptracks', {
                url: '/toptracks',
                templateUrl: 'templates/toptracks.html',
                controller: 'TopTracksCtrl'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            });
    }
]);
