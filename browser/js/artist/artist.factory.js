juke.factory('ArtistFactory', function ($http) {
	var albumList;
	var songList;
	var url;
	var artistObj = {
		fetchAll: function () {
			return $http.get('/api/artists')
				.then (function (response) {
					return response.data
				})
		},
		fetchById: function(id) {
			return $http.get('/api/artists/' + id)
			.then(function (response) {
				$http.get('/api/artists/' + response.data.id + '/albums') 
					.then(function (albums) {
						albums.data.forEach(function (album, index) {
							albums.data[index].imageURL = '/api/albums/' + album.id + '/image';
						})
						albumList = albums.data
						console.log(albumList)

					})
				$http.get('/api/artists/' + response.data.id + '/songs')
					.then(function (songs) {
						songs.data.forEach(function (song, index) {
							songs.data[index].audioUrl = '/api/songs/' + song.id + '/audio'
						})
						songList = songs.data;
					})
				return response.data

				})
		},
		getAlbums: function () {

			return albumList;
		},
		getSongs: function () {
			return songList;
		}

	}

	return artistObj
 	
})