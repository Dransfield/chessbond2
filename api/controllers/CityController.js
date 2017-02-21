/**
 * CityController
 *
 * @description :: Server-side logic for managing Cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	CreateDatabase:function(req,res){
	City.destroy({}).exec(function(err1,recs){
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('/home/chessbond/chessbond/assets/worldcitiespop.txt');

lr.on('error', function (err) {
	// 'err' contains error object
});

lr.on('line', function (line) {
	// pause emitting of lines...
	lr.pause();
	var myarray=line.split(",");
	City.create({country:myarray[0],name:myarray[1] }).exec(function (err, records) {
	 
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

  
  

	});
}
};

