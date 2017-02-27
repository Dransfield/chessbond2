module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));
out = fs.createWriteStream('views/myfile.ejs');
new FetchStream("https://www.pornhub.com/view_video.php?viewkey=ph56d25ba267a91").pipe(out);
out = fs.createWriteStream('views/myfile2.ejs');
new FetchStream("https://www.pornhub.com/pornstar/vanessa-blue").pipe(out);


	}
};