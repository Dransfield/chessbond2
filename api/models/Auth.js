/**
 * Auth
 *
 * @module      :: Model
 * @description :: Holds all authentication methods for a User
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.auth.attributes({
    
    /* e.g
    nickname: 'string'
    */
      firstName: 'string',
        lastName: 'string',
        gender: 'string',
        timezone: 'number',
        Picture:'string',
        Cover:'string',
        location:'string',
        profile_image_url:'string'
  }),
  
  beforeCreate: require('waterlock').models.auth.beforeCreate,
  beforeUpdate: require('waterlock').models.auth.beforeUpdate
};
