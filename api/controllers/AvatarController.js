/**
 * AvatarController
 *
 * @description :: Server-side logic for managing avatars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	blockpic:function(req,res)
	{
			Avatar.update(req.param('picid'),{blocked:true}).exec
	(function(err,deletedRecords){
		if (err) {
  console.log(err);
		}
		else
		{console.log(deletedRecords);}
		}
		);
	
		return res.json({id:req.param('picid')});
		
	},
		unblockpic:function(req,res)
	{
			Avatar.update(req.param('picid'),{blocked:false}).exec
	(function(err,deletedRecords){
		if (err) {
  console.log(err);
		}
		else
		{console.log(deletedRecords);}
		}
		);
	
		return res.json({id:req.param('picid')});
		
	},
	deletepic:function(req,res)
	{
	fs=require('fs');
		
		Avatar.destroy({id:req.param('picid')}).exec
	(function(err,deletedRecords){
		if (err) {
  console.log(err);
		}
		else
		{console.log(deletedRecords);}
		});
		fs.unlinkSync(req.param('adr'));
		return res.json({id:req.param('picid')});
	}
};

