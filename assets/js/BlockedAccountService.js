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
			console.log("get blocked accounts");	
				for(var i = BlockedAccounts.length - 1; i >= 0; i--) {
				console.log(BlockedAccounts[i]);
			}
				
			return BlockedAccounts;
			},
		
			
			getRequestedBlockedAccounts:function() {
			return BlockedAccountsRequested;
			},
			setRequestedBlockedAccounts:function() {
			 BlockedAccountsRequested=true;
			},
		
			clearBlockedAccountPromises:function(){
			BlockedAccountPromises=[];
			},
			
			getBlockedAccountPromises:function() {
			return BlockedAccountPromises;
			},
			
			addBlockedAccountPromise:function(prom){
			BlockedAccountPromises.push(prom);
			},
            setBlockedAccount: function(acc) {
				console.log(acc +"is blocked ");
				
			
				
                BlockedAccounts[acc]=true;
                
               
                
            }, 
            UnsetBlockedAccount: function(acc) {
				console.log(acc +"is unblocked ");
				
			
				
                BlockedAccounts[acc]=false;
                
               
                
            },
    
			
    };
    });
