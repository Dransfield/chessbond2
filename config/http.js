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

    // order: [
    //   'startRequestTimer',
    //   'cookieParser',
    //   'session',
    //   'myRequestLogger',
    //   'bodyParser',
    //   'handleBodyParserError',
    //   'compress',
    //   'methodOverride',
    //   'poweredBy',
    //   '$custom',
    //   'router',
    //   'www',
    //   'favicon',
    //   '404',
    //   '500'
    // ],
     order: [
     'forceSSL',
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
		{console.log(JSON.stringify(err));
			  return next();
    
			}
		if (!user)
		{
		console.log("no user");
		return next();
    	}
		if (!err){
	
			var fields=['ChessPieceTheme','Country','SoundEnabled',"ELO",'DifficultyLevelBeaten',
			'BoardSize','BoardOrientation','SoundVolume','Numberoftimesloggedin','Gender','Dateofbirth','CurrentCity'
			,'FideTitle','ValidFideID','FideRatings'];
	var InitField=['A',"United Kingdom","Sound Enabled",1200,0,300,"Right",
	5,0,"","","","","",""];
	
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
	
   forceSSL: function (req, res, next) 
   {

         if (req.isSocket) 
         {
                return res.redirect('wss://' + req.headers.host + req.url);
         } 
         else 
         {
			
			var host = req.header("host");
			if (host.match(/^www\..*/i)) 
			{
			
			if(req.secure)
			{
				//console.log("secure");
			next();
			}
			else
			{
				//console.log("not secure");
			res.redirect(301, "https://" + host + req.url);
			}
			
			
			} 
			else
			{
				console.log("no www:"+req.secure);
			res.redirect(301, "https://www." + host + req.url);
			}
			
		}
				
	}
          



  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default,Sails uses [skipper](http://github.com/balderdashy/skipper). See *
  * https://github.com/expressjs/body-parser for other options. Note that    *
  * Sails uses an internal instance of Skipper by default; to override it    *
  * and specify more options, make sure to "npm install                      *
  * skipper@for-sails-0.12 --save" in your app first. You can also specify a *
  * different body parser or a custom function with req, res and next        *
  * parameters (just like any other middleware function).                    *
  *                                                                          *
  ***************************************************************************/


    // bodyParser: require('skipper')({strict: true})

  }


  /***************************************************************************
  *                                                                          *
  * The number of milliseconds to cache static assets in production.         *
  * These are any flat files like images, scripts, styleshseets, etc.        *
  * that are served by the static middleware.  By default, these files       *
  * are served from `.tmp/public`, a hidden folder compiled by Grunt.        *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
