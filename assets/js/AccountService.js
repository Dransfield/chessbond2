 angular.module('HomepageModule').service('AccountService', function () {
        var Accounts = {};
		var AccountsRequested={};
		function setAccount(acc){
			     Accounts[acc.id] = acc;
           
           
            }
		function   setField(accID,fieldName,fieldValue) {
				if(Accounts[accID]) {
				Accounts[accID][fieldName]=fieldValue;
				}
			}
        return {
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
            downloadAccount: function(accID) {
                
                      
                console.log("is "+accID+" account requested?");
	
				if(!AccountsRequested[accID])
				{
					AccountsRequested[accID]=true;
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
				
									}
								
							});
						}
					});
	
				}	
                      
                
            }
            
            
        };
    });
