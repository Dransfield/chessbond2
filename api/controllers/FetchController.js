module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));

var totalfile;
var infile=new FetchStream("http://jesuits.org/aboutus");
//var infile=new FetchStream("http://www.xvideos.com/?k=vanessa+blue&p=1");
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

totalfile=start[0]+end[1];
var foundaddress=true;
var splitcount=0;
while (foundaddress==true)
{
	splitcount++;
	var index=totalfile.indexOf('http');
if (index==-1)
{
	foundaddress=false;
}
else
{
	foundaddress=true;
}
var start1=	totalfile.split("http:");
if(start1[1])
{
totalfile=start1[0]+start1[1..].split("\"")[1];
}
else
{foundaddress=false;}
console.log("splitcount "+splitcount);
}

     fs.writeFile("views/myfile.ejs", totalfile, function(err) {
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