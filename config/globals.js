/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.globals.html
 */
 
 
 

		
module.exports.globals = {

  /****************************************************************************
  *                                                                           *
  * Expose the lodash installed in Sails core as a global variable. If this   *
  * is disabled, like any other node module you can always run npm install    *
  * lodash --save, then var _ = require('lodash') at the top of any file.     *
  *                                                                           *
  ****************************************************************************/

	// _: true,

  /****************************************************************************
  *                                                                           *
  * Expose the async installed in Sails core as a global variable. If this is *
  * disabled, like any other node module you can always run npm install async *
  * --save, then var async = require('async') at the top of any file.         *
  *                                                                           *
  ****************************************************************************/

	// async: true,

  /****************************************************************************
  *                                                                           *
  * Expose the sails instance representing your app. If this is disabled, you *
  * can still get access via req._sails.                                      *
  *                                                                           *
  ****************************************************************************/

	 sails: true,

  /****************************************************************************
  *                                                                           *
  * Expose each of your app's services as global variables (using their       *
  * "globalId"). E.g. a service defined in api/models/NaturalLanguage.js      *
  * would have a globalId of NaturalLanguage by default. If this is disabled, *
  * you can still access your services via sails.services.*                   *
  *                                                                           *
  ****************************************************************************/

	// services: true,
	
		gamecategories:[{time:1,extratime:0},
					{time:2,extratime:0},
					{time:3,extratime:0},
					{time:4,extratime:0},
					{time:5,extratime:0},
					{time:6,extratime:0},
					{time:7,extratime:0},
					{time:8,extratime:0},
					{time:9,extratime:0},
					{time:10,extratime:0},
					{time:15,extratime:0},
					{time:20,extratime:0},
					{time:30,extratime:0},
					{time:60,extratime:0},
					{time:2,extratime:1},
					{time:3,extratime:1},
					{time:5,extratime:2},
					{time:10,extratime:5},
					{time:15,extratime:5},
					{time:20,extratime:10},
					{time:30,extratime:10},
					{time:60,extratime:10}],

  /****************************************************************************
  *                                                                           *
  * Expose each of your app's models as global variables (using their         *
  * "globalId"). E.g. a model defined in api/models/User.js would have a      *
  * globalId of User by default. If this is disabled, you can still access    *
  * your models via sails.models.*.                                           *
  *                                                                           *
  ****************************************************************************/
  CreateTournaments:function()
{
	console.log("create tournaments");
	var sixtySixMinutes=(60*1000)*66;
	var threeMinutes=(60*1000)*3;
	var tenMinutes=(60*1000)*10;
	var oneMinute=60*1000;
	//check tournaments
	setInterval(function(){
	//	Tournament.find({players:{ '<': 2 }}).
		Tournament.find({
		 or : [
    { players: 0 },
    { players: 1 },
    { players: 2 },
    { players: 3 },
    { players:null }
  ],activated:true}).
		exec(function afterwards(err, records)
			{
				//console.log("records "+records);
				for (iter in records)
				{
					var createdDate=new Date(records[iter].createdAt);
					//console.log(Date.now()-createdDate);
					//console.log(createdDate);
					if((Date.now()-createdDate)>threeMinutes)
					{
						records[iter].destroy();
					}
					console.log("looking for tournament entry with id "+records[iter].id);
					Tournamententry.find({tournid:records[iter].id}).exec
					(function afterwards(tdestroyErr,tdestroyRecords)
					{
						console.log("tournament entries for destroyed tourny "+JSON.stringify(tdestroyRecords));
						CurrentTournamententry.destroy({player:tdestroyRecords.player}).exec
						(function afterwards(cdestroyErr,cdestroyRecords)
						{});
						
						
					});
					
				}
			});
		},tenMinutes);
	},
	 models: true
};


