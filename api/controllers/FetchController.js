module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));

var totalfile;
//var infile=new FetchStream("http://www.xvideos.com/?k=vanessa+blue");
var infile=new FetchStream("http://www.xvideos.com/video379714/ebony_milf_vanessa_jammed_in_her_twat");
//var infile = new FetchStream("https://www.pornhub.com/view_video.php?viewkey=ph56d25ba267a91");
var outfile = fs.createWriteStream('views/myfile.ejs');
infile.on('data',function(data) {
	
//     console.log(""+data);
     totalfile=totalfile+""+data;
     outfile.write(data);
});
infile.on('end', function() {
//	console.log('closed');

var start=totalfile.split("<title>");
var end =totalfile.split("</title>");
console.log(start[0]);
console.log(end[1]);

     fs.writeFile("views/myfile.ejs", start[0]+end[1], function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
     outfile.close();
});

//out = fs.createWriteStream('views/myfile2.ejs');
//new FetchStream("https://www.pornhub.com/pornstar/vanessa-blue").pipe(out);


	}
};