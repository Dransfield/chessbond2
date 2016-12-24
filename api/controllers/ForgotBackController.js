md5=require("MD5");
module.exports = {
	
	
	SendMail:function(req,res){
		 User.findOne({
      email: req.param('address')
	},function foundUser(err,user){
		if (!err){
		var nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
		var transporter = nodemailer.createTransport('smtps://slenkar@gmail.com:Fuckthisshit@smtp.gmail.com');
	 var code=md5(Date.now()+user.id);
    
    user.passwordcode =code;
    user.save();
    
	var mailOptions = {
    from: '"Prakash" <admin@chessbond.com>', // sender address
    to: req.param('address'), // list of receivers
    subject: 'Forgotten Password', // Subject line
    text: 'Here is your link to reset your password:', // plaintext body
    
    html: "<a href='http://www.chessbond/com/forgot/password/"+code+"'></a>" // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
	});
	
	
	}
});
};
		