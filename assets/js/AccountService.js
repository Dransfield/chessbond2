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
			AccountsRequested[accID]=true;
			},
            downloadAccounts: function() {
                
                      
                for (x in AccountsRequested)
                {
					Promises.push(new Promise((resolve,reject)=>{
						
				
					
					console.log(accID+" not requested");
	
					io.socket.get('/user/'+accID,
					function(usr){
					
						if (usr)
						{
							setAccount(usr);
								io.socket.get('/subscription?subscriber='+accID,
								function (rply) {
		
								
									if(rply)
									{
									console.log("got reply");
										if(rply.length>0)
										{
										console.log(accID+" is online");
										setField(accID,'online',true);
										}
										else
										{
										
										console.log(accID+" is not online");
										setField(accID,'online',false);
										}
									resolve();
									}
									else
									{resolve();}
								
							});
						}
						else
						{resolve();}
					});
	
				}));	
                      
                
            }
            
            
        }
    };
    });
