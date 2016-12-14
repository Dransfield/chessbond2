/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {
passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),
   
  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

     order: [
       'startRequestTimer',
       'cookieParser',
       'session',
       'InitUser',
        'passportInit',     
        'passportSession',
       'bodyParser',
       'handleBodyParserError',
       'compress',
       'methodOverride',
       'poweredBy',
       '$custom',
       'router',
       'forcedomain',
       'www',
       
       'favicon',
       '404',
       '500'
     ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/
	forcedomain:function(req,res,next){
	console.log(req.session.baseUrl);
	console.log(req.baseUrl);
	console.log(req.wantsJSON);
	console.log(req.baseUrl.indexOf('http://www'));
    if (req.baseUrl.indexOf('http://www') == 0)  {
        console.log("Already http://www; don't do anything special.??");
        next();
    } else {
        console.log('http://www' + req.headers.host + req.url);
        res.redirect('http://www' + req.headers.host + req.url);
    }

	},
	
	InitUser:function(req,res,next){
	
	if (req.session.passport)
	{
		//console.log("passport user"+req.session.passport.user);
		if(!req.session.passport.user)
		{return next();
    	}
		
		User.findOne({
      id: req.session.passport.user
	},function foundUser(err,user){
		if (err)
		{//req.session.passport=null;
			  return next();
    
			}
		if (!user)
		{
		console.log("no user");
		return next();
    	}
		if (!err){
			var fields=['ChessPieceTheme','Country','SoundEnabled',"ELO",'DifficultyLevelBeaten'];
	var InitField=['A',"United Kingdom","Sound Enabled",1200,0];
	
			//console.log("user "+JSON.stringify(user));
	for(x in fields)
	{
		if (!user[fields[x]])
		{
			
		user[fields[x]]=InitField[x];
		
		}
		
		}
		user.save();
	  return next();
    
	}
	});
			
     }
     else
     {
	  return next();
     }
	},
  myRequestLogger: function (req, res, next) {
	  
		var str=req.headers.host;
	
         if (str.startsWith('www')==false)
         
         {res.redirect('http://www.chessbond.com');}
         return next();
     
     }
      


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  * Note that Sails uses an internal instance of Skipper by default; to      *
  * override it and specify more options, make sure to "npm install skipper" *
  * in your project first.  You can also specify a different body parser or  *
  * a custom function with req, res and next parameters (just like any other *
  * middleware function).                                                    *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')({strict: true})

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
