module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));

var totalfile;
var infile=new FetchStream("http://cv.pornhub.phncdn.com/videos/201602/28/69756761/720P_1500K_69756761.mp4?a5dcae8e1adc0bdaed975f0d61fb5e05756dc4acc488d2f9e61ef33953093512602c6cb1feb47dcaf56040fecf3423f3aac7a3fbd23340298897213a433bd94536bf750661503698d71e826cb9a01e490bfc45fda585ecb2cd1bc8b123ed6354c5af2f073ff6f540fd009adc448319b16354b8ca16958dcf75ac");
//var infile = new FetchStream("https://www.pornhub.com/view_video.php?viewkey=ph56d25ba267a91");
var outfile = fs.createWriteStream('assets/go.mp4');
infile.on('data',function(data) {
	
//     console.log(""+data);
     //totalfile=totalfile+""+data;
     outfile.write(data);
});
infile.on('end', function() {
//	console.log('closed');
/*
var start=totalfile.split("<title>");
var end =totalfile.split("</title>");
console.log(start[0]);
console.log(end[1]);

     fs.writeFile("views/myfile.ejs", start[0]+end[1], function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});*/ 
     outfile.close();
});

//out = fs.createWriteStream('views/myfile2.ejs');
//new FetchStream("https://www.pornhub.com/pornstar/vanessa-blue").pipe(out);


	}
};