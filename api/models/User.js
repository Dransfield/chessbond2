/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */
md5=require("MD5");

module.exports = {
ChessPieceTheme:{ type: 'string', unique: false,defaultsTo: 'A' },
Country:{ type: 'string', unique: false,defaultsTo: 'None'},
SoundEnabled:{ type: 'string', unique: false,defaultsTo: 'Sound Enabled'},
ELO:{type:'int',defaultsTo:0},
DifficultyLevelBeaten:{type:'int',defaultsTo:0},
  beforeCreate: function(user, cb) {
    user.password = md5(user.password);
    cb();
  }
};
