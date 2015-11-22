angular.module('SwipeAdmin').factory('CuratorService', CuratorService);

CuratorService.$inject = ['$resource'];

function CuratorService($resource){
    return {
        Curators: $resource('http://localhost:8888/api/curators'),
        Curator: $resource('http://localhost:8888/api/curators/:curator_id', null,
        {
            'update': { method:'PUT' }
        })
  }
};
