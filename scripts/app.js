angular
    .module('Beer', ['ngMaterial', 'ngMessages', 'ngResource'])
    .controller('BeerCtrl', function($scope, $http, $resource) {
        fetchBeerList()
        
        $scope.selection = null
        $scope.beerList = []

        function fetchBeerList(){
          return $http.get('https://api.punkapi.com/v2/beers')
          .then(beers => 
            $scope.beerList =
                beers.data.map(beer => {
                  return {
                    abv: beer.abv,
                    tagline: beer.tagline,
                    image: beer.image_url,
                    name: beer.name,
                    description: beer.description
                  }    
                })
          )
        } 

        $scope.handleSelection = function(e, beer) {
            $scope.selection = beer
        }

        $scope.$on('NameSort', function(){
            let sortedList = [...$scope.beerList]
            
            sortedList.sort((a, b) => {
                const nameA = a.name.toUpperCase() 
                const nameB = b.name.toUpperCase()
                if (nameA < nameB) { return -1 }
                if (nameA > nameB) { return 1 }
                // names must be equal
                return 0
            })

            $scope.beerList = 
              sortedList[0] === $scope.beerList[0] ? 
                sortedList.reverse() : sortedList
        })

        $scope.$on('ABVSort', function(){
            let sortedList = [...$scope.beerList]

            sortedList.sort((a, b) => {
                return a.abv - b.abv
            })

            $scope.beerList = 
              sortedList[0] === $scope.beerList[0] ? 
                sortedList.reverse() : sortedList
        })
      
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('light-blue')
            .dark();
    });
