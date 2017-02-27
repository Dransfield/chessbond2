module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;

out = fs.createWriteStream('assets/file.html');
new FetchStream(req.param('adr')).pipe(out);
	}
};