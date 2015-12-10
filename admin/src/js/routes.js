'use strict';

/**
 * Route configuration for the SwipeAdmin module.
 */
angular.module('SwipeAdmin')

.run(['$rootScope', '$state', 'AuthService',
  function ($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !AuthService.isLoggedIn()){
        console.log('logged in: ' + AuthService.isLoggedIn());
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault();
      }
      console.log('logged in: ' + AuthService.isLoggedIn());
    });
  }
])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    // Application routes
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'MasterCtrl',
        authenticate: false
      })
      .state('index', {
        url: '/',
        templateUrl: 'templates/dashboard.html',
        authenticate: true
      })
      .state('genres', {
        url: '/genres',
        templateUrl: 'templates/genres.html',
        controller: 'GenresCtrl',
        authenticate: true
      })
      .state('genre', {
        url: '/genres/:genreId',
        templateUrl: 'templates/genre.html',
        controller: 'GenreCtrl',
        authenticate: true
      })
      .state('blogs', {
        url: '/blogs',
        templateUrl: 'templates/blogs.html',
        controller: 'BlogsCtrl',
        authenticate: true
      })
      .state('blog', {
        url: '/blogs/:blogId',
        templateUrl: 'templates/blog.html',
        controller: 'BlogCtrl',
        authenticate: true
      })
      .state('channels', {
        url: '/channels',
        templateUrl: 'templates/channels.html',
        controller: 'ChannelsCtrl',
        authenticate: true
      })
      .state('channel', {
        url: '/channels/:channelId',
        templateUrl: 'templates/channel.html',
        controller: 'ChannelCtrl',
        authenticate: true
      })
      .state('toptracks', {
        url: '/toptracks',
        templateUrl: 'templates/toptracks.html',
        controller: 'TopTracksCtrl',
        authenticate: true
      });

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode(true).hashPrefix('!')
  }
]);
