module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));
out = fs.createWriteStream('views/myfile.ejs');
new FetchStream("https://www.pornhub.com/video?c=17").pipe(out);
out = fs.createWriteStream('views/myfile2.ejs');
new FetchStream("https://www.pornhub.com/video/search?search=vanessablue").pipe(out);


	}
};