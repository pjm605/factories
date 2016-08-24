'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var songList;
  var progress = 0;

 	audio.addEventListener('timeupdate', function () {
  			progress = audio.currentTime / audio.duration
  			
  			$rootScope.$digest();
 		 });
  audio.addEventListener('ended', function(){
  		ourObj.next();
  		$rootScope.$digest();
  })

  var ourObj = {
  	start: function (song, listOfSongs) {
  		this.pause();
  		audio.src = song.audioUrl;
    	audio.load();
    	audio.play();
    	playing = true;
    	currentSong = song;
    	songList = listOfSongs;
  	},
  	pause: function () {
  		audio.pause();
  		playing = false;

  	},
  	resume: function () {
  		playing = true;
  	 	audio.play();
  		

  	},
  	isPlaying: function () {
  		return playing
  	},
  	getCurrentSong: function () {
  		return currentSong;
  		
  	},
  	next: function () {
  		this.pause();
  		var newIndex = songList.indexOf(currentSong) + 1;
  		if (newIndex >= songList.length){
  			newIndex = 0;
  		} 
  		 this.start(songList[newIndex], songList); 
  	},
  	previous: function () {
  		this.pause();
  		var newIndex = songList.indexOf(currentSong) - 1;
  		if( newIndex < 0) {
  			newIndex = songList.length - 1
  		}
  		this.start(songList[newIndex], songList)
  		
  	},
  	getProgress: function () {
  		
  		 return progress;
  	}
	}
	return ourObj;
});

