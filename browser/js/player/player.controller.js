/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  

  $scope.progress = function () {
    return 100 * PlayerFactory.getProgress()
  }

  // state
  $scope.currentSong = function () {
    if (PlayerFactory.getCurrentSong() === null) return false;
    return true;
  }
  $scope.playing = function () {

    return PlayerFactory.isPlaying();
  }

  // main toggle
  $scope.toggle = function () {
    // if ($scope.playing) $rootScope.$broadcast('pause');
    // else $rootScope.$broadcast('play', song);
    if(PlayerFactory.isPlaying()){
      PlayerFactory.pause();
    }
    else {
      PlayerFactory.resume();
    } 
   
  };


  // outgoing events (to Album… or potentially other characters)
  $scope.next = function(){
    return PlayerFactory.next() 
  };

  $scope.prev = function () {
    return PlayerFactory.previous()
  };



  // function seek (decimal) {
  //   audio.currentTime = audio.duration * decimal;
  // }

  // $scope.handleProgressClick = function (evt) {
  //   seek(evt.offsetX / evt.currentTarget.scrollWidth);
  // };

});


