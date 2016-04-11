angular.module('PokemonApp')
    .controller('PokemonController', ['$scope', '$filter', 'pokemonService', function ($scope, $filter, pokemonService) {
        $scope.pokemons = [];

        $scope.visiblePokemons = [];

        $scope.hasMorePokemons = true;

        $scope.selectedPokemon = {};

        $scope.typesList = [];

        $scope.selectedItem = {
            value: ""
        };

        $scope.loadMorePokemons = function () {
            pokemonService.loadMorePokemons()
                .then(function (response) {
                    $scope.pokemons = response;
                    $scope.hasMorePokemons = pokemonService.hasMorePokemons();
                    $scope.typesList = pokemonService.getTypes();
                    $scope.filterPokemons($scope.pokemons);
                });
        };

        $scope.selectPokemon = function (pokemon) {
            $scope.selectedPokemon = pokemon;
        };

        $scope.getIdWithZeros = function (id) {
            if (!id) {
                return "";
            }
            else if (id < 10) {
                return "00" + id;
            } else if (id < 100) {
                return "0" + id;
            } else {
                return id.toString();
            }
        };

        $scope.filterPokemons = function () {
            if ($scope.selectedItem.value) {
                if ($scope.selectedItem.value === "all types") {
                    $scope.visiblePokemons = $scope.pokemons;
                }
                else {
                    $scope.visiblePokemons = $filter('filter')($scope.pokemons, function (obj) {
                        for (var i = 0; i < obj.types.length; i++) {
                            if (obj.types[i].name === $scope.selectedItem.value) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
            }
            else {
                $scope.visiblePokemons = $scope.pokemons;
            }
        };

        //load first portion of pokemons
        $scope.loadMorePokemons();
    }]);