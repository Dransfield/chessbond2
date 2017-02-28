module.exports = {

		Upload:function(req,res){
	
    req.file('avatar').upload({
  dirname: require('path').resolve(sails.config.appPath, 'usrimg/'+req.session.passport.user)
},function (err, uploadedFiles) {
  if (err) return res.negotiate(err);

  return res.json({
    message: uploadedFiles.length + ' file(s) uploaded successfully!'
  });
});
    
		  req.file('avatar').upload({
   
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000
  },function whenDone(err, uploadedFiles) {
    if (err) {
		console.log(err);
      return res.negotiate(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0){
		
      console.log('No file was uploaded');
      return res.badRequest('No file was uploaded');
    }

	Avatar.Create({
		userid:req.session.passport.user,
    // Save the "fd" and the url where the avatar for a user can be accessed
    //User.update(req.session.passport.user, {

      // Generate a unique URL where the avatar can be downloaded.
     // avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.passport.user),

      // Grab the first file and use it's `fd` (file descriptor)
      avatarFd: uploadedFiles[0].fd
    })
    .exec(function (err,ava){
      if (err) {
      console.log("avatar create "+err);
      return res.negotiate(err);
      }
      User.Update({currentavatar:ava.id}).exec(function (err2){
		  if(err2){
      console.log("avatar assign "+err2);
      return res.negotiate(err2);
      }
      return res.ok();
    });
    });
  });
}


/**
 * Download avatar of the user with the specified id
 *
 * (GET /user/avatar/:id)
*/
avatar: function (req, res){

  req.validate({
    id: 'string'
  });
	console.log("avatar function user "+req.param('id'));
  Avatar.findOne(req.param('id')).exec(function (err, ava){
	  if(err) console.log(err);
    if (err) return res.negotiate(err);
    if (!ava) console.log("avatar not found");
    if (!ava) return res.notFound();

    // User has no avatar image uploaded.
    // (should have never have hit this endpoint and used the default image)
    if (!ava.avatarFd) {
		console.log("image not found");
      return res.notFound();
    }

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

 
    fileAdapter.read(ava.avatarFd)
    .on('error', function (err){
      return res.serverError(err);
    })
    .pipe(res);
  });
}

};