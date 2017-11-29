/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	upcomingTournamentsWithTime:function(req,res){
	Tournament.find({ activated:false,sort: 'timeToAvailable ASC'}).exec(function(err,latestOne)
		{
			Tournament.find({ activated:true,sort: 'createdAt ASC'}).exec(function(err2,latestOne2)
			{
			var dat=Date.now();
			console.log(dat);
			console.log(JSON.stringify(latestOne));
			console.log(JSON.stringify(latestOne2));
			latestOne.push(latestOne2);
			sender={serverTime:dat,tourneys:latestOne};
			return res.send(sender);
			});
		});
	}
};

