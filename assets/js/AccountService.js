 angular.module('HomepageModule').service('AccountService', function () {
        var Accounts = {};
		var AccountsRequested={};
		var Promises=[];
		function setAccount(acc){
			     Accounts[acc.id] = acc;
           
           
            }
		function   setField(accID,fieldName,fieldValue) {
				if(Accounts[accID]) {
				Accounts[accID][fieldName]=fieldValue;
				}
			}
        return {
			getRequestedAccounts:function() {
			return AccountsRequested;
			},
			getPromises:function() {
			return Promises;
			},
            getAccount: function (id) {
                return Accounts[id];
            },
            setAccount: function(acc) {
                Accounts[acc.id] = acc;
            },
            setField:function(accID,fieldName,fieldValue) {
				if(Accounts[accID]) {
				Accounts[accID][fieldName]=fieldValue;
				}
			},
			getField:function(accID,fieldName) {
				if(Accounts[accID]) {
				return Accounts[accID][fieldName];
				}
			},
			addAccount:function(accID) {
				if(!AccountsRequested[accID])
			{
			AccountsRequested[accID]=accID;
			console.log(accID+" was requested");
			}
			}
            
    };
    });
