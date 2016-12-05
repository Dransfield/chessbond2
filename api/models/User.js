/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({
    OnHomePage:
    {
      type: 'string',
      defaultsTo: 'false'
    },
     SoundEnabled: {
      type: 'string',
      defaultsTo: 'true'
    }
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
