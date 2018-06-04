/**
 * Chessgame.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
OverallScore:{type:'integer',defaultsTo:0},
capturedBlackpieces:{type:'string',defaultsTo:""},
Result:{type:'string',defaultsTo:""},
capturedWhitepieces:{type:'string',defaultsTo:""},
Player1CategoryELO:{type:'integer',defaultsTo:0},
Player2CategoryELO:{type:'integer',defaultsTo:0},
Player1ELO:{type:'integer',defaultsTo:0},
Player2ELO:{type:'integer',defaultsTo:0},
GameCategory:{type:'string',defaultsTo:0},
tournamentGame:{type:'boolean',defaultsTo:false}
  }
};

