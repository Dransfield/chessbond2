module.exports = {

		newnotification:function(req,res){
			
	notification.create({reciever:req.param('reciever'),msg:req.param('msg'),adr:req.param('adr')}).exec(function (err, records) {
	console.log("send "+JSON.stringify(records)+" to "+records.reciever);
	sails.sockets.broadcast(records.reciever,'notification', records);
	
	 return res.ok();
});
	}
};