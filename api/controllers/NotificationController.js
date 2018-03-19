module.exports = {

		newnotification:function(req,res){
			
	Notification.create({reciever:req.param('reciever'),msg:req.param('msg'),adr:req.param('adr')}).exec(function (err, records) {

	sails.sockets.broadcast(records.reciever,'notification', records);
	
	 return res.ok();
});
	},
	visitnotification:function(req,res){
			
	Notification.destroy({adr:req.param('address')}).exec(function (err, records) {

	
	
	 return res.ok();
});
	}
};