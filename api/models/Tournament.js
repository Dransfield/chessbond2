/**
 * Album.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: 
  {
players:{type:'integer',defaultsTo:0},
activated:{type:'boolean',defaultsTo:false},
result:{type:'string',defaultsTo:""},
currentlyPlaying:{type:'boolean',defaultsTo:false},
currentTime:{type:'integer',defaultsTo:0}
}

};

