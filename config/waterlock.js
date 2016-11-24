
/**
 * waterlock
 *
 * defines various options used by waterlock
 * for more informaiton checkout
 *
 * http://waterlock.ninja/documentation
 */
 var sails=require('sails');

module.exports.waterlock = {

  // Base URL
  //
  // used by auth methods for callback URI's using oauth and for password
  // reset links.
 // baseUrl: 'http://localhost:1337',
baseUrl: 'http://www.chessbond.com',

  // Auth Method(s
  //
  // this can be a single string, an object, or an array of objects for your
  // chosen auth method(s) you will need to see the individual module's README
  // file for more information on the attributes necessary. This is an example
  // of the local authentication method with password reset tokens disabled.
  authMethod: [
   {
      name: 'waterlock-google-auth',
      clientId: '79902088919-rlb7uk2od7s3337tchn9h32jmo0elo7v.apps.googleusercontent.com', 
      clientSecret: 'AChKZobq7KFTCf_jbs7hsxYn',
      allow: ['DOMAIN', 'USER@DOMAIN'],
      fieldMap: {
            // <model-field>: <google-field>,
            'firstName': 'given_name',
            'lastName': 'family_name',
            'gender': 'gender',
            'Picture':'picture'
        },
        /*
        redirectUri: 'http://localhost:1337/auth/google_oauth2'
		*/
        
        redirectUri: 'http://www.chessbond.com/auth/google_oauth2/'
		
    },
   	{
		/*name: "waterlock-facebook-auth",
		appId: '204930219956613',
		appSecret:'6246902d2ef94f1dbd083fb4946c694b',
		fieldMap: {
			'Picture':'picture',
			'Cover':'cover',
			'gender': 'gender'
		},
		redirectUri: 'http://localhost:1337/auth/facebook_oauth2'
		*/
		name: "waterlock-facebook-auth",
		appId: '204758053307163',
		appSecret:'efc1758be36f4bfc488ea18f5680cb60',
		fieldMap: {
			'Picture':'picture',
			'Cover':'cover',
			'gender': 'gender'
		},
		redirectUri: 'http://www.chessbond.com/auth/facebook_oauth2/'
		
	},
	{
      name:'waterlock-local-auth-bcryptjs',
      passwordReset:{
        tokens: false,
        mail: {
          protocol: 'SMTP',
          options:{
            service: 'Gmail',
            auth: {
              user: 'gmail.user@gmail.com',
              pass: 'userpass'
            }
          },
          from: 'no-reply@domain.com',
          subject: 'Your password reset!',
          forwardUrl: 'http://localhost:1337'
        },
        template:{
          file: '../views/email.jade',
          vars:{}
        }
      },
      createOnNotFound: true
    }
  ],

  // JSON Web Tokens
  //
  // this provides waterlock with basic information to build your tokens,
  // these tokens are used for authentication, password reset,
  // and anything else you can imagine
  jsonWebTokens:{

    // CHANGE THIS SECRET
    secret: 'bigcodestring',
    expiry:{
      unit: 'days',
      length: '7'
    },
    audience: 'app name',
    subject: 'subject',

    // tracks jwt usage if set to true
    trackUsage: true,

    // if set to false will authenticate the
    // express session object and attach the
    // user to it during the hasJsonWebToken
    // middleware
    stateless: false,

    // set the name of the jwt token property
    // in the JSON response
    tokenProperty: 'token',

    // set the name of the expires property
    // in the JSON response
    expiresProperty: 'expires',

    // configure whether or not to include
    // the user in the respnse - this is useful if
    // JWT is the default response for succesfull login
    includeUserInJwtResponse: false
  },

  // Post Actions
  //
  // Lets waterlock know how to handle different login/logout
  // attempt outcomes.
  postActions:{

    // post login event
    login: {

      // This can be any one of the following
      //
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      success: '/',

      // This can be any one of the following
      //
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      failure: 'default'
    },

    //post logout event
    logout: {

      // This can be any one of the following
      //
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      success: '/',

      // This can be any one of the following
      //
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      failure: 'default'
    },
    // post register event
   register: {
     // This can be any one of the following
     //
     // url - 'http://example.com'
     // relativePath - '/blog/post'
     // obj - {controller: 'blog', action: 'post'}
     // string - 'custom json response string'
     // default - 'default'
     success: 'default',
     // This can be any one of the following
     //
     // url - 'http://example.com'
     // relativePath - '/blog/post'
     // obj - {controller: 'blog', action: 'post'}
     // string - 'custom json response string'
     // default - 'default'
     failure: 'default'
   }
  }
};
