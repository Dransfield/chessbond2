 angular.module('HomepageModule').service('BlockedAccountService', function () {
      
        
        var BlockedAccounts={};
        var BlockedAccountPromises=new Array();
        var BlockedAccountsRequested=false;
		var ShouldGetBlockedAccounts=false;
		var BlockerPerson;
	
	
        return {
			
			getBlockerPerson:function(){
			return BlockerPerson;
			},
			setBlockerPerson:function(blk){
			BlockerPerson=blk;
			},
			setShouldGetBlockedAccounts:function(accID){
				ShouldGetBlockedAccounts=true;
				BlockerPerson=accID;
			},
			getShouldGetBlockedAccounts:function(accID){
				return	ShouldGetBlockedAccounts;
			},
		
			getBlockedAccounts:function(accID){
			return BlockedAccounts;
			},
			getRequestedBlockedAccounts:function() {
			return BlockedAccountsRequested;
			},
			setRequestedBlockedAccounts:function() {
			 BlockedAccountsRequested=true;
			},
            setBlockedAccount: function(acc) {
                BlockedAccounts[acc]=true;
            }, 
            UnsetBlockedAccount: function(acc) {
                BlockedAccounts[acc]=false;
            },
    
			
    };
    });
