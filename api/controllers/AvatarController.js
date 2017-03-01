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
		return res.ok();
	}
};

