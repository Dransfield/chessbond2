 angular.module('HomepageModule').service('DateService', function () {
     
        return {
			
			phrasefordate:function(dat)
			{
			var nu=Date.parse(dat);
			
			if(!nu)
			{return"-----";}
		var n = Date.now();
		
		var newnum=n-nu;
		newnum=newnum/1000;
		if (newnum<60)
		{
		if (newnum<0)
		{newnum=0;}
		phrase=parseInt(newnum)+" seconds ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<24)
		{
		phrase=parseInt(newnum)+" hours ago";
		}
		else
		{
		newnum=newnum/24;
		
		phrase=parseInt(newnum+1)+" days ago";
		
		}
		
		}
		
		}
		return phrase;
	}
			
			
		
    });
