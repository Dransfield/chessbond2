 angular.module('HomepageModule').service('PrivateConversationService', function () {
      
        
        var PrivateConversations={};
        var PrivateConversationsRequested=false;
		var ShouldGetPrivateConversations=false;
		var TalkerPerson;
	
	
        return {
			
			getTalkerPerson:function(){
			return TalkerPerson;
			},
			setTalkerPerson:function(blk){
			TalkerPerson=blk;
			},
			setShouldGetPrivateConversations:function(accID){
				ShouldGetPrivateConversations=true;
				TalkerPerson=accID;
			},
			
			getShouldGetPrivateConversations:function(accID){
				return	ShouldGetPrivateConversations;
			},
		
			getPrivateConversations:function(accID){
			return PrivateConversations;
			},
			getRequestedPrivateConversations:function() {
			return PrivateConversationsRequested;
			},
			setRequestedPrivateConversations:function() {
			 PrivateConversationsRequested=true;
			},
            setPrivateConversation: function(acc,pcID) {
                PrivateConversations[acc]=pcID;
            }, 
            UnsetPrivateConversation: function(acc) {
                PrivateConversations[acc]=false;
            },
    
			
    };
    });
