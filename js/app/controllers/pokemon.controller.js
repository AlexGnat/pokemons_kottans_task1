angular.module('PokemonApp')
    .controller('PokemonController', ['$scope', 'pokemonService', function ($scope, pokemonService) {
        $scope.pokemons = [];

        $scope.hasMorePokemons = true;

        $scope.selectedPokemon = {};

        $scope.loadMorePokemons = function () {
            pokemonService.loadMorePokemons()
                .then(function (response) {
                    $scope.pokemons = response;
                    $scope.hasMorePokemons = pokemonService.hasMorePokemons();
                });
        };

        $scope.selectPokemon = function (pokemon) {
            $scope.selectedPokemon = pokemon;
        };

        //load first portion of pokemons
        $scope.loadMorePokemons();
    }]);