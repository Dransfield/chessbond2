module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));
out = fs.createWriteStream('views/myfile.ejs');
new FetchStream("https://www.chessbond.com/video?c=17").pipe(out);
	}
};