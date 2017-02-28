module.exports = {

		Upload:function(req,res){
			 console.log("user "+req.session.passport.user);
    console.log(req.param('avatar'));
    console.log("req.file1 "+JSON.stringify(req.file));
    
    
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

	
    // Save the "fd" and the url where the avatar for a user can be accessed
    User.update(req.session.passport.user, {

      // Generate a unique URL where the avatar can be downloaded.
      avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.passport.user),

      // Grab the first file and use it's `fd` (file descriptor)
      avatarFd: uploadedFiles[0].fd
    })
    .exec(function (err){
      if (err) 
      console.log("user update error "+err);
      return res.negotiate(err);
      return res.ok();
    });
  });
},


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
  User.findOne(req.param('id')).exec(function (err, user){
	  if(err) console.log(err);
    if (err) return res.negotiate(err);
    if (!user) console.log("user not found");
    if (!user) return res.notFound();

    // User has no avatar image uploaded.
    // (should have never have hit this endpoint and used the default image)
    if (!user.avatarFd) {
		console.log("image not found");
      return res.notFound();
    }

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // set the filename to the same file as the user uploaded
    //res.set("Content-disposition", "attachment; filename='" + file.name + "'");

    // Stream the file down
    fileAdapter.read(user.avatarFd)
    .on('error', function (err){
      return res.serverError(err);
    })
    .pipe(res);
  });
}

};