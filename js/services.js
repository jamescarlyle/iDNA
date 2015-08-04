'use strict';

var services = angular.module('services', [])
.constant('ETH', {
	'GAS_CREATE': '0x6ba62', // 30400 // 178786 gas = 0x2BA62
	'GAS_CLOSE': '0xaba62', // 30400
	'GAS_PRICE': '0x9184e72a000', // 10000000000000
})
;

var web3 = require('web3');
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

var ScrapBook = web3.eth.contract([{"constant":false,"inputs":[{"name":"childAddress","type":"address"}],"name":"registerChild","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"charityName","type":"bytes16"},{"name":"storeName","type":"bytes16"},{"name":"baseUrl","type":"bytes32"}],"name":"registerCharity","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"charityName","type":"bytes16"}],"name":"registerIdentity","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"hashValue","type":"bytes32"},{"name":"comment","type":"bytes32"}],"name":"createScrapBookEntry","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[],"type":"constructor"}]);

services.service('BlockChainSvc', ['$http', 'ETH', function($http, ETH) {
	var bidSuccessFilter, bidFailureFilter, auctionCreateFilter, auctionEndFilter, fundsReleasedFilter;

	// set up accounts
	var accounts =[];
	accounts.push('0x8c69c75f03a1cbbe7a935cc16f2918e45efb9ad8'); 
	accounts.push('0xfafa1d1c26f14236c1e7b9671de400adc50b3823');
	var boundAccount;

	this.getAccounts = function() {
		return accounts;
	}

	this.bindAccount = function(accountAddress) {
		boundAccount = accountAddress;
	}
	this.bindAccount(accounts[0]);

	this.getAccountAddress = function() {
		return boundAccount;
	}

	var contracts = [];
	contracts.push('0x2a7936067d3615882bea336fcbf8280a83ddbd19');
	contracts.push('0xdecafbad');
	var boundContract;

	this.getContracts = function() {
		return contracts;
	}

	this.bindContract = function(contractAddress) {
		boundContract = new ScrapBook(contractAddress);
	}
	this.bindContract(contracts[0]);

	this.getContractAddress = function() {
		return boundContract.address;
	}

	this.registerCharity = function(charityName, storeName, baseUrl) {
		boundContract.registerCharity(charityName, storeName, baseUrl, {from: boundAccount, gas: ETH.GAS_CREATE});
	};

	this.registerIdentity = function(charityName) {
		boundContract.registerIdentity(charityName, {from: boundAccount, gas: ETH.GAS_CREATE});
	};

	this.createScrapBookEntry = function(hashValue, comment) {
		return boundContract.createScrapBookEntry(hashValue, comment, {from: boundAccount, gas: ETH.GAS_CLOSE});
	};

}])
;