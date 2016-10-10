(function (){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

	function ToBuyController(ShoppingListCheckOffService){
		var tbList = this;

		tbList.items = ShoppingListCheckOffService.getTbItems();
		tbList.message = "Everything is bought!";
		tbList.updateItems = function(itemIndex) {
			ShoppingListCheckOffService.updateLists(itemIndex);
		}
	}

	function AlreadyBoughtController(ShoppingListCheckOffService){
		var abList = this;

		abList.items = ShoppingListCheckOffService.getAbItems();
		abList.message = "Nothing bought yet.";
	}

	function ShoppingListCheckOffService() {
		var service = this;

		var tbItems = [ {name: 'Cookies', quantity: 10}, {name: 'Chips', quantity: 20},  {name: 'Apples', quantity: 5} ];
		var abItems = [];

		service.updateLists = function(itemIndex) {
			abItems.push(tbItems[itemIndex]);
			tbItems.splice(itemIndex, 1);		
		}

		service.getTbItems = function() {
			return tbItems;
		}

		service.getAbItems = function() {
			return abItems;
		}
	} 
})();