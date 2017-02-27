module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;

out = fs.createWriteStream('file.html');
new FetchStream("http://www.example.com/index.php").pipe(out);
	}
};