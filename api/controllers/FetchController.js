function gitimage(img,num){
	
	var youtubedl = require('youtube-dl');
var url = 'http://www.pornhub.com'+img;
// Optional arguments passed to youtube-dl. 
var options = [];
youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err;
 
  console.log('id:', info.id);
  console.log('title:', info.title);
  console.log('url:', info.url);
  console.log('thumbnail:', info.thumbnail);
  console.log('description:', info.description);
  console.log('filename:', info._filename);
  console.log('format id:', info.format_id);

var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),out;
	var outfilearray=[];

var infilearray=[];


	var infilearray1=new FetchStream(info.thumbnail);
 var outfilearray1 = fs.createWriteStream('assets/'+num+'.jpg');

infilearray1.on('data',function(data) {
	console.log("write img "+num);
   outfilearray1.write(data);
	
});
infilearray1.on('end', function() {
	console.log('closed img '+num);
 outfilearray1.close();
 
	});
	


});
	}

module.exports = {

		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));

var totalfile;
//var infile=new FetchStream("http://jesuits.org/aboutus");
var infile=new FetchStream("http://www.pornhub.com");

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

var imgarray=[];

var stringiter=0;
var imgposcounter=0;
for (stringiter=0;stringiter<totalfile.length;stringiter++)
{
var nextimg=totalfile.indexOf("/view_video",stringiter);
console.log("nextimg "+nextimg);

if (nextimg>-1)
{
console.log("nextimg "+nextimg);
stringiter=nextimg+12;
endofimg=totalfile.indexOf("\"",nextimg);
console.log("endofimg "+endofimg);
imgarray.push(totalfile.substr(nextimg,(endofimg-nextimg)));

	}
	else
	{
	stringiter=totalfile.length+400;	
	}


}

gitimage(imgarray[1],1);

gitimage(imgarray[2],2);

for (xx in imgarray)
{
console.log(imgarray[xx]);
totalfile=totalfile+"<img src='"+xx+".jpg'>";
	
}


var foundaddress=true;
var splitcount=0;
while (foundaddress==true)
{
	splitcount++;
	var index=totalfile.indexOf('\"http');
if (index==-1)
{
	foundaddress=false;
}
else
{
	foundaddress=true;
}

if(foundaddress==true)
{
var left=totalfile.substr(0,index);
var right=totalfile.substr(index,totalfile.length);	
var nextquote=right.indexOf("\"",2);
//console.log("nextquote "+nextquote);
//console.log("right1 "+right);
right=right.substr(nextquote,right.length);
//console.log("right2 "+right);

totalfile=left+"\""+right;	
}
if (splitcount>4000)
{foundaddress=false;}
//console.log("splitcount "+splitcount);
}

 foundaddress=true;
splitcount=0;
while (foundaddress==true)
{
	splitcount++;
	var index=totalfile.indexOf("'http");
if (index==-1)
{
	foundaddress=false;
}
else
{
	foundaddress=true;
}

if(foundaddress==true)
{
var left=totalfile.substr(0,index);
var right=totalfile.substr(index,totalfile.length);	
var nextquote=right.indexOf("'",2);
//console.log("nextquote "+nextquote);
//console.log("right1 "+right);
right=right.substr(nextquote,right.length);
//console.log("right2 "+right);

totalfile=left+"\""+right;	
}
if (splitcount>4000)
{foundaddress=false;}
//console.log("splitcount "+splitcount);
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