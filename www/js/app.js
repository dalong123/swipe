angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])

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
.config(function ($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

/**
 * Setup safe CORS functionality
 */
.config(function($httpProvider){
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

/**
 * Whitelisting all domains to allow iframe to view them. Should we use a safer
 * way?
 */
.config(function($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist(['**', 'self']);
})

/**
 * Configure routing all controllers for all views
 */
.config(function($stateProvider, $urlRouterProvider) {
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
        templateUrl: 'templates/home.html'
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

  .state('app.blogs', {
    url: '/blogs',
    views: {
      'menuContent': {
        templateUrl: 'templates/blogs.html',
        controller: 'BlogsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/blogs/:blogId',
    views: {
      'menuContent': {
        templateUrl: 'templates/blog.html',
        controller:  'BlogCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
