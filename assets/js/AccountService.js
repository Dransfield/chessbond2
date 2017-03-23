 angular.module('HomepageModule').service('AccountService', function () {
        var Accounts = {};
		var AccountsRequested={};
        return {
            getAccount: function (id) {
                return Accounts[id];
            },
            setAccount: function(acc) {
                Accounts[acc.id] = acc;
            },
            setField:function(accID,fieldName,fieldValue) {
				Accounts[accID][fieldName]=fieldValue;
			},
            downloadAccount: function(accID) {
                
                      
                console.log("is "+accID+" account gotten?");
	
				if(!AccountsRequested[accID])
				{
					AccountsRequested[accID]=true;
					console.log(accID+" not gotten");
	
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
