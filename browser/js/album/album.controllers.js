/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  // load our initial data

  AlbumFactory.fetchAll()
    .then(function (albums) {
      $scope.albums = albums;

    AlbumFactory.fetchById(albums)
      .then(function (album) {
      
        album.imageUrl = '/api/albums/' + album.id + '/image';
        album.songs.forEach(function (song, i) {
          song.audioUrl = '/api/songs/' + song.id + '/audio';
          song.albumIndex = i;
        });

        $scope.album = album;

     StatsFactory.totalTime(album)
      .then(function(albumDuration) {
        $scope.fullDuration = albumDuration;
        console.log($scope.fullDuration);
      })

    })
    .catch($log.error);

     
    })
 

  $scope.playingSong = function () {
    return PlayerFactory.getCurrentSong();
  }

  $scope.isPlaying = function () {
    return PlayerFactory.isPlaying();
  }
  // main toggle
  $scope.toggle = function (song, listOfSongs) {
    // if ($scope.playing && song === $scope.currentSong) {
    //   $rootScope.$broadcast('pause');
    // } else {
    //   $rootScope.$broadcast('play', song);
    // }

    if(PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song ){
      PlayerFactory.pause();
    }
    else if (PlayerFactory.getCurrentSong() === song){
      PlayerFactory.resume();
    } 
    else {
      PlayerFactory.start(song, listOfSongs);
    }
  };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality


  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; }

  // // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   // if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // }
  // function next () { skip(1); }
  // function prev () { skip(-1); }

});

juke.controller('AllCtrl', function($scope, $http, $rootScope, $log, AlbumFactory){
  $rootScope.$on('showAllAlbums', function () {
    $scope.showMe = true;
    
  })
  AlbumFactory.fetchAll()
    .then(function (albums) {
     
      albums.forEach(function(album){
        album.imageUrl = '/api/albums/' + album.id + '/image';
      })
     return $scope.albums = albums;
    })
    .catch($log.error);
    
})

