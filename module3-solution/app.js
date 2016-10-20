(function (){
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				found: '<',
				isEmpty: '<',
				searchedBefore:'<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'list',
			bindToController: true,
			link: FoundItemsDirectiveLink
		};

		return ddo;
	}

	function FoundItemsDirectiveLink(scope, element, attrs, controller){
		scope.$watch("list.isEmpty && list.searchedBefore", function(newValue, oldValue){
			if(newValue === true){
				showAlert();
			} else{
				hideAlert();
			}
		})

		function showAlert(){
			var alert = element.find("div");
			alert.css('display', 'block');
		}

		function hideAlert(){
			var alert = element.find("div");
			alert.css('display', 'none');
		}
	}


	function FoundItemsDirectiveController(){
		var list = this;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var list = this;

		list.found = [];
		list.isEmpty = true;
		list.searchedBefore = false;
		list.getItems = function(searchTerm) {

			if(searchTerm !== "" && searchTerm !== undefined){
				console.log(searchTerm);
				list.searchedBefore = true;
				list.found = [];
				var promise = MenuSearchService.getMatchedMenuItems(searchTerm); 
				promise.then(function(response){	
						list.found = response;
						
						if (list.found.length === 0){
							list.isEmpty = true;
						} else{
							list.isEmpty = false;
						}
					})
					.catch(function(error){
						console.log(error);
					}) 
					
			} else {
				list.isEmpty = true;
				list.searchedBefore = true;
			}
		}
		list.removeItem = function (itemIndex) {
			list.found.splice(itemIndex, 1);
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){
		var service = this;

		service.getMatchedMenuItems = function(searchTerm){
			var response = $http({
				method: 'GET',
				url: (ApiBasePath + "/menu_items.json")				
			});
			return response.then(function(result){
				var allItems = result.data.menu_items;
				var foundItems = []
				for(var i = 0; i < allItems.length; i++){
					if (allItems[i].description.indexOf(searchTerm) !== -1){
						foundItems.push(allItems[i])
					}
				}
				return foundItems;
				console.log(foundItems);
			})
			.catch(function(error){
				console.log(error);
			});
		};
	}
})();