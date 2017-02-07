angular
    .module('Beer', ['ngMaterial', 'ngMessages', 'ngResource'])
    .controller('BeerCtrl', function($scope, $http, $resource) {
        fetchBeerList()
        
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
                  }    
                })
          )
        } 

        $scope.$on('NameSort', function(){
            $scope.beerList.sort((a, b) => {
                const nameA = a.name.toUpperCase() 
                const nameB = b.name.toUpperCase()
                if (nameA < nameB) { return -1 }
                if (nameA > nameB) { return 1 }
                // names must be equal
                return 0
            })
        })

        $scope.$on('ABVSort', function(){
            $scope.beerList.sort((a, b) => {
                return a.abv - b.abv
            })
        })


        
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });
