angular.module('swipe', ['ionic', 'swipe.services', 'swipe.controllers', 'ionic.contrib.ui.cards', 'plangular'])

/**
 * Still not entirely sure what this does, though I haven't looked into it much
 * at all. I know it's not needed now and is obviously part of the build process
 * for transpiling everything to a native-friendly format, so it's probably best
 * to not fuck with it for now.
 */
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar
    // above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/**
 * The next few configs are sort of future-proofing us to render blog posts
 * in-app
 */

/**
 * Needed for routing to work with iFrames
 */
.config(function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

/**
 * Setup safe CORS functionality
 */
.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

/**
 * Whitelisting all domains to allow iframe to view them. Should we use a safer
 * way?
 */
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['**', 'self']);
})

.config(function(plangularConfigProvider) {
  plangularConfigProvider.clientId = '87b01554e0e9467dca5c7646da65965a';
})

/**
 * Configure routing all controllers for all views
 */
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'
      }
    }
  })

  .state('app.sounds', {
    url: '/sounds',
    views: {
      'menuContent': {
        templateUrl: 'templates/sounds.html',
        controller: 'SoundsCtrl'
      }
    }
  })

  .state('app.curators', {
    url: '/curators',
    views: {
      'menuContent': {
        templateUrl: 'templates/curators.html',
        controller: 'CuratorsCtrl'
      }
    }
  })

  .state('app.curator', {
    url: '/curators/:curatorId',
    views: {
      'menuContent': {
        templateUrl: 'templates/curator.html',
        controller: 'CuratorCtrl'
      }
    }
  })

  .state('app.genres', {
    url: '/genres',
    views: {
      'menuContent': {
        templateUrl: 'templates/genres.html',
        controller: 'GenresCtrl'
      }
    }
  })

  .state('app.genre', {
    url: '/genres/:genreId',
    views: {
      'menuContent': {
        templateUrl: 'templates/genre.html',
        controller: 'GenreCtrl'
      }
    }
  })

  .state('app.blogs', {
    url: '/blogs',
    views: {
      'menuContent': {
        templateUrl: 'templates/blogs.html',
        controller: 'BlogsCtrl'
      }
    }
  })

  .state('app.blog', {
    url: '/blogs/:blogId',
    views: {
      'menuContent': {
        templateUrl: 'templates/blog.html',
        controller: 'BlogCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

  $locationProvider.html5Mode(true).hashPrefix('!')
})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});
