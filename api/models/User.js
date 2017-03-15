/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */
md5=require("MD5");

module.exports = {
	 attributes: {
ChessPieceTheme:{ type: 'string', unique: false,defaultsTo: 'A' },
BoardTheme:{type:'string',unique:false,defaultsTo: "uscf"},
Country:{ type: 'string', unique: false,defaultsTo: 'None'},
SoundEnabled:{ type: 'string', unique: false,defaultsTo: 'Sound Enabled'},
ELO:{type:'integer',defaultsTo:1200},
DifficultyLevelBeaten:{type:'integer',defaultsTo:0},
BoardSize:{type:'integer',defaultsTo:300},
  SoundVolume:{type:'integer',defaultsTo:5},
   ProfileViews:{type:'integer',defaultsTo:0},
   Numberoftimesloggedin:{type:'integer',defaultsTo:0},
   Gender:{type:'string',defaultsTo:""},
   BirthMonth:{type:'string',defaultsTo:""},
   BirthYear:{type:'string',defaultsTo:""},
   BirthDay:{type:'string',defaultsTo:""},
   
   Lastlogin:{type:'string',defaultsTo:""},
   CurrentCity:{type:'string',defaultsTo:""},
   FideTitle:{type:'string',defaultsTo:""},
   ValidFideID:{type:'integer',defaultsTo:0},
   FideRatings:{type:'integer',defaultsTo:0}

},
  beforeCreate: function(user, cb) {
    user.password = md5(user.password);
    cb();
  }
};
