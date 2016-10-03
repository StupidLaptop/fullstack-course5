(function (){
	'use-strict';
	// Module and controller set up with $scope injection and minified protection

	angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope', '$filter'];

	//
	function LunchCheckController($scope){
		$scope.countMenuItems = function () {
			// Checks for empty or white space submitted
			if ($scope.menu === undefined || !(/\S/.test($scope.menu))) {
				return 0;
			} 
			// Splits the list in an array using the comma as a separator
			else {
				var menuArray = $scope.menu.split(",");
				return(menuArray.length);
			}
		}; 

		//Sets the state that will be displayed according to what has been submitted.
		$scope.setState = function () {
			if ($scope.countMenuItems() == 0){
				$scope.state = "Please enter data first"
			}
			else if($scope.countMenuItems() <= 3){
				$scope.state = "Enjoy!"
			} else{
				$scope.state = "Too Much!"
			}
		};
	}
})();