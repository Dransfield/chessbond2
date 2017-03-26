 angular.module('HomepageModule').service('AccountService', function () {
        var Accounts = new Array;
        var AccountsRequested=new Array();
  
        return {
			
			LabelRequestedAccount:function(accID) {
			for(var i = AccountsRequested.length - 1; i >= 0; i--) {
				
			if(AccountsRequested[i].id === accID) {
			AccountsRequested[i].requested=true;
			}
			
			}
			},
			/*
			RemoveRequestedAccount:function(accID) {
				
			for(var i = AccountsRequested.length - 1; i >= 0; i--) {
				
			if(AccountsRequested[i].id === accID) {
			AccountsRequested.splice(i, 1);
			}
			}
				
			},
			*/
			getRequestedAccounts:function() {
			return AccountsRequested;
			},
		    getAccount: function (id) {
                return Accounts[id];
            },
           Accounts,
            setAccount: function(acc) {
                Accounts[acc.id]=acc;
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
			
			for(var i = Accounts.length - 1; i >= 0; i--) {

				if(Accounts[i].id === accID) {
				return;
				}
			}
			for(var i = AccountsRequested.length - 1; i >= 0; i--) {
		
				if(AccountsRequested[i].id === accID) {
				return;
				}
			}
			AccountsRequested.push({id:accID,requested:false});

			}
            
    };
    });
