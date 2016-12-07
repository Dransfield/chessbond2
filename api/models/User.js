/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */
md5=require("MD5");

module.exports = {

  beforeCreate: function(user, cb) {
    user.password = md5(user.password);
    cb();
  }
};
