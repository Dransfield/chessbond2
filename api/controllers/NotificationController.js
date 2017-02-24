module.exports = {

		newnotificaiton:function(req,res){
			
	notification.create({reciever:req.param('reciever'),msg:req.param('msg'),adr:req.param('adr')}.exec(function (err, records) {
	sails.sockets.broadcast(records.reciever,'notification', records);
	
	 return res.ok();
});
	}
};