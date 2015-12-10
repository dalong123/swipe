angular.module('SwipeAdmin').controller('ChannelCtrl', ChannelCtrl);

ChannelCtrl.$inject = ['$scope', '$state', '$stateParams', 'ChannelService'];

function ChannelCtrl($scope, $state, $stateParams, ChannelService) {

  var channelId = $stateParams.channelId;

  $scope.channel = [];

  $scope.channel = ChannelService.Channel.get({
    channel_id: channelId
  });

  $scope.sortableOptions = {
     containment: '#sortable-container'
   };


  $scope.SaveChannel = function() {
    ChannelService.Channel.update({
        channel_id: $scope.channel._id
      }, $scope.channel,
      function(data) {
        alert("Channel Saved!");
      },
      function(e) {
        // failure
        alert("Error");
      });
  }

  $scope.AddSong = function(song){
    $scope.channel.songs.push(song);
    $scope.newSong = {};
  }

  $scope.RemoveSong = function(songIndex){
        $scope.channel.songs.splice(songIndex, 1);
  }

  $scope.DeleteChannel = function() {
    var confirmDelete = confirm("Are you sure you want to delete this? You won't be able to get it back!");
    if (confirmDelete === true) {
      ChannelService.Channel.delete({
        channel_id: $scope.channel._id
        },null,
        function(data) {
          alert("Channel Deleted!");
          $state.transitionTo("channels");
        },
        function(e) {
          // failure
          alert("Error");
        });
    }
  }

};
