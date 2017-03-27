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
			getRequestedPrivateConversationss:function() {
			return PrivateConversationsRequested;
			},
			setRequestedPrivateConversationss:function() {
			 PrivateConversationsRequested=true;
			},
            setPrivateConversation: function(acc) {
                PrivateConversations[acc]=true;
            }, 
            UnsetPrivateConversation: function(acc) {
                PrivateConversations[acc]=false;
            },
    
			
    };
    });
