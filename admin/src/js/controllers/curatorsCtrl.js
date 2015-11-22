angular.module('SwipeAdmin').controller('CuratosrCtrl', CuratorsCtrl);

CuratorsCtrl.$inject = ['$scope','CuratorService', '$modal'];

function CuratorsCtrl($scope, CuratorService, $modal){

  $scope.curators = CuratorService.Curators.query();

  $scope.AddCurator = function(){
    var modalInstance = $modal.open({
      templateUrl: 'templates/addcurator.html',
      controller: AddCuratorCtrl
    });
  }

  // $scope.currentCurators = [];
  // $scope.curator = {};
  // $scope.curator.songs = [];
  //
  // $scope.currentCurators = CuratorService.curators.query();
  //
  // $scope.AddCurator = function(){
  //
  //   $scope.curator.songs.push({url:$scope.curator.newSongs});
  //   console.log($scope.curator);
  //   CuratorService.curators.save($scope.curator,
  //                  function(data) {
  //                     alert("Saved!");
  //                     $scope.curator = {};
  //                  }, function(e) {
  //                     // failure
  //                     alert("Error");
  //                  });
  //
  // };
  //
  // $scope.UpdateCurator = function($scope.currentCurator){
  //
  // };

};
