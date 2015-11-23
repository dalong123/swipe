angular.module('SwipeAdmin').controller('ChannelsCtrl', ChannelsCtrl);

ChannelsCtrl.$inject = ['$scope','ChannelService', '$modal'];

function ChannelsCtrl($scope, ChannelService, $modal){

  $scope.channels = ChannelService.Channels.query();

  $scope.AddChannel = function(){
    var modalInstance = $modal.open({
      templateUrl: 'templates/addchannel.html',
      controller: AddChannelCtrl
    });
  }

  // $scope.currentChannels = [];
  // $scope.channel = {};
  // $scope.channel.songs = [];
  //
  // $scope.currentChannels = ChannelService.channels.query();
  //
  // $scope.AddChannel = function(){
  //
  //   $scope.channel.songs.push({url:$scope.channel.newSongs});
  //   console.log($scope.channel);
  //   ChannelService.channels.save($scope.channel,
  //                  function(data) {
  //                     alert("Saved!");
  //                     $scope.channel = {};
  //                  }, function(e) {
  //                     // failure
  //                     alert("Error");
  //                  });
  //
  // };
  //
  // $scope.UpdateChannel = function($scope.currentChannel){
  //
  // };

};
