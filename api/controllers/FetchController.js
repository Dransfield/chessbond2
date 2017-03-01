function gitimage(img,num,youtubedl){
	
	
var url = 'http://www.xvideos.com'+img;
// Optional arguments passed to youtube-dl. 
var options = [];
if (img.indexOf('.jpg')==-1)
{
youtubedl.getInfo(url, options, function(err, info) {
  if (err) return;

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

if(info.thumbnail){
	var infilearray1=new FetchStream(info.thumbnail);
	//var infilearray1=new FetchStream(img);

 var outfilearray1 = fs.createWriteStream('assets/'+num+'.jpg');

infilearray1.on('data',function(data) {
	console.log("write img "+num);
   outfilearray1.write(data);
	
});
infilearray1.on('end', function() {
	console.log('closed img '+num);
 outfilearray1.close();
 
	});
	
}

});
}
	}

module.exports = {
gitimage:function(req,res){
	
	var youtubedl = require('youtube-dl');
var url = 'http://www.pornhub.com'+req.param('img');
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
 var outfilearray1 = fs.createWriteStream('assets/'+req.param('num')+'.jpg');

infilearray1.on('data',function(data) {
	console.log("write img "+req.param('num'));
   outfilearray1.write(data);
	
});
infilearray1.on('end', function() {
	console.log('closed img '+req.param('num'));
 outfilearray1.close();
 
	});
	


});
	},
		GetFile:function(req,res){
			var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),
    out;
console.log(req.param('adr'));

var totalfile;
//var infile=new FetchStream("http://jesuits.org/aboutus");
//var infile=new FetchStream("http://www.pornhub.com/video/search?search=ebony+teen");
//https://www.chessbond.com/video/search?search=ebony+tittyfuck&page=2
var infile=new FetchStream("http://www.xvideos.com/?k=ebony+pov+blowjob");
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
var nextimg=totalfile.indexOf("/video",stringiter);
console.log("nextimg "+nextimg);

if (nextimg>-1)
{
console.log("nextimg "+nextimg);
stringiter=nextimg+12;
endofimg=totalfile.indexOf("\"",nextimg);
console.log("endofimg "+endofimg);
var subby=totalfile.substr(nextimg,(endofimg-nextimg));
if (subby.indexOf(".jpg")==-1)
{
imgarray.push(subby);
}
	}
	else
	{
	stringiter=totalfile.length+400;	
	}


}


	
var youtubedl = require('youtube-dl');
	/*
	gitimage(imgarray[4],4,youtubedl);

	gitimage(imgarray[6],6,youtubedl);

	gitimage(imgarray[8],8,youtubedl);

	gitimage(imgarray[10],10,youtubedl);


	gitimage(imgarray[12],12,youtubedl);

	gitimage(imgarray[14],14,youtubedl);

	gitimage(imgarray[16],16,youtubedl);

	gitimage(imgarray[18],18,youtubedl);

	gitimage(imgarray[20],20,youtubedl);

	gitimage(imgarray[22],22,youtubedl);

	gitimage(imgarray[24],24,youtubedl);

	gitimage(imgarray[26],26,youtubedl);

	gitimage(imgarray[28],28,youtubedl);

	gitimage(imgarray[30],30,youtubedl);

	gitimage(imgarray[32],32,youtubedl);

	gitimage(imgarray[34],34,youtubedl);

	gitimage(imgarray[36],36,youtubedl);

	gitimage(imgarray[38],38,youtubedl);

	gitimage(imgarray[40],40,youtubedl);

	gitimage(imgarray[42],42,youtubedl);

	gitimage(imgarray[44],44,youtubedl);
*/
var alt=1;
var count=0;
for (xx in imgarray)
{

if(alt==1)
{
	console.log(imgarray[xx]);
totalfile=totalfile+"<img src='"+count+".jpg'>";
totalfile=totalfile+imgarray[xx];
	gitimage(imgarray[xx],count,youtubedl);
alt=0;
count++;
console.log("count "+count);
}
else
{
alt=1;	
}
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