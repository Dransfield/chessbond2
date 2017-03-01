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
		fs.unlinkSync(req.param('adr'));
		Avatar.destroy({id:req.param('picid')}).exec
	(function(err){
		if (err) {
  console.log(err);
		}});
		
		return res.ok();
	}
};

