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
	oneMinute:(60*1000),
	fiveSeconds:(5*1000),
	fifteenSeconds:(15*1000),
	thirtySeconds:(30*1000),
	sixtySixMinutes:((60*1000)*66),
	 threeMinutes:((60*1000)*3),
	 tenMinutes:((60*1000)*10),
	 initialTimeouts:[],
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
playerIsWhite:function (player,game)
		{
		var imWhite=-1;
		if(game.Player1==player && game.Player1Color=='White')
		{imWhite=1;}
		if(game.Player1==player && game.Player1Color=='Black')
		{imWhite=0;}
		
		//else
		//{imWhite=false;}
		if(game.Player2==player && game.Player1Color=='Black')
		{imWhite=1;}
		if(game.Player2==player && game.Player1Color=='White')
		{imWhite=0;}
		
		//else
		//{imWhite=false;}
		return imWhite;
		},
		gameIsAWin:function(player,game) 
		{
			//if (game.GameCategory=="60|0")
			//{
			//console.log(game);
			//}
			
			if(game.Result)
			{
				var splitted=game.Result.split(">");
					for (y in splitted)
					{
						if(splitted[y].indexOf("Won by")>-1)
						{
							var name=splitted[y-1].split("<")[0];
							
						//		if (game.GameCategory=="60|0")
						//		{
						//		console.log("winner name is "+name);
						//		}
							
								if(player.indexOf(name)==0)
								{
										return true;
								}
							
						}
					}
			}
		},
  /****************************************************************************
  *                                                                           *
  * Expose each of your app's models as global variables (using their         *
  * "globalId"). E.g. a model defined in api/models/User.js would have a      *
  * globalId of User by default. If this is disabled, you can still access    *
  * your models via sails.models.*.                                           *
  *                                                                           *
  ****************************************************************************/
 
	 models: true
};


