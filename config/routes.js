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
	//'GET /': {view: 'homepage'},
	'GET /':{view:'jqhp'},
	//'GET /jq':{view:'jqhp'},
	'POST /startprivateconversation':'PrivateConversationController.New',
	'POST /startfollow':'FollowController.New',
	'POST /leftprivateconversation':'PrivateConversationController.Left',
	'GET /opentournament':{view:'opentournamentjq'},
	'GET /stats/:userID':{view:'stats'},
	'GET /stats':{view:'stats'},
	'GET /aboutus':{view:'aboutus'},
	'GET /termsofservice':{view:'termsos'},
	'GET /privacypolicy':{view:'privacypolicy'},
	'GET /sitemap':{view:'sitemap'},
	'GET /contactus':{view:'contactus'},
	'GET /album/:ID': {view: 'album'},
	'GET /albums/:userID': {view: 'albums'},
	'GET /user/avatar/:id':'UploadController.avatar',
	'/profile/:ID': {view:'profilejq'},
	//'/newprofile/:ID': {view:'profilejq'},
	'/seeprivateconversation/:ID': {view:'privateconversationjq'},
	'/profile': {view:'profilejq'},
	//'/newprofile': {view:'profilejq'},
	'GET /humanvshuman/:GameID':{view:'humanvshuman'},
	'GET /humanvshumannew/:ID':{view:'humanvshumanjq'},
	'GET /session/:SessionID':{view:'session'},
	'/ConfirmDeleteAccount':{view:'confirmdelete'},
	
	'GET /DeleteAccount':'UserController.DeleteAccount',
	'/DeletedAccount':{view:'accountdeleted'},
	'GET /UndeleteAccount':'UserController.UndeleteAccount',
	'/UndeletedAccount':{view:'accountundeleted'},
	'/playvsai':{view:'humanvsai'},
	'/forgot':{view:'forgot'},
	
	
	//'GET /profilealbum': {view: 'myfile'},
	//'/myfile2': {view: 'myfile2'},
	//'/tournament':{view:'go'},
	'GET /registerpage':{view:'register'},
	'GET /getmyfile':'FetchController.GetFile',
	//'GET /HomepageHeartbeat':'PageController.HomepageHeartbeat',
	/*'GET /countcities':'CityController.countcities',
	'GET /createcitydatabase':'CityController.CreateDatabase',
	*/
	'POST /uploadavatar':'UploadController.Upload',
	'POST /uploadavatar/:albumID':'UploadController.UploadToAlbum',
	'/justloggedin':'PageController.JustLoggedIn',
	'GET /updateGameTime':'PageController.updateGameTime',
	'/MyLogout':'AuthController.logout',
	'PUT /joingame':'PageController.Joingame',
	'PUT /imidle':'PageController.AnnounceIdle',
	
	'PUT /SendMail':'ForgotBackController.SendMail',
	'PUT /deleteavatar':'AvatarController.deletepic',
	'PUT /ResetPassword':'ForgotBackController.ResetPassword',
	'GET /forgot/password/:code':{view:'newpassword'},
	'PUT /Withdraw':'PageController.Withdraw',
	'PUT /OfferDraw':'PageController.OfferDraw',
 	'PUT /AcceptDraw':'PageController.AcceptDraw',
	'GET /subscribeToRoom':'PageController.subscribeToRoom',
	'PUT /newopengame':'PageController.newopengame',
	'PUT /newsession':'PageController.newsession',
	'PUT /deleteopengame':'PageController.deleteopengame',
	'PUT /deletegame':'PageController.deletegame',
	'PUT /updatelevelbeaten':'PageController.UpdateLevelBeaten',
	'POST /newnotification':'NotificationController.newnotification',
	//'PUT /ChangeUsersCurrentGame':'PageController.ChangeUsersCurrentGame',
	'POST /chatmsg':'PageController.chatmsg',
	'POST /newwallpost':'WallpostController.wallpost',
	'PUT /LookedAtProfile':'PageController.LookedAtProfile',
	'PUT /chessgamemove':'PageController.chessgamemove',
	'PUT /BroadcastPing':'PageController.BroadcastPing',
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
