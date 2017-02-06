var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
FacebookStrategy=require('passport-facebook').Strategy;
TwitterStrategy=require('passport-twitter').Strategy;
GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	
	
    User.findOne({ id: id } , function (err, user) {
		
		if (!user)
		{done(null, false);}
		else{
        done(err, user);}
    });
});

function GetCountry(loc)
{
var countries=[
	{name:'Afghanistan'},
	{name:'Albania'},
	{name:'Algeria'},
	{name:'American Samoa'},
	{name:'Andorra'},
	{name:'Angola'},
	{name:'Anguilla'},
	{name:'Antigua and Barbuda'},
	{name:'Argentina'},
	{name:'Armenia'},
	{name:'Aruba'},
	{name:'Australia'},
	{name:'Austria'},
	{name:'Azerbaijan'},
	{name:'Bahamas'},
	{name:'Bahrain'},
	{name:'Bangladesh'},
	{name:'Barbados'},
	{name:'Belarus'},
	{name:'Belgium'},
	{name:'Belize'},
	{name:'Benin'},
	{name:'Bermuda'},
	{name:'Bhutan'},
	{name:'Bolivia'},
	{name:'Bosnia and Herzegovina'},
	{name:'Botswana'},
	{name:'Brazil'},
	{name:'British Virgin Islands'},
	{name:'Brunei'},
	{name:'Bulgaria'},
	{name:'Burkina Faso'},
	{name:'Burundi'},
	{name:'Cambodia'},
	{name:'Cameroon'},
	{name:'Canada'},
	{name:'Cape Verde'},
	{name:'Cayman Islands'},
	{name:'Central African Republic'},
	{name:'Chad'},
	{name:'Chile'},
	{name:'China'},
	{name:'Christmas Island'},
	{name:'Colombia'},
	{name:'Comoros'},
	{name:'Cook Islands'},
	{name:'Costa Rica'},
	{name:'Croatia'},
	{name:'Cuba'},
	{name:'Cyprus'},
	{name:'Czech Republic'},
	
	{name:'Democratic Republic of the Congo'},
	{name:'Denmark'},
	{name:'Djibouti'},
	{name:'Dominica'},
	{name:'Dominican Republic'},
	{name:'East Timor'},
	{name:'Ecuador'},
	{name:'Egypt'},
	{name:'El Salvador'},
	{name:'Equatorial Guinea'},
	{name:'Eritrea'},
	{name:'Estonia'},
	{name:'Ethiopia'},
	{name:'Falkland Islands'},
	{name:'Faroe Islands'},
	{name:'Fiji'},
	{name:'Finland'},
	{name:'France'},
	{name:'French Polynesia'},
	{name:'Gabon'},
	{name:'Gambia'},
	{name:'Georgia'},
	{name:'Germany'},
	{name:'Ghana'},
	{name:'Gibraltar'},
	{name:'Greece'},
	{name:'Greenland'},
	{name:'Grenada'},
	{name:'Guam'},
	{name:'Guatemala'},
	{name:'Guinea'},
	{name:'Guinea Bissau'},
	{name:'Guyana'},
	{name:'Haiti'},
	{name:'Honduras'},
	{name:'Hong Kong'},
	{name:'Hungary'},
	{name:'Iceland'},
	{name:'India'},
	{name:'Indonesia'},
	{name:'Iran'},
	{name:'Iraq'},
	{name:'Ireland'},
	{name:'Israel'},
	{name:'Italy'},
	{name:"Ivory Coast"},
	{name:'Jamaica'},
	{name:'Japan'},
	{name:'Jordan'},
	{name:'Kazakhstan'},
	{name:'Kenya'},
	{name:'Kiribati'},
	{name:'Kuwait'},
	{name:'Kyrgyzstan'},
	{name:'Laos'},
	{name:'Latvia'},
	{name:'Lebanon'},
	{name:'Lesotho'},
	{name:'Liberia'},
	{name:'Libya'},
	{name:'Liechtenstein'},
	{name:'Lithuania'},
	{name:'Luxembourg'},
	{name:'Macau'},
	{name:'Macedonia'},
	{name:'Madagascar'},
	{name:'Malawi'},
	{name:'Malaysia'},
	{name:'Maldives'},
	{name:'Mali'},
	{name:'Malta'},
	{name:'Marshall Islands'},
	{name:'Martinique'},
	{name:'Mauritania'},
	{name:'Mauritius'},
	{name:'Mexico'},
	{name:'Micronesia'},
	{name:'Moldova'},
	{name:'Monaco'},
	{name:'Mongolia'},
	
	{name:'Montenegro'},
	
	{name:'Montserrat'},
	{name:'Morocco'},
	{name:'Mozambique'},
	{name:'Myanmar'},
	{name:'Namibia'},
	{name:'Nauru'},
	{name:'Nepal'},
	{name:'Netherlands'},
	{name:'Netherlands Antilles'},
	{name:'New Zealand'},
	{name:'Nicaragua'},
	{name:'Niger'},
	{name:'Nigeria'},
	{name:'Niue'},
	{name:'Norfolk Island'},
	{name:'North Korea'},
	{name:'Norway'},
	{name:'Oman'},
	{name:'Pakistan'},
	{name:'Palau'},
	{name:'Panama'},
	{name:'Papua New Guinea'},
	{name:'Paraguay'},
	{name:'Peru'},
	{name:'Philippines'},
	{name:'Pitcairn Islands'},
	{name:'Poland'},
	{name:'Portugal'},
	{name:'Puerto Rico'},
	{name:'Qatar'},
	{name:'Republic of the Congo'},
	{name:'Romania'},
	{name:'Russia'},
	{name:'Rwanda'},
	{name:'Saint Kitts and Nevis'},
	{name:'Saint Lucia'},
	{name:'Saint Pierre'},
	{name:'Saint Vincent and the Grenadines'},
	{name:'Samoa'},
	{name:'San Marino'},
	{name:'Sao Tome and Principe'},
	{name:'Saudi Arabia'},
	{name:'Senegal'},
	{name:'Serbia'},
	{name:'Seychelles'},
	{name:'Sierra Leone'},
	{name:'Singapore'},
	{name:'Slovakia'},
	{name:'Slovenia'},
	{name:'Solomon Islands'},
	{name:'Somalia'},
	{name:'South Africa'},
	
	{name:'South Korea'},

	{name:'Spain'},
	{name:'Sri Lanka'},
	{name:'Sudan'},
	{name:'Suriname'},
	{name:'Swaziland'},
	{name:'Sweden'},
	{name:'Switzerland'},
	{name:'Syria'},
	{name:'Taiwan'},
	{name:'Tajikistan'},
	{name:'Tanzania'},
	{name:'Thailand'},
	{name:'Tibet'},
	
	{name:'Togo'},
	{name:'Tonga'},
	{name:'Trinidad and Tobago'},
	{name:'Tunisia'},
	{name:'Turkey'},
	{name:'Turkmenistan'},
	{name:'Turks and Caicos Islands'},
	{name:'Tuvalu'},
	{name:'United Arab Emirates'},
	{name:'Uganda'},
	{name:'Ukraine'},
	{name:'United Kingdom'},
	{name:'United States'},
	{name:'Uruguay'},
	{name:'US Virgin Islands'},
	{name:'Uzbekistan'},
	{name:'Vanuatu'},
	{name:'Vatican City'},
	{name:'Venezuela'},
	{name:'Vietnam'},
	{name:'Wallis And Futuna'},
	{name:'Yemen'},
	{name:'Zambia'},
	{name:'Zimbabwe'}
];
console.log("loc "+loc);
if(loc){
for (x in countries)
{
if(loc===countries[x].name)
{return countries[x].name}	
}
for (x in countries)
{
if(loc.indexOf(countries[x].name)>-1)
{return countries[x].name}	
}
}

};

passport.use(new GoogleStrategy({
    clientID: '79902088919-rlb7uk2od7s3337tchn9h32jmo0elo7v.apps.googleusercontent.com',
    clientSecret: 'AChKZobq7KFTCf_jbs7hsxYn',
    callbackURL: "http://www.chessbond.com/auth/google_oauth2/"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }, function (err, user) {
       // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    //var newUser            = new User();
                    console.log(profile);
                    
					User.create({
                    // set all of the facebook information in our user model
                    googleId: profile.id, // set the users facebook id                   
                    googletoken : refreshToken, // we will save the token that facebook provides to the user                    
                    name:profile.displayName,
                    picture:profile.photos[0].value
                                        }).exec( // look at the passport user profile to see how names are returned
                    
                    //facebookemail:  profile.emails[0].value}).exec( // facebook can return multiple emails so we'll take the first
					function (err, records) {
						console.log(err);
					return done(null, records);
					});

                        // if successful, return the new user
                        
                    }
    });
  }
));
   passport.use(new TwitterStrategy({
        consumerKey: 'ovZrQ8rjklukSpUdgyaxIFbM5',
        consumerSecret: "Ldrie1diKTTgQMWEV0AvL8WTa7jEYkaxPECoWbWDowig929PWd",
        callbackURL: 'http://www.chessbond.com/auth/twitter_oauth/'
      },
      function(token, tokenSecret, profile, done) {
        User.findOne({ twitterId: profile.id }, function (err, user) {
            // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
				console.log(profile);
                // if the user is found, then log them in
                if (user) {
					console.log("profile._json.location "+profile._json.location);
					console.log(GetCountry(profile._json.location));
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    //var newUser            = new User();
                    //console.log(profile);
                    
					User.create({
                    // set all of the facebook information in our user model
                    twitterId: profile.id, // set the users facebook id                   
                    twittertoken : token, // we will save the token that facebook provides to the user                    
                    name:profile._json.screen_name,
                    picture:profile._json.profile_image_url,
                    Country:GetCountry(profile.location)
                    }).exec( // look at the passport user profile to see how names are returned
                    
                    //facebookemail:  profile.emails[0].value}).exec( // facebook can return multiple emails so we'll take the first
					function (err, records) {
						console.log(err);
					return done(null, records);
					});

                        // if successful, return the new user
                        
                    }
                 }
     
    )}));

passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        //clientID        : configAuth.facebookAuth.clientID,
        //clientSecret    : configAuth.facebookAuth.clientSecret,
       // callbackURL     : configAuth.facebookAuth.callbackURL
        /*    clientID: '204930219956613',
    clientSecret: '6246902d2ef94f1dbd083fb4946c694b',
    callbackURL: "http://localhost:1337/auth/facebook_oauth2/"
*/
		clientID: '204758053307163',
		clientSecret:'efc1758be36f4bfc488ea18f5680cb60',
		 callbackURL: 'http://www.chessbond.com/auth/facebook_oauth2/',
		 profileFields: ['id', 'displayName', 'photos','email','gender','hometown','locale','location','birthday']
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
 console.log(profile);
            // find the user in the database based on their facebook id
            User.findOne({ 'facebookid' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    //var newUser            = new User();
                   
                    
					User.create({
                    // set all of the facebook information in our user model
                    facebookid: profile.id, // set the users facebook id                   
                    facebooktoken : token, // we will save the token that facebook provides to the user                    
                    facebookname  : profile.name.givenName + ' ' + profile.name.familyName,
                    email:profile._json.email,
                    name:profile.displayName,
                    picture:profile._json.picture.data.url
                    }).exec( // look at the passport user profile to see how names are returned
                    
                    //facebookemail:  profile.emails[0].value}).exec( // facebook can return multiple emails so we'll take the first
					function (err, records) {
						console.log(err);
						
						 if (!records) { return done(null, false,err); }
					return done(null, records);
				
					});

                        // if successful, return the new user
                        
                    }
                }

            );
        });
	}));
        /*
passport.use(new FacebookStrategy({
    clientID: '204930219956613',
    clientSecret: '6246902d2ef94f1dbd083fb4946c694b',
    callbackURL: "http://localhost:1337/auth/facebook_oauth2/"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
*/
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

     if(md5(password)==user.password) {
          
            
          var returnUser = {
            email: user.email,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        }
        else
        {
        return done(null, false, {
              message: 'Invalid Password'
            });
       } 
    });
  }
));