/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  beforeCreate: function(user, cb) {
    user.password = md5(user.password);
    cb();
  }
};
