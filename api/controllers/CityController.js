/**
 * CityController
 *
 * @description :: Server-side logic for managing Cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	CreateDatabase:function(req,res){
		var fs = require('fs');
		fs.readdir("/home/chessbond/chessbond/assets", function(err,files){
			
			console.log("about to read files");
			console.log(files)});
	var stream=fs.ReadStream('/home/chessbond/chessbond/assets/readthis.txt', {start: 90, end: 99});

stream.on('readable', function() {
    var data = stream.read();
    console.log(data);
});
 
stream.on('end', function() {
    console.log("THE END");
});
		/*var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('/home/chessbond/chessbond/assets/worldcitiespop.txt')
});

lineReader.on('line', function (line) {
  //console.log('Line from file:', line);
  var myarray=line.split(",");
  lineReader.pause();
  City.create({country:myarray[0],city:myarray[1] }).exec(function (err, records) {
	lineReader.resume();
	 
	});
  
});*/
	}
};

