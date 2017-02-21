/**
 * CityController
 *
 * @description :: Server-side logic for managing Cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	CreateDatabase:function(req,res){
		//var fs = require('fs');
		/*fs.readdir("/home/chessbond/chessbond/assets", function(err,files){
			
			console.log("about to read files");
			console.log(files)});
	}*/
	//var stream=fs.ReadStream('/home/chessbond/chessbond/assets/readthis.txt', {start: 0, end: 99});
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('/home/chessbond/chessbond/assets/readthis.txt');

lr.on('error', function (err) {
	// 'err' contains error object
});

lr.on('line', function (line) {
	// pause emitting of lines...
	lr.pause();
	City.create({country:line[0],name:line[1] }).exec(function (err, records) {
	 
	});
	// ...do your asynchronous line processing..
	setTimeout(function () {

		// ...and continue emitting lines.
		lr.resume();
	}, 100);
});

lr.on('end', function () {
	// All lines are read, file is closed now.
});

  
  
});*/
	
};

