angular.module('SwipeAdmin').factory('CuratorService', CuratorService);

CuratorService.$inject = ['$resource'];

function CuratorService($resource){
    return {
        curators:  $resource('http://localhost:8888/api/curators'),
        curator: $resource('/curators/:curator_id')
  }
};
