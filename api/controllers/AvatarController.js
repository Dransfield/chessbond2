/**
 * AvatarController
 *
 * @description :: Server-side logic for managing avatars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	deletepic:function(req,res)
	{
	fs=require('fs');
		
		Avatar.destroy({id:req.param('picid')}).exec
	(function(err){
		if (err) {
  console.log(err);
		}});
		fs.unlinkSync(req.param('adr'));
		return res.json({id:req.param('picid')});
	}
};

