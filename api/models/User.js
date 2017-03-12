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
ELO:{type:'int',defaultsTo:1200},
DifficultyLevelBeaten:{type:'int',defaultsTo:0},
BoardSize:{type:'int',defaultsTo:300},
  SoundVolume:{type:'int',defaultsTo:5},
   ProfileViews:{type:'int',defaultsTo:0},
   Numberoftimesloggedin:{type:'int',defaultsTo:0},
   Gender:{type:'string',defaultsTo:""},
   BirthMonth:{type:'string',defaultsTo:""},
   BirthYear:{type:'string',defaultsTo:""},
   BirthDay:{type:'string',defaultsTo:""},
   
   Lastlogin:{type:'string',defaultsTo:""},
   CurrentCity:{type:'string',defaultsTo:""},
   FideTitle:{type:'string',defaultsTo:""},
   ValidFideID:{type:'string',defaultsTo:""},
   FideRatings:{type:'string',defaultsTo:""},
  beforeCreate: function(user, cb) {
    user.password = md5(user.password);
    cb();
  }
}
};
