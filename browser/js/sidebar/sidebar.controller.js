juke.controller('SidebarCtrl', function ($scope, $rootScope) {
	$scope.viewAlbums = function(){
		return $rootScope.$broadcast('showAllAlbums');
	}
	
})