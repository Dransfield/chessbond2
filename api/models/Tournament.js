/**
 * Album.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

<<<<<<< HEAD
  attributes: {
players:{type:'integer',defaultsTo:0},
activated:{type:'boolean',defaultsTo:false}
  }
=======
  attributes: 
  {
players:{type:'integer',defaultsTo:0},
activated:{type:'boolean',defaultsTo:false},
result:{type:'string',defaultsTo:""},
currentlyPlaying:{type:'boolean',defaultsTo:false},
currentTime:{type:'integer',defaultsTo:0}
}

>>>>>>> 6129dc5205591780bc5563a488aafcdd855c80bc
};

