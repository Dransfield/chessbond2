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
<<<<<<< HEAD
   
=======
>>>>>>> 6129dc5205591780bc5563a488aafcdd855c80bc
  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

<<<<<<< HEAD
     order: [
     'myRequestLogger',
=======
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
>>>>>>> 6129dc5205591780bc5563a488aafcdd855c80bc
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
<<<<<<< HEAD
     //  '$custom',
=======
       '$custom',
>>>>>>> 6129dc5205591780bc5563a488aafcdd855c80bc
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
<<<<<<< HEAD
	forcedomain:function(req,res,next){
	console.log(req.session.baseUrl);
	console.log(req.baseUrl);
	console.log(req.wantsJSON);
	console.log(req.baseUrl.indexOf('https://www'));
    if (req.baseUrl.indexOf('https://www') == 0)  {
        console.log("Already http://www; don't do anything special.??");
        next();
    } else {
        console.log('REDIRECTING http://www.' + req.headers.host);
        res.redirect('https://www.' + req.headers.host + req.url);
        return next();
    }

	},
	
=======
>>>>>>> 6129dc5205591780bc5563a488aafcdd855c80bc
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
<<<<<<< HEAD
  myRequestLogger: function (req, res, next) {
	  
		var str=req.headers.host;
	if(str)
	{
         if (str.startsWith('www')==false)
         
         {
			 console.log("redirect to https");
		 res.redirect('https://www.chessbond.com');
		 }
		 else
			{
         return next();
			}
     }
     }
      
=======
	
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
          

>>>>>>> 6129dc5205591780bc5563a488aafcdd855c80bc


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
<<<<<<< HEAD
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
=======
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
>>>>>>> 6129dc5205591780bc5563a488aafcdd855c80bc
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
