juke.controller('SidebarCtrl', function ($scope, $rootScope) {
	$scope.viewAlbums = function(){
		return $rootScope.$broadcast('viewSwap', { name: 'allAlbums' });
	}

	$scope.viewAllArtists = function(){
		return $rootScope.$broadcast('viewSwap', { name: 'allArtists' });
	}

	
})