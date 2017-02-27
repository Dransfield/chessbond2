module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));
out = fs.createWriteStream('views/myfilebad.ejs');

var totalfile;
var infile = new FetchStream("https://www.pornhub.com/view_video.php?viewkey=ph56d25ba267a91");
var outfile = fs.createWriteStream('views/myfile.ejs');
infile.on('data',function(data) {
	 totalfile=totalfile+data;
     console.log(data);
});
infile.on('close', function() {
	var first=totalfile.split("<title>");
	var outfile=first[0];
    var second=totalfile.split("</title>");
    outfile=outfile+second[1];
    console.log(outfile);
     outfile.write(totalfile);
     outfile.close();
});

//out = fs.createWriteStream('views/myfile2.ejs');
//new FetchStream("https://www.pornhub.com/pornstar/vanessa-blue").pipe(out);


	}
};