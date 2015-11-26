angular.module('SwipeAdmin').controller('AddChannelCtrl', AddChannelCtrl);

AddChannelCtrl.$inject = ['$scope', '$modalInstance', 'ChannelService'];

function AddChannelCtrl($scope, $modalInstance, ChannelService) {

  $scope.channel = {};
  $scope.channel.songs = [];

  $scope.AddSong = function(song){
    $scope.channel.songs.push(song);
    $scope.newSong = {};
  }

  $scope.RemoveSong = function(songIndex){
        $scope.channel.songs.splice(songIndex, 1);
  }

  $scope.SaveChannel = function(){
    ChannelService.Channels.save($scope.channel,
      function(data) {
        $scope.channel = {};
        alert("Channel Added!");
      },
      function(e) {
        // failure
        alert("Error");
      });
  }

  $scope.Close = function(){
    $modalInstance.close();
  }

};
