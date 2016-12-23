/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
	'GET /': {view: 'homepage'},
	'/profile': {view:'profile'},
	'/playvsai':{view:'humanvsai'},
	'GET /registerpage':{view:'register'},
	
	'GET /HomepageHeartbeat':'PageController.HomepageHeartbeat',
	'/humanvshuman':{view:'humanvshuman'},
	'/recordsession':'PageController.RecordSession',
	'/MyLogout':'AuthController.logout',
	'PUT /joingame':'PageController.Joingame',
	'/SendMail':'PageController.SendMail',
	'get /seereq':'PageController.seereq',
 	'POST /loginbuttonpushed':'PageController.loginbuttonpushed',
	'GET /subscribeToRoom':'PageController.subscribeToRoom',
	'PUT /newopengame':'PageController.newopengame',
	'PUT /deleteopengame':'PageController.deleteopengame',
	'PUT /deletegame':'PageController.deletegame',
	'PUT /updatelevelbeaten':'PageController.UpdateLevelBeaten',
	'PUT /ChangeUsersCurrentGame':'PageController.ChangeUsersCurrentGame',
	'POST /chatmsg':'PageController.chatmsg',
	'PUT /chessgamemove':'PageController.chessgamemove',
	'PUT /RecordGameResult':'PageController.RecordGameResult',
	'PUT /pingtest':'PageController.ReturnPing',
	'/logintwitter': 'AuthController.logintwitter',
	'/auth/google_oauth2':'AuthController.googlecallback',
	'/logingoogle': 'AuthController.logingoogle',
	'/auth/twitter_oauth':'AuthController.twittercallback',
  	'/loginfacebook': 'AuthController.loginfacebook',
	'/auth/facebook_oauth2':'AuthController.facebookcallback',
	'POST /register':'AuthController.register',
	'PUT /login':'AuthController.login'
  
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
