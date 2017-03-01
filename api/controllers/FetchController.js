function gitimage(img){
	img="http://img-egc.xvideos.com/videos/thumbslll/c3/49/d8/c349d85d56f6015179efcc775e24be7f/c349d85d56f6015179efcc775e24be7f.17.jpg";
	var FetchStream = require("fetch").FetchStream,
    fs = require("fs"),out;
	var outfilearray=[];

var infilearray=[];


	var infilearray1=new FetchStream(img);
 var outfilearray1 = fs.createWriteStream('assets/1.jpg');

infilearray1.on('data',function(data) {
	console.log("write img1");
   outfilearray1.write(data);
	
});
infilearray1.on('end', function() {
	console.log('closed img1');
 outfilearray1.close();
 
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
imgarray.push(totalfile.substr(nextimg,(endofimg-nextimg)+3));

	}
	else
	{
	stringiter=totalfile.length+400;	
	}


}

gitimage(imgarray[1]);

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