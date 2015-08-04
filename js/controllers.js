'use strict';
angular.module('controllers', ['services'])
.controller('IdentityManagerCtrl', ['BlockChainSvc', '$scope' , '$document', '$window', function (BlockChainSvc, $scope, $document, $window) {
	var identityManager = this;
	identityManager.contracts = BlockChainSvc.getContracts();
	identityManager.contract = BlockChainSvc.getContractAddress();
	identityManager.accounts = BlockChainSvc.getAccounts();
	identityManager.account = BlockChainSvc.getAccountAddress();
	identityManager.categories = [];
	// set up a watch on the contract dropdown, bind to the correct contract
	$scope.$watch('identityManager.contract', function(oldContract, newContract) {
		if (identityManager.contract) BlockChainSvc.bindContract(identityManager.contract);
	});
	$scope.$watch('identityManager.account', function(oldAccount, newAccount) {
		if (identityManager.contract) BlockChainSvc.bindAccount(identityManager.account);
	});

	identityManager.convertSeconds = function(s) {
		if (s == 0) return "";
		var d, h, m;
		m = Math.floor(s / 60);
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;
		return d  + ' days ' + h + ' hours, ' + m + ' minutes';
	};

	identityManager.scrollSmooth = function(target) {
		// var body = $document.find('body')[0];
		var body = $document[0].getElementById('view-area');

		var targetOffset = $document[0].getElementById(target.substr(1)).offsetTop; 
		var currentPosition = body.scrollTop;

		body.classList.add('in-transition');
		body.style.transform = "translate(0, -" + (targetOffset - currentPosition) + "px)";

		$window.setTimeout(function () {
			body.classList.remove('in-transition');
			body.style.cssText = "";
			$window.scrollTo(0, targetOffset);
		}, 2000);
		event.preventDefault();
	}

	identityManager.registerCharity = function() {
		BlockChainSvc.registerCharity(identityManager.charityName, identityManager.storeName, identityManager.baseUrl);
		identityManager.charityName = '';
		identityManager.storeName = '';
		identityManager.baseUrl = '';
	};

	identityManager.registerIdentity = function() {
		BlockChainSvc.registerIdentity(identityManager.charityName);
		identityManager.charityName = '';
	};

	identityManager.createScrapBookEntry = function() {
		BlockChainSvc.createScrapBookEntry(identityManager.hashValue, identityManager.comment);
		identityManager.hashValue = '';
		identityManager.comment = '';
	};

}]);

