juke.controller('ArtistCtrl', function ($scope, $rootScope, $log, ArtistFactory) {
	ArtistFactory.fetchAll()
		.then(function (artists) {
			return $scope.artists = artists;
		})
		.catch($log.error);


	$scope.$on('viewSwap', function(event, data){
		$scope.showMe = (data.name ==='allArtists')
	})

	$scope.showOneArtist = function(id){
		$rootScope.$broadcast('viewSwap', {name: 'oneArtist', artistId: id})
	}	
})

juke.controller('SingleArtistCtrl', function($scope, ArtistFactory, PlayerFactory){
	$scope.$on('viewSwap', function(event, data){
		if (data.name === 'oneArtist'){
			$scope.showMe = true;
			ArtistFactory.fetchById(data.artistId)
			.then(function(artist){
				$scope.artist = artist;
				$scope.albums = function () {
					return ArtistFactory.getAlbums();
				} 
				$scope.artistSongs = function () {
					return ArtistFactory.getSongs();
				} 
				$scope.playingSong = function(){
					return PlayerFactory.getCurrentSong();
				}
				$scope.toggle = function (song, listOfSongs) {
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
				$scope.isPlaying = function() {
					return PlayerFactory.isPlaying();
				}
				})
			
		}
	})


})