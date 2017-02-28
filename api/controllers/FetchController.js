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

var stringiter;
var imgposcounter=0;
for (stringiter=0;stringiter<totalfile.length;stringiter++)
{
var nextimg=totalfile.indexOf("<img>",stringiter);
if (nextimg>-1)
{stringiter=nextimg;
endofimg=totalfile.indexOf("</img>",stringiter);
imgarray.push(totalfile.substr(stringiter,endofimg));
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
if (splitcount>2000)
{foundaddress=false;}
console.log("splitcount "+splitcount);
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
if (splitcount>2000)
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