var request = require('request');
var moment = require('moment');
var notifier = require('node-notifier');

var lat = '50.861771';
var long = '4.347678';
var url = 'https://pokevision.com/map/data/' + lat + '/' + long;

var myListJochen = [2, 3, 4, 5, 6, 8, 9, 12, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 36, 38, 42, 44, 45, 47, 49, 50,
				51, 53, 55, 56, 57, 60, 61, 62, 64, 65, 66, 67, 68, 73, 74, 75, 76, 78, 80, 91, 82, 83, 84, 86,
				88, 89, 91, 93, 94, 95, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 110, 111, 112, 113, 115, 117,
				118, 119,121, 122, 123, 124, 125, 126, 127, 128, 130, 131, 132]

var myListArya = [2, 3, 4, 5, 6, 8, 9, 12, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 36, 38, 42, 44, 45, 47, 49, 50,
				51, 53, 55, 56, 57, 60, 61, 62, 64, 65, 66, 67, 68, 73, 74, 75, 76, 78, 80, 91, 82, 83, 84, 86,
				88, 89, 91, 93, 94, 95, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 110, 111, 112, 113, 115, 117,
				118, 119,121, 122, 123, 124, 125, 126, 127, 128, 130, 131, 132]
	

function checkPokemonlist(){
	request('https://pokevision.com/map/data/' + lat + '/' + long, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var pokemons = new Set(JSON.parse(body).pokemon);
			pokemons.forEach(function (pokemon){
				if(myListJochen.indexOf(pokemon.pokemonId) !== -1){
					notify(pokemon, 'jochen')
				}
				if(myListArya.indexOf(pokemon.pokemonId) !== -1){
					notify(pokemon, 'Arya')
				}
			});
		}
	});
}

function notify(pokemon, name){
	var expDate = new Date(0);
					expDate.setUTCSeconds(pokemon.expiration_time);
					var exparation = moment(expDate);
					notifier.notify({
					'title':  name + ' -- ' + 'Pokemon found',
					'message': 'id: ' + pokemon.pokemonId + '  Expires within ' + exparation.fromNow(),
					'contentImage': 'https://ugc.pokevision.com/images/pokemon/'+ pokemon.pokemonId +'.png',
					'open': 'https://pokevision.com/#/@' + lat + ','+ long,
					'sound': 'Submarine', // case sensitive
					'wait': true // Wait for User Action against Notification
					});
}


setInterval(checkPokemonlist, 10000);