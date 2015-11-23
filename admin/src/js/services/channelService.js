angular.module('SwipeAdmin').factory('ChannelService', ChannelService);

ChannelService.$inject = ['$resource'];

function ChannelService($resource){
    return {
        Channels: $resource('http://localhost:8888/api/channels'),
        Channel: $resource('http://localhost:8888/api/channels/:channel_id', null,
        {
            'update': { method:'PUT' }
        })
  }
};
