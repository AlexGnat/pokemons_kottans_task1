angular.module("PokemonApp")
    .service("pokemonService", ['$http', function ($http) {
        var self = this;
        var API_PATH = "http://pokeapi.co/api/v1/";
        var NEW_POKEMON_COUNT = 12;

        var pokemons = [];
        var pokemonTypes = [];
        var TOTAL_POKEMONS_AVAILABLE = 0;

        this.getPokemonList = function () {
            return pokemons;
        };

        this.getTypes = function () {
            return pokemonTypes;
        };

        this.updateTypes = function (newPokemons) {
            for (var i = 0; i < newPokemons.length; i++) {
                for (var j = 0; j < newPokemons[i].types.length; j++) {
                    if (pokemonTypes.indexOf(newPokemons[i].types[j].name) === -1) {
                        pokemonTypes.push(newPokemons[i].types[j].name);
                    }
                }
            }
            return pokemonTypes;
        };

        this.loadMorePokemons = function () {
            return $http.get(API_PATH + "pokemon/?limit=" + NEW_POKEMON_COUNT + "&offset=" + pokemons.length)
                .then(function (response) {
                    if (TOTAL_POKEMONS_AVAILABLE === 0) {
                        TOTAL_POKEMONS_AVAILABLE = response.data.meta.total_count;
                    }

                    var newPokemons = response.data.objects;
                    self.updateTypes(newPokemons);
                    pokemons = pokemons.concat(newPokemons);
                    return pokemons;
                });
        };

        this.hasMorePokemons = function () {
            return !(pokemons.length === TOTAL_POKEMONS_AVAILABLE);
        }
    }]);