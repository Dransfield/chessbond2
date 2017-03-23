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
			AccountsRequested[accID]=accID;
			console.log(accID+" was requested");
			
			},
            downloadAccounts: function() {
                
                      
                for (x in AccountsRequested)
                {
					Promises.push(new Promise((resolve,reject)=>{
						
				
					
					console.log(AccountsRequested[x]+" not requested");
	
					io.socket.get('/user/'+AccountsRequested[x],
					function(usr){
					
						if (usr)
						{
							setAccount(usr);
								io.socket.get('/subscription?subscriber='+AccountsRequested[x],
								function (rply) {
		
								
									if(rply)
									{
									console.log("got reply");
										if(rply.length>0)
										{
										console.log(AccountsRequested[x]+" is online");
										setField(AccountsRequested[x],'online',true);
										}
										else
										{
										
										console.log(AccountsRequested[x]+" is not online");
										setField(AccountsRequested[x],'online',false);
										}
									resolve(AccountsRequested[x]);
									}
									else
									{resolve(AccountsRequested[x]);}
								
							});
						}
						else
						{resolve(AccountsRequested[x]);}
					});
	
				}));	
                      
                
            }
            
            
        }
    };
    });
