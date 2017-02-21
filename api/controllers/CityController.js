/**
 * CityController
 *
 * @description :: Server-side logic for managing Cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	CreateDatabase:function(req,res){
		var fs = require('fs');
		fs.readdir("/", function(err,files){
			
			console.log("about to read files");
			console.log(files)});
	/*
		var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('/worldcitiespop.txt')
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
});*/
	}
};

