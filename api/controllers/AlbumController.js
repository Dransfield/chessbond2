/**
 * AlbumController
 *
 * @description :: Server-side logic for managing albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	makenew:function(req,res){
		Album.create({name:req.param('name'),user:req.param('user')}).exec(function (err, album){
  if (err) { return res.serverError(err); }

  //sails.log('Finn\'s id is:', album.id);
  	sails.sockets.broadcast(req.param('user'),'madealbum', {id:album.id,name:album.name});

  return res.ok();
});
		//console.log(req.param('user')+" is "+req.param('idlestatus'));
	//sails.sockets.broadcast(req.param('followed'),'FollowStarted', {user:req.param('follower'),id:req.param('id')});
	
	}
};

