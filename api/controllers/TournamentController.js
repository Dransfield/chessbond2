/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	upcomingTournamentsWithTime:function(req,res){
	Tournament.find({ activated:false,timeToAvailable:{'>':0},sort: 'createdAt DESC'}).exec(function(err,latestOne)
		{
			var dat=Date.now();
			console.log(dat);
			sender={serverTime:dat,tourneys:latestOne};
			return res.send(sender);
	}
};

