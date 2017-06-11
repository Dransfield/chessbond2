var ButtonNumber=0;
var UserNamesPrinted={};
var DropDowns={};
var Navbar={};
var rematchSeconds;
var recentGameIndex=0;
var recentGamesToShow=20;
var lastChatMessagePostedBy="";

function showRematchButton()
{

	io.socket.on('newmygameevent', function (data)
			{
		$(location).attr('href', '/humanvshumannew/'+data.id);

			});

	io.socket.on('rematch',function (data)
			{

			console.log("recieved rematch");
			var nam="";
				if (GamePlaying.Player1=data.content)
				{nam=GamePlaying.Player1Name;}
				if (GamePlaying.Player2=data.content)
				{nam=GamePlaying.Player2Name;}

			var but=showButton($("body"),nam+" wants a rematch","KgreenElement KhugeButton");
			but.css("position","fixed");
			but.css("top","10%");
			});

	var Rematchbutton=showButton($("body"),"Rematch?","KgreenElement KhugeButton");
	var timerspan=addSpan(Rematchbutton,"rematchTimer");
	Rematchbutton.css("position","fixed");
	Rematchbutton.css("top","50%");
	rematchSeconds=30;

	Rematchbutton.click(function(){

		if(GamePlaying.Player!=GamePlaying.Player2)
		{
			//io.socket.put('/WantRematch',{me:MyID,gam:GamePlaying.id,p1color:GamePlaying.Player1Color,gametype:GamePlaying.GameType,gamecat:GamePlaying.GameCategory,gametime:GamePlaying.Player1TimeLimit},
			io.socket.put('/WantRematch',{me:MyID,msg:GamePlaying.Result,gam:GamePlaying.id},

			function (resData, jwr) {
			Rematchbutton.slideUp();
			/*
			if (!resData.opponentWantsRematch)
			{
			var Waitingbutton=showButton($("body"),"Waiting for response","KgreenElement KhugeButton");
			Waitingbutton.css("position","fixed");
			Waitingbutton.css("top","50%");
			var waitingspan=addSpan(Waitingbutton,"waitingTimer");
			setInterval(function(){
				rematchSeconds=rematchSeconds-1;
				$("#waitingTimer").html(rematchSeconds);
				if(rematchSeconds==0)
				{Waitingbutton.slideUp();}
			},1000);
			}
			*/
			});

		}

		if(GamePlaying.Player1==GamePlaying.Player2)
		{
			console.log("player 1 is player 2");
		/*io.socket.put('/newopengame', { GameType:GamePlaying.GameType,GameCategory:GamePlaying.GameCategory,TimeLimit:GamePlaying.GameCategory.split("|")[0],ExtraTimeLimit:GamePlaying.GameCategory.split("|")[1],Player1Color:GamePlaying.Player1Color,Player1:GamePlaying.Player1,Player1Name:Accounts[GamePlaying.Player1].name },
    function (resData, jwr) {
		console.log(resData);
		var data=(resData);
		console.log(data);
      // Refresh the page now that we've been logged in.
      //window.location.reload(true);
      var iter=0;
		io.socket.put('/joingame',
		{
			GameID:data.id,
			PlayerID:data.Player1,
			//PlayerName:PlayerName,
			PlayerColor:data.Player1Color,
			MyID:MyID,
			//MyName:MyName,
			GameType:data.GameType,
			GameCategory:data.GameCategory,
			Player1TimeLimit:data.TimeLimit*60,
			Player2TimeLimit:data.TimeLimit*60
		}

		,function(resData2,jwres2)
		{

			//console.log(JSON.parse(resData).id);

			io.socket.put('/deleteopengame', { gameid:data.id},function  (data2,jwres)
			{




			});
				$(location).attr('href', '/humanvshumannew/'+resData2.id);

		}
		);

    });*/

		}

	});

	setInterval(function(){
		rematchSeconds=rematchSeconds-1;
		$("#rematchTimer").html(rematchSeconds);
		if(rematchSeconds==0)
		{Rematchbutton.slideUp();}
	},1000);

}

function phraseforloggedindate(dat)
		{
			//console.log("nu "+nu);
			var nu=Date.parse(dat);
			console.log(nu);
			//console.log(console.log(nu));

			var n = Date.now();
			var newnum=n-nu;
			console.log('newnum '+newnum);
			var millisecondsinaday=(24*(60*(60*(1000))));
			console.log("millisecondsinaday "+millisecondsinaday);
			if (newnum<millisecondsinaday)
			{

				newnum=newnum/1000;
				console.log("newnum after 1000 "+newnum);
		if (newnum<60)
		{
		if (newnum<0)
		{newnum=0;}
		phrase=parseInt(newnum)+" seconds ago";
		}
		else
		{
		newnum=newnum/60;
		console.log("newnum after  60"+newnum);
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes ago";
		}
		else
		{
		newnum=newnum/60;
		console.log("newnum after another 60"+newnum);
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" hours ago";
		}
		else
		{
			console.log("newnum after  24 "+newnum);
		newnum=newnum/24;

		phrase=parseInt(newnum)+" days ago";

		}

		}

		}
		return phrase;
			}
			else
			{
				var nu=new Date(dat);
			var month = nu.getUTCMonth() + 1; //months from 1-12
			var day = nu.getUTCDate();
			var year = nu.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
			return newdate;
			}
		}


	function phrasefordate(dat)
			{
			var nu=Date.parse(dat);
			//console.log("nu "+nu);
		var n = Date.now();

		var newnum=n-nu;
		newnum=newnum/1000;
		if (newnum<60)
		{
		if (newnum<0)
		{newnum=0;}
		phrase=parseInt(newnum)+" seconds ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" hours ago";
		}
		else
		{
		newnum=newnum/24;

		phrase=parseInt(newnum)+" days ago";

		}

		}

		}
		return phrase;
	}


var gamecategories=[{time:1,extratime:0},
					{time:2,extratime:0},
					{time:3,extratime:0},
					{time:4,extratime:0},
					{time:5,extratime:0},
					{time:6,extratime:0},
					{time:7,extratime:0},
					{time:8,extratime:0},
					{time:9,extratime:0},
					{time:10,extratime:0},
					{time:15,extratime:0},
					{time:20,extratime:0},
					{time:30,extratime:0},
					{time:60,extratime:0},
					{time:2,extratime:1},
					{time:3,extratime:1},
					{time:5,extratime:2},
					{time:10,extratime:5},
					{time:15,extratime:5},
					{time:20,extratime:10},
					{time:30,extratime:10},
					{time:60,extratime:10}];

function showPersonLeft(elem,prsn)
{

	newdiv=$("<div style='background-color:red;overflow:visible;padding:4px;'></div>");
	elem.append(newdiv);
	showUsername(newdiv,prsn);
	newdiv.append("<span> has left the chat by closing their chat window</span>");
	elem.append("<hr>");
	elem.scrollTop(elem[0].scrollHeight);

}
function addFlexDiv(elem,id,direction,wrap='nowrap',jcontent='space-around',aItems='center')
{
	var flex=$("<div id='"+id+"' style='display:flex;flex-direction:"+direction+";flex-wrap:"+wrap+";justify-content:"+jcontent+";align-items:"+aItems+";'></div>")
	elem.append(flex);
	return flex;

}
function addDiv(elem)
{
	var flex=$("<div></div>")
	elem.append(flex);
	return flex;


}
function addSpan(elem,id)
{
	var flex=$("<span id='"+id+"'></span>")
	elem.append(flex);
	return flex;


}
function showFlag(elem,usracc)
{
if(Accounts[usracc])
{
			var flagimage=$("<img data-toggle='tooltip' title='' class='countryflag' src=''></img>");

			if(Accounts[usracc]['Country'])
			{
			flagimage.attr("src","/images/flatflags/"+countryToFilename(Accounts[usracc]['Country'])+".png");


			}
			elem.append(flagimage);
			return flagimage;
}
	}
function showHeader(elem,num,content)
{
elem.append("<h"+num+">"+content+"</h"+num+">");

}
function showWebsiteNameJumbo(elem)
{
	 var header=$("<h1></h1>");
      elem.append(header);
	header.append("Chessbond");
}
function showUsernameJumbo(elem,usracc)
{
	//var jum=$("<span class='jumbotron'><span>");
      var header=$("<h2 style='word-wrap:break-word;'></h2>");
     // jum.append(header);
      showUsername(header,usracc);
	elem.append(header);
}
function showImageUploadForm(elem,usracc)
{
	elem.append(`
<form action="/uploadavatar" enctype="multipart/form-data" method="post">
    <input type="file" name="avatar" multiple="multiple"><br>
    <input type="submit" value="Upload">
    </form>`);

}
function showChatMessage(elem,msg,Replyto,allowreplies,deletebutton=false)
{

	var myColumn=addFlexDiv(elem,45,"column");
	//console.log("msg.replyto "+msg.replyto);

	if (msg.replyto==Replyto)
	{

	var postHeaderDiv;

	if(msg.sender==MyID)
	{
		postHeaderDiv=$("<div  style='display:flex;flex-wrap:wrap;background-color:lightgrey;padding:4px;'></div>");
	}
	else
	{
		postHeaderDiv=$("<div  style='display:flex;flex-wrap:wrap;background-color:lightgreen;padding:4px;'></div>");

	}
	//console.log("show chat message "+JSON.stringify(msg));
	//console.log("sender "+msg.sender);
	//overallDiv.append(newdiv);
	var dateObj=new Date(msg.createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var hour=dateObj.getUTCHours();
			var minute=dateObj.getUTCMinutes();
	if(minute<10)
	{minute="0"+minute;}
	
	if (lastChatMessagePostedBy!=msg.sender)
	{
	
	showsmallAvatar(postHeaderDiv,msg.sender);

	postHeaderDiv.append("<span style='border-style:solid'>");
	postHeaderDiv.append("<span style='width:5px'></span>");
	showUsername(postHeaderDiv,msg.sender);
	postHeaderDiv.append("<span style='width:20px'></span>");
	}
	lastChatMessagePostedBy=msg.sender;
	postHeaderDiv.append("<span>Posted On:"+month+"/"+day+"/"+year+"</span>");
	postHeaderDiv.append("<span style='width:30px'></span>");

	postHeaderDiv.append("<span>"+hour+":"+minute+"</span>");

	if(deletebutton)
	{var delbut=showButton(postHeaderDiv,"X","KredElement KregularButton");
		delbut.click(function(){
		$("#"+msg.id).hide();
		io.socket.put('/wallpost/destroy',{id:msg.id},
				function  (data){
				});

		for(iter in WallPosts)
			{

			if(WallPosts[iter].replyto==msg.id)
			{
				console.log("should hide "+WallPosts[iter].id);
			$("#"+WallPosts[iter].id).hide();
			io.socket.put('/wallpost/destroy',{id:WallPosts[iter].id},
				function  (data){
				});
			}

			}

		});

		}


	var blockbut=showButton(postHeaderDiv,"Block","KredElement KregularButton");
	blockbut.attr("id","blockbutton"+msg.sender);
	blockbut.click({usracc:msg.sender},clickBlock);


	var reportbut=showButton(postHeaderDiv,"Report","KredElement KregularButton");
	reportbut.attr("id","reportbutton"+msg.sender);
	reportbut.click(
	function(){
		rform.slideToggle();
		});

		var rform=showReportForm(elem,msg.id);
		rform.hide();

	postHeaderDiv.append("</span>");

	myColumn.append(postHeaderDiv);

	var nextdiv=addFlexDiv(myColumn,34,"row","wrap","space-around","center");
	nextdiv.attr("id","msgcontent"+msg.id);
	nextdiv.css("border-style","solid");
	nextdiv.css("padding","5px");
	nextdiv.append(msg.content);
	nextdiv.css("width",postHeaderDiv.width());

	if(Blocks[msg.sender])
	{nextdiv.slideUp();
		blockbut.text("UnBlock");
		}

		if(allowreplies){
			var butdiv=addFlexDiv(elem,34,"row","wrap","space-around","center");

			var but=showButton(butdiv,"Reply","KgreenElement KregularButton");
		var rplto;
		console.log("msg.replyto "+msg.replyto);
		if(msg.replyto=="none")
		{rplto=msg.id;}
		else
		{rplto=msg.replyto;}
		var form=showChatForm(elem,msg.groupid,msg.messagetype,rplto);
		form.hide();
		but.click(function()
		{form.slideToggle();});
		elem.css("border-bottom-style","solid");
		}
		else
		{
		//postHeaderDiv.css("align-items","flex-end");
		//nextdiv.css("align-items","flex-end");

		}

		for(iter in WallPosts)
						{
							if(WallPosts[iter].replyto==msg.id)
							{
							var replydiv=addFlexDiv(elem,WallPosts[iter].id,"column");
						replydiv.css("padding-left","20%");
						var del=false;
					if(MyID==ProfID)
					{del=true;}
						showChatMessage(replydiv,WallPosts[iter],msg.id,true,del);
					}
						}

//elem.append("<hr>");

	}

}

function showLatestImagesForm(elem)
{

	var	imageDiv=addDiv(elem);
	imageDiv.attr("class","imageGrid");

	var complaintTitle=addSpan(imageDiv,"");
	complaintTitle.append("Image");
	complaintTitle.attr("class","gridTitle");

	complaintTitle=addSpan(imageDiv,"");
	complaintTitle.append("Uploader");
	complaintTitle.attr("class","gridTitle");

		for (iter in UploadedImages)
		{
		var img=$("<img src='https://www.chessbond.com/user/avatar/"+UploadedImages[iter].id+"'>");
		img.attr("class","greyGridCell");
		img.css("width","100%");
		imageDiv.append(img);
		if (UploadedImages[iter].blocked==true)
		{
		img.append("Blocked");
		}
		var columnFlex=addFlexDiv(imageDiv,"","column");
		var spa=addSpan(columnFlex);
		spa.append("User:");
		if(Accounts[UploadedImages[iter].user])
			{
			spa.append(Accounts[UploadedImages[iter].user].name);
			}
			else
			{
			spa.append("deleted account");
			}
				var dateObj=new Date(UploadedImages[iter].createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var hour=dateObj.getUTCHours();
			var minute=dateObj.getUTCMinutes();
			if (minute<10)
			{minute="0"+minute;}
			cellspan=addSpan(columnFlex,"");

		cellspan.append("Uploaded:"+day+"/"+month+"/"+year+"   "+hour+":"+minute);

		var blocbut;
		if(UploadedImages[iter].blocked==true)
		{
		blocbut=showButton(columnFlex,"UnBlock Image From Website","KgreenElement KregularButton");
		}
		else
		{
		blocbut=showButton(columnFlex,"Block Image From Website","KgreenElement KregularButton");
		}

		blocbut.click({but:blocbut,coll1:columnFlex,coll2:img,imgid:UploadedImages[iter].id,imgloc:UploadedImages[iter].avatarFd},blockAvatar);

		var delbut=showButton(columnFlex,"Delete Image and Delete Database Record","KgreenElement KregularButton");
		delbut.click({coll1:columnFlex,coll2:img,imgid:UploadedImages[iter].id,imgloc:UploadedImages[iter].avatarFd},deleteAvatar);

		}




		return imageDiv;
}

function inputKeypress(e)
{
	 var key = e.which;
	 if(key == 13)  // the enter key code
  { e.preventDefault();
	  return 1;
  }
}

function showBanWordsForm(elem)
{

	var  banwordDiv=addDiv(elem);
	var banwordform=$("<input type='text' autocomplete='off' class='form-control' placeholder='enter a banned word' name='name' >");
		var banwordbutton=$("<button id='postbutton' class='btn btn-default btn-sm' type='submit' >Submit Banned Word</button>");
		banwordDiv.append(banwordform);
		banwordDiv.append(banwordbutton);
		banwordform.keypress(
		function (e) {
		if (inputKeypress(e)==1)
		{
	 
		 	sendBannedWord(banwordform.val(),imageDiv);
		 	banwordform.val("");
		}
		});
		banwordbutton.click(function(){
			sendBannedWord(banwordform.val(),imageDiv);
			banwordform.val("");
			});


			var	imageDiv=addDiv(banwordDiv);
	imageDiv.attr("class","imageGrid");

	var complaintTitle=addSpan(imageDiv,"");
	complaintTitle.append("Word");
	complaintTitle.attr("class","gridTitle");

	complaintTitle=addSpan(imageDiv,"");
	complaintTitle.append("Buttons");
	complaintTitle.attr("class","gridTitle");

		for (iter in BannedWords)
		{
		addBannedWord(BannedWords[iter],imageDiv);
		}

	return banwordDiv;

}

function addBannedWord(theWord,elem)
{
var wrd=$("<span>"+theWord.word+"</span>");
		wrd.attr("class","greyGridCell");

		elem.append(wrd);

		var columnFlex=addFlexDiv(elem,"","column");
		var spa=addSpan(columnFlex);

				var dateObj=new Date(theWord.createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var hour=dateObj.getUTCHours();
			var minute=dateObj.getUTCMinutes();
			if (minute<10)
			{minute="0"+minute;}
			cellspan=addSpan(columnFlex,"");

		cellspan.append("Created:"+day+"/"+month+"/"+year+"   "+hour+":"+minute);



		var delbut=showButton(columnFlex,"Delete Banned Word","KgreenElement KregularButton");
		delbut.click({coll1:columnFlex,coll2:wrd,wrdid:theWord.id},deleteBannedWord);

}

function deleteBannedWord(event)
{

io.socket.put('/bannedword/destroy/'+event.data.wrdid,{},	function  (data){
				console.log(data);
				});
		event.data.coll1.slideUp();
		event.data.coll2.slideUp();
}

function sendBannedWord(wrd,elem)
{
	io.socket.post("/bannedword",{word:wrd},
	 function (resData, jwr) {
	 toastr.success("Added Banned Word!");
	 addBannedWord(resData,elem);
	 });
}

function showAdminReportForm(elem)
{
	var	reportDiv=addDiv(elem);
	reportDiv.attr("class","reportGrid");
	var complaintTitle=addSpan(reportDiv,"");
	complaintTitle.append("Complaint");
	complaintTitle.attr("class","gridTitle");
	complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Reporter");
	complaintTitle.attr("class","gridTitle");
		complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Message");
	complaintTitle.attr("class","gridTitle");
		complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Message Writer");
	complaintTitle.attr("class","gridTitle");
		complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Report Recieved");
	complaintTitle.attr("class","gridTitle");
	complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Ban Duration");
	complaintTitle.attr("class","gridTitle");
complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Your banning buttons Sir");
	complaintTitle.attr("class","gridTitle");

	for (x in Reports)
		{
		var cellspan=addSpan(reportDiv,"");
		cellspan.append(Reports[x].complaint);
		cellspan.attr("class","greyGridCell");
		cellspan=addSpan(reportDiv,"");
		cellspan.append(Accounts[Reports[x].reporter].name);
		cellspan.attr("class","greyGridCell");

		cellspan=addSpan(reportDiv,"");
		cellspan.attr("class","greyGridCell");

		if(WallPosts[Reports[x].msgID])
		{
		cellspan.append(WallPosts[Reports[x].msgID].content);
		}

		cellspan=addSpan(reportDiv,"");
		cellspan.attr("class","greyGridCell");

		if(WallPosts[Reports[x].msgID])
		{
		cellspan.append(Accounts[WallPosts[Reports[x].msgID].sender].name);
		}

		var dateObj=new Date(Reports[x].createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var hour=dateObj.getUTCHours();
			var minute=dateObj.getUTCMinutes();
			if (minute<10)
			{minute="0"+minute;}
			cellspan=addSpan(reportDiv,"");
		cellspan.attr("class","greyGridCell");
		cellspan.append(day+"/"+month+"/"+year+"   "+hour+":"+minute);

		var optionnames=["Day","Week","Month"];
			var oneDay = 24*60*60*1000;
			var optionvalues=[oneDay,oneDay*7,oneDay*30];
		var dursel=showSelect(reportDiv,optionnames,optionvalues,"Duration");

		if(WallPosts[Reports[x].msgID]){


		if(!Accounts[WallPosts[Reports[x].msgID].sender].tempBan)
		{

		var banBut=showButton(reportDiv,"Temporary ban","KcyanElement KregularButton");
		console.log(WallPosts[Reports[x].msgID].sender);
		console.log(WallPosts[Reports[x].msgID].content);

		banBut.click({dur:dursel,usr:WallPosts[Reports[x].msgID].sender,but:banBut},banUser);
		}
		else
		{

		var banBut=showButton(reportDiv,"Unban","KcyanElement KregularButton");
		console.log(WallPosts[Reports[x].msgID].sender);
		console.log(WallPosts[Reports[x].msgID].content);

		banBut.click({dur:dursel,usr:WallPosts[Reports[x].msgID].sender,but:banBut},banUser);
		}


		}
		else
		{
		cellspan=addSpan(reportDiv,"");
		cellspan.attr("class","greyGridCell");
		}



		}

		return reportDiv;
}

function blockAvatar(event)
{
	if(UploadedImages[event.data.imgid].blocked==false)
	{
io.socket.put('/blockavatar',{picid:event.data.imgid,adr:event.data.imgloc},	function  (data){
				console.log(data);
				toastr.success("Image Blocked");
				UploadedImages[event.data.imgid].blocked=true;
				event.data.but.html('UnBlock Image');
				});
	}
	else
	{
io.socket.put('/unblockavatar',{picid:event.data.imgid,adr:event.data.imgloc},	function  (data){
				console.log(data);
				toastr.success("Image UnBlocked");
				UploadedImages[event.data.imgid].blocked=false;
				event.data.but.html('Block Image');

				});
	}

	//	event.data.coll1.slideUp();
		//event.data.coll2.slideUp();
}

function deleteAvatar(event)
{

io.socket.put('/deleteavatar',{picid:event.data.imgid,adr:event.data.imgloc},	function  (data){
				console.log(data);
				});
		event.data.coll1.slideUp();
		event.data.coll2.slideUp();
}


function banUser(event){
	console.log(event.data.dur.val());
	if(event.data.dur.val())
	{
		if (!Accounts[event.data.usr].tempBan)
		{
			io.socket.put('/banuser',{banneduser:event.data.usr,bantime:event.data.dur.val()}
			,function (resData, jwRes) {
			toastr.success("user banned");
			Accounts[event.data.usr].tempBan=true;
			//$(this).context.html('unban');
			event.data.but.html('Unban');
			});
		}
	else
		{

			io.socket.put('/unbanuser',{banneduser:event.data.usr}
			,function (resData, jwRes) {
			toastr.success("user unbanned");
			Accounts[event.data.usr].tempBan=false;
			event.data.but.html('Temporary Ban');
			//$(this).context.html('unban');
			});


		}

	}
	else
	{
		toastr.info("Please choose a duration");
	}
}

function CreateDropDown(usracc)
{

	DropDowns[usracc]=$("<ul id='droplist"+usracc+"' class='userdropdown-content' ></ul>");
	DropDowns[usracc].append("<li><a href='/profile/"+usracc+"'>Go to Profile</a></li>");
	DropDowns[usracc].append("<li><a>Cumulative Rating "+Accounts[usracc].ELO+"</a></li>");
	DropDowns[usracc].append("<li><a href='#'>View Game Archive</a></li>");
   	DropDowns[usracc].append("<li><a href='#'>View Game	</a></li>");
   	DropDowns[usracc]['Foll']=$("<li></li>");
	DropDowns[usracc].append(DropDowns[usracc]['Foll']);


	DropDowns[usracc]['block']=$("<li></li>");
	DropDowns[usracc].append(DropDowns[usracc]['block']);
	//DropDowns[usracc].append(DropDowns[usracc]['block']);


	DropDowns[usracc].append("<li><a href='#'>Challenge to a Game</a></li>");
	DropDowns[usracc]['Priv']=$("<li id='PrivateConversationDD"+usracc+"'></li>");
	DropDowns[usracc].append(DropDowns[usracc]['Priv']);
	DropDowns[usracc].append("<li><a href='#'>Add to Friend List</a></li>");


/*
if(!PrivateConversations[MyID])
{PrivateConversations[MyID]={};}

if(PrivateConversations[MyID][usracc])
	{$("#PrivateConversationDD"+usracc).append("<div id='GoToPrivateDiv"+usracc+"'>Go To Chat</div>");}
else
	{
	console.log("Begin chat "+usracc);
	DropDowns[usracc]['BeginChat']=$("<a id='StartPrivateDiv"+usracc+"'>Begin Chat</a>");
	DropDowns[usracc]['Priv'].append(DropDowns[usracc]['BeginChat']);
	}
*/


}


function showsmallAvatar(elem,usracc)

{
	if(!Accounts[usracc])
	{}
	else
	{
		var d=addDiv(elem,"");
	d.addClass("userdropdown");
var sp=addSpan(d,"circlediv"+Accounts[usracc].name);
sp.addClass("smallonlinecircle");
var im=$("<img class='smallprofilepic' alt='this image was deleted by admin' src='"+Accounts[usracc].picture+"'></img>");
d.append(im);
}

}
function showAvatar(elem,usracc)

{
if(!Accounts[usracc])
{}
else
{
	var d=addDiv(elem,"");
	d.addClass("userdropdown");
var sp=addSpan(d,"circlediv"+Accounts[usracc].name);
sp.addClass("onlinecircle");
var im=$("<img class='profilepic' alt='this image was deleted by admin' src='"+Accounts[usracc].picture+"'></img>");
d.append(im);
}

}

function showUsername(elem,usracc)
{
	if(!UserNamesPrinted[usracc])
	{UserNamesPrinted[usracc]=1;}
	else
	{UserNamesPrinted[usracc]=UserNamesPrinted[usracc]+1;}

	var thisuserprinted=UserNamesPrinted[usracc];

	if(Accounts[usracc])
	{
		//class ='userdropdown'
		//"+showDropDown(usracc)+"
		var usr=$("<div style='display:flex'><span class='userdropdown'  id='usernamedropdown"+usracc+"-"+thisuserprinted+"' ><span  class='redtext'>"+Accounts[usracc].FideTitle+"</span> <b>"+Accounts[usracc].name+"</b> </span><!--<span class='idlesquare' id='circlediv"+Accounts[usracc].name+"'</span>--></div>");
elem.append(usr);



usr.click(function()
	{
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);

	});
usr.mouseenter(function(){
	$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);

});
usr.mouseleave(function()
		{
		DropDowns[usracc].detach();
		});
return usr;
 //href='/profile/"+usracc+"'
 }
 else
 {
	// console.log(Accounts[usracc]);
var usr=$("<div>Deleted Account</div>");
elem.append(usr);
return usr;

	}

	$("#usernamedropdown"+usracc+"-"+thisuserprinted).click(function()
	{
		console.log("clicked on username");
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);

			});

		$("#usernamedropdown"+usracc+"-"+thisuserprinted).mouseenter(function()
		{console.log("MOUSE ENTER");
			//console.log(DropDowns[usracc]);
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);

			});
		$("#usernamedropdown"+usracc+"-"+thisuserprinted).mouseleave(function()
		{console.log("MOUSE LEAVE");
			//console.log(DropDowns[usracc]);
			DropDowns[usracc].detach();
			});

/*
 *
 function handlerIn()

  {console.log("handler in!");

  function handlerOut()
  {console.log("handler out!");}

$("#usernamedropdown"+usracc).mouseenter(
handlerIn);
$("#usernamedropdown"+usracc).mouseleave(
handlerOut);
//,function(){console.log("out");});
 */
}

function showDropDown(usracc)
{


	return(`  <ul class="userdropdown-content2" >
  <li>
    <a href="#">Cumulative Rating `+Accounts[usracc].ELO+`</a>
  </li>
  <li>
    <a href="#">View Game Archive</a>
   </li>
   <li>
    <a href="#">View Game	<%- userid %></a>
   </li>
   <li>
    <a href="#">Follow	</a>
   </li>
   <li>
    <a href="#">Block	</a>
   </li>

   <li>
    <a href="#">Challenge to a Game</a>
   </li>
   <li>
    <div id="PrivateConversation`+usracc+`">
    </div>
    </li>
    <li>
    <a href="#">Add to Friend List	</a>
  </li>
   <li>

  </li>
  </ul>`);

	$("#StartPrivateDiv"+usracc).click(function(){


	io.socket.post('/startprivateconversation',{Talker1:MyID,Talker2:usracc},
			function (resData, jwRes) {
				console.log("resData[0].id "+resData.id);
				PrivateConversations[MyID][usracc]=resData;

				});

	io.socket.post('/privateconversation',{Talker1:MyID,Talker2:usracc},
			function (resData, jwRes) {
				console.log("resData[0].id "+resData.id);
				PrivateConversations[MyID][usracc]=resData;

				});
	});


}

function showSelect(elem,optionnames,optionvalues,defaulttext)
{
	var selectbloke=$("<select></select>");
	selectbloke.append("<option selected disabled>"+defaulttext+"</option>");
	for (iter in optionnames)
	{
	selectbloke.append("<option value='"+JSON.stringify(optionvalues[iter])+"'>"+optionnames[iter]+"</option>");
	}
	elem.append(selectbloke);
	return selectbloke;
}

function showStripedTable(elem)
{
	//var table=$(" <table class='table table-striped'></table>");
    //var head=$("<thead></thead>");
	//var body=$("<tbody></tbody>");
	var table=$("<table></table>");
	//table.append(head);
	//table.append(body);


	elem.append(table);
	//return body;
	return table;

}

function updateAccountInfo(words,usracc)
{
	console.log("words "+words);
	console.log("Accounts[ProfID][words] "+Accounts[usracc][words]);
		Accounts[usracc]['ProfileUpdated']=new Date();

	io.socket.put('/user/'+usracc+"?ProfileUpdated="+Accounts[usracc]['ProfileUpdated'],{

					  }

				,function(resData,jwres)
			{

					Accounts[usracc]['ProfileUpdatedPhrase']=phrasefordate(Accounts[usracc]['ProfileUpdated']);

					$("#ProfileUpdatedPhrase").html(Accounts[usracc]['ProfileUpdatedPhrase']);

			if(Accounts[usracc]['Profupdatedspan'])
			{
				Accounts[usracc]['Profupdatedspan'].html("Profile Updated:");
			}

			}
			);

		io.socket.put('/user/'+usracc+"?"+words+"="+Accounts[usracc][words],{

					  }

				,function(resData,jwres)
			{


				}
			);

}

function UpdateTypedText(words,elemTochange)
{
	elemTochange.html(Accounts[ProfID][words]);
				updateAccountInfo(words,MyID);

}
function showReportForm(elem,msgid)
{
	var  reportDiv=addSpan(elem);
	var reportform=$("<input type='text' autocomplete='off' class='form-control' placeholder='reason for reporting' name='name' >");
		var reportbutton=$("<button id='postbutton' class='btn btn-default btn-sm' type='submit' >Send Report</button>");
		reportDiv.append(reportform);
		reportDiv.append(reportbutton);
		 reportform.keypress(function (e) {
 var key = e.which;
 console.log("key "+keyCode);
 console.log("keycode "+key);
 if(key == 13)  // the enter key code
  { e.preventDefault();
	 // console.log("send wall post"+chatform.val());
		 	Sendreport(MyID,msgid,reportform.val());
		 	reportform.val("");
		}
		 });
		reportbutton.click(function(){
			Sendreport(MyID,msgid,reportform.val());
			reportform.val("");
			});
	return reportDiv;
}

function Sendreport(sender,msgid,content)
{
io.socket.post("/commentreport",{complaint:content,msgID:msgid,reporter:sender},
	 function (resData, jwr) {
	 toastr.success("Report Sent!");
	 });
}
function showLoginForm(elem)
{
	var overallDiv=addFlexDiv(elem,"myloginform","column","wrap","space-around","flex-start");
       showHeader(overallDiv,2,"Email");
     var emailform=$("<input type='text' autocomplete='on' placeholder='email' name='name' >");
	overallDiv.append(emailform);
       showHeader(overallDiv,2,"Password");
         var passwordform=$("<input type='text' autocomplete='on' placeholder='password' name='name' >");
	overallDiv.append(passwordform);
        var loginbut=showButton(elem,"Login","KgreenElement KregularButton");
        elem.append("<a href='/registerpage' class='KgreenElement KregularButton'>Register</a>");
            elem.append("<a href='/forgot' class='KgreenElement KregularButton'>Forgot Password</a>");

	loginbut.click(function(){


			io.socket.put("/login",{email:emailform.val(),password:passwordform.val()},
			function (resData, jwr){
			console.log(resData);
				if (resData.message!="Logged In Successfully")
				{
			toastr.info(resData.message);
			}
			else
			{
			toastr.success(resData.message);
				 $(location).attr("href", '/justloggedin');
			}

			});




	});
}

function showChatForm(elem,chatID,msgtype,ReplyTo="")
{
	var  chatDiv=addSpan(elem);
	var chatform=$("<input type='text' autocomplete='off' class='form-control' placeholder='post message' name='name' >");
		var chatbutton=$("<button id='postbutton' class='btn btn-default btn-sm' type='submit' >Post Message</button>");
		chatDiv.append(chatform);
		chatDiv.append(chatbutton);
		 chatform.keypress(function (e) {
	if (inputKeypress(e)==1)
	{
	setTimeout(function(){

		//var addition="";
		//var striter=0;
		//addition=chatform.val().charCodeAt(0);
		//for (striter=0;striter<(chatform.val().length);striter++)
		//{
		//addition=addition+chatform.val().charCodeAt(striter)+",";
		//}
		//console.log("addition "+addition);
		var msgToSend=chatform.val();
		//msgToSend=msgToSend+" lower case version:"+msgToSend.toLowerCase();
		//msgToSend=msgToSend+" found donkey in word?"+msgToSend.indexOf("donkey");
		
		msgToSend=(censor(msgToSend));
		 	SendWallPost(MyID,chatID,msgtype,"",msgToSend,ReplyTo);
		 	chatform.val("");
		},200);
	}
		 });
		chatbutton.click(function(){
				var msgToSend=chatform.val();
		msgToSend=msgToSend+" lower case version:"+msgToSend.toLowerCase();
		msgToSend=msgToSend+" found donkey in word?"+msgToSend.indexOf("donkey");
		
		msgToSend=(censor(msgToSend));
		 	SendWallPost(MyID,chatID,msgtype,"",msgToSend,ReplyTo);
			//SendWallPost(MyID,chatID,msgtype,"",chatform.val(),ReplyTo);
			chatform.val("");
			});
	return chatDiv;
}

function censor(wrds)
{
	var newWords=wrds;
	//console.log("censor "+wrds);
	for (iter in BannedWords)
	{
		//console.log(BannedWords[iter].word);
		lowerBadWord=BannedWords[iter].word.toLowerCase();
		//console.log("lower bad word "+lowerWord);
		var lowerWords=newWords.toLowerCase();
		//console.log("lower val "+lowerWords);
		if(lowerWords.indexOf(lowerBadWord)>-1)
		{
		//console.log("found "+BannedWords[iter].word);
		var strarr=lowerWords.split(lowerBadWord);
		
		for (s in strarr)
		{
		console.log(s);
		console.log(strarr[s]);	
		}
		
		newWords=lowerWords.replace(lowerBadWord,"****");
		//console.log("after replace "+wrds);
		}
	}
	return newWords;
}

function showInput(elem)
{
	var myinput=$("<span>Edit:</span><input type='text' autocomplete='off' class='form-control' placeholder='' name='name' >");
	elem.append(myinput);
return myinput;
}

function showTextwithInput(elem,words,elemTochange)
{
	var myinput=$("<span>Edit:</span><input type='text' autocomplete='off' class='form-control' placeholder='' name='name' >");
	elem.append(myinput);
	myinput.keydown(function(event){
		if(!Accounts[ProfID][words])
		{
		Accounts[ProfID][words]="";
		}
		//console.log(event);
		if (event.keyCode==8)
		{
		//console.log("pressed backspace");
		Accounts[ProfID][words]=Accounts[ProfID][words].substring(0, Accounts[ProfID][words].length - 1);
			UpdateTypedText(words,elemTochange);
		}
		if(event.key.length==1)
		{
		Accounts[ProfID][words]=Accounts[ProfID][words]+event.key;
		//Accounts[ProfID][words]=censor(
		UpdateTypedText(words,elemTochange);

	}
		});
}
function showAnchorButton(elem,words,linkto,btnstyle){
	ButtonNumber=ButtonNumber+1;
	//console.log("ButtonNumber"+ButtonNumber);
	//elem.append("<a href='"+linkto+"' style='width:100%' class='btn btn-lg "+btnstyle+"'  id='button"+ButtonNumber+"'>"+words+"</a>");
	elem.append("<a href='"+linkto+"' class='"+btnstyle+"'  id='button"+ButtonNumber+"'>"+words+"</a>");

	//$("#button"+ButtonNumber).click(function() {
 // alert( "Handler for .click() called." );
//});

}


function showBoardOptions(elem)
{
	var vbb=showButton(elem,"Show Board Options","KregularButton KgreenElement");
	var optionDiv=addFlexDiv(elem,"optionDiv","row","wrap","space-around","center");
	var boardThemeSel=showSelect(optionDiv,boardThemeNames,boardThemeValues,"Board Theme");
	var boardSizeSel=showSelect(optionDiv,boardSizeNames,boardSizeValues,"Board Size");
	var volumeSel=showSelect(optionDiv,volumeNames,volumeValues,"Sound Volume");
	var volumeButton=showButton(optionDiv,"Sound Enabled","KregularButton KgreenElement");
	var pieceThemeSel=showSelect(optionDiv,piecethemeNames,piecethemeValues,"Piece Theme");
	volumeButton.click(function()
	{
		console.log( $(this).text());
		if ($(this).text()=="Sound Enabled")
		{$(this).text("Sound Disabled");}
			else
		{$(this).text("Sound Enabled");}
		});

	optionDiv.hide();
	vbb.click(function(){
		optionDiv.slideToggle();
	});

	pieceThemeSel.change(function()
	{
		var obj=JSON.parse($(this).val());
		Accounts[MyID].ChessPieceTheme=obj;

		board1.changePieceTheme('/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/{piece}.png');
		//for (iter in pieceNames)
		//{
		//$("div.chess_board div.chess_player_black.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/b'+pieceNamesInitial[iter]+'.png)');
		//$("div.chess_board div.chess_player_white.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/w'+pieceNamesInitial[iter]+'.png)');

		updateAccountInfo('ChessPieceTheme',MyID);

		//}
	});
		boardThemeSel.change(function()
		{
			var obj=JSON.parse($(this).val());
		//	console.log(obj.whitebackground);
		//console.log(JSON.stringify($(this).val()['whitebackground']));
		$(".white-1e1d7").css("background-color",obj.whitebackground);
		$(".black-3c85d").css("background-color",obj.blackbackground);

		Accounts[MyID].BoardTheme=obj.name;
		updateAccountInfo('BoardTheme',MyID);

		});

		boardSizeSel.change(function()
		{
		var obj=JSON.parse($(this).val());
		$("#bdd").css("width",obj.value+"%");
		$("#boardcontainer").css("width","100%");

		$("#sideBoard").css("width",(100-obj.value)+"%");

		//topPlayerMarque.css("width",$("#bdd").css("width"));
		Accounts[MyID].BoardSize=obj.value;
		updateAccountInfo('BoardSize',MyID);
		//console.log("Accounts[MyID].BoardSize "+Accounts[MyID].BoardSize);
		board1.resize();
		topPlayerMarque.css("width","100%");
		bottomPlayerMarque.css("width","100%");
		$("#sideBoard").css("height",$("#bdd").css("height"));
		$("#chatDiv").css("max-height","100%");
		$("#chatDiv").css("overflow","auto");
		$("#chatDiv2").css("max-height","85%");
		$("#chatDiv2").css("overflow","auto");
		console.log("sideboard new height "+$("#sideBoard").css("height"));
		console.log("chatdiv1 new height "+$("#chatDiv").css("height"));
		console.log("chatdiv2 new height "+$("#chatDiv2").css("height"));
				for (btIter in boardThemeValues)
			{
				if (boardThemeValues[btIter].name==Accounts[MyID].BoardTheme)
				{

					var obj=boardThemeValues[btIter];
			$(".white-1e1d7").css("background-color",obj.whitebackground);
				$(".black-3c85d").css("background-color",obj.blackbackground);
				}
			}
		});

		volumeSel.change(function()
		{
		var obj=JSON.parse($(this).val());
		console.log(obj);
		Accounts[MyID].SoundVolume=obj;
		updateAccountInfo('SoundVolume',MyID);
		});

}

function showButton(elem,words,btnstyle="btn-success"){
	ButtonNumber=ButtonNumber+1;
	//console.log("ButtonNumber"+ButtonNumber);
	var btn=$("<span class='"+btnstyle+"' id='button"+ButtonNumber+"'>"+words+"</span>");
	elem.append(btn);
	return btn;
	//$("#button"+ButtonNumber).click(function() {
 // alert( "Handler for .click() called." );
//});

}

function showNavbar(elem,usracc,boardscreen=false)
{


	var plyrName=Accounts[usracc].name;

elem.append(`
		<div class="mynavbar">

			<span id="navbarfirstspan">
				<img style="background-color:white;width:50px;height:50px; "
						src="/knight50.png">
				</img>
			<span class="spacer"></span>



				<a  href="/#" >Chessbond

				</a>
			</span>

            <span class="spacer"></span>

			<a href="/opentournament"> <img style="background-color:white; "
			src="/tournyred1.gif">
			</a>
				<span class="spacer"></span>
			<span id="attachnavdropdown" style="color:white;" >
			Welcome `+plyrName+`<span  class='caret'></span>
			<span class="badge" id="NumberofNotificationsSpan"></span>
			</span>

		</div>

`);

if (boardscreen)
{
	var optionspan=$("#navbarfirstspan").append("<span></span>");
	showBoardOptions(optionspan);

}

var coverall;
//console.log("Notifications.length "+Notifications.length);
if(Notifications.length>0)
{

$("#NumberofNotificationsSpan").html(Notifications.length);
}
if(Accounts[MyID].Invisible)
{
$("#navbarfirstspan").after("Days Left To Account Deletion:"+Accounts[MyID].DaysToDelete);
coverall=$("<div style='background-color:white;position:fixed;height: 90%;width: 100%;top:30px'>Account Disabled</div>");
$('body').append(coverall);
}
/*
elem.append(`<nav class="navbar navbar-default navbar-inverse">

	<div class="container-fluid"   >
		<div class="navbar-header" >
			<button type="button" class="navbar-toggle" data-toggle="collapse" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">
			   <!-- This controls the number of lines in the image when the nav collapse -->
			   <span class="icon-bar"></span>
			   <span class="icon-bar"></span>
			   <span class="icon-bar"></span>
			</button>

			<!-- This is the brand on the left-hand side. -->
			<span style='display:flex'>
			<img style="background-color:white;max-width:50px;height:50px; "
             src="/knight50.png">

              <div  style="color:white;" id="InvisibleMessage">
			</div>
			<a class="navbar-brand" href="/#" >Chessbond

			</a>

			</span>
		</div>

     		 <ul class="navbar-nav" style="padding-top:10px;padding-left:200px;">
			<li  class="nav-item">
			<a href="/opentournament"> <img style="background-color:white; "
             src="/tournyred1.gif"></a>
			</li>
			</ul>
		   <div id="navbarNav" >

			<ul class="nav navbar-right">


				  <div id="attachnavdropdown"  class="nav navbar-nav navbar-brand navbar-right">
				Welcome `+plyrName+`<span  class='caret'></span>
				  </div>



			</ul>
		</div>

   </div>
</nav>
`);
*/

NavbarDropDown=$("<ul style='z-index:9999;width:inherit;position:absolute;right:10px;background-color:white;padding:30px 5px 10px 5px;box-shadow: 10px 10px 5px grey;'></ul>");
NDDlinks={};
NDDlinks['ProfileLink']=$("<a  id='profilelink' href='/profile/"+Accounts[MyID].id+"'><li style='list-style-position: inside;color:black'> My Profile</li></a>");
NDDlinks['AlbumLink']=$("<a id='albumlink' href='/albums/"+Accounts[MyID].id+"' ><li style='list-style-position: inside;color:black'>My Albums</li></a>");
NDDlinks['StatsLink']=$("<a id='statslink' href='/stats/"+Accounts[MyID].id+"' ><li style='list-style-position: inside;color:black'>My Stats</li></a>");
NDDlinks['LogoutLink']=$("<a href='/MyLogout'><li style='list-style-position: inside;color:black'>Logout</li></a>");

if (Accounts[MyID].admin)
{
NDDlinks['AdminLink']=$("<a href='/admin'><li style='list-style-position:inside;color:black'>Admin Panel</li></a>");
}
if (!Accounts[MyID].Invisible)
{
NDDlinks['DeleteLink']=$("<a href='/DeleteAccount'><li style='list-style-position: inside;color:black'>Delete Account</li></a>");
}
else
{
NDDlinks['DeleteLink']=$("<a href='/UndeleteAccount'><li style='list-style-position: inside;color:black'>UnDelete Account</li></a>");
}

if(Notifications.length>0)
{
	for (notIter in Notifications)
	{
		NDDlinks['NotificationsLink'+notIter]=$("<span><li style='list-style-position: inside;color:black'>"+Notifications[notIter].msg+"</li></span>");
		NDDlinks['NotificationsLink'+notIter].click({thisadr:Notifications[notIter].adr},visitNotification);
	}
}
console.log("sosedred");

console.log("sosed2red");
for (iter in NDDlinks)
{
	NavbarDropDown.append(NDDlinks[iter]);

	NavbarDropDown.append("<hr>");


	}

$("#attachnavdropdown").mouseenter(function()
{$(this).append(NavbarDropDown);
	if(coverall)
	{
	coverall.hide();}
	}
);

$("#attachnavdropdown").click(function()
{
{$(this).append(NavbarDropDown);
	if(coverall)
	{
	coverall.hide();
	}
}

});

$("#attachnavdropdown").mouseleave(function()
{NavbarDropDown.detach();
if(coverall)
	{
	coverall.show();
	}
}
);



				//		<li id="NotificationsList"></li>
			//
		//				<li id="UndeleteAccount"></li>
	//					<li id="DeleteAccount"></li>
//						`);
	//`).hide().slideDown();
	//<%- include options.ejs %>
	//<li ng-show="Accounts['<%- Myid %>'].Invisible==true"><a href="/UndeleteAccount">Undelete Account</a></li>
					//<li ng-show="!Accounts['<%- Myid %>'].Invisible"><a href="/DeleteAccount">Delete Account</a></li>

	//do NumberofNotificationsSpan
	//NotificationsList<li ng-click="DestroyNotifications(n.adr)" ng-repeat="n in Notifications track by $index" value="{{n.msg}}">
						  //<a href="{{n.adr}}">{{n.msg}}</a></li>

	/*
	 <li>

				 <span class="badge" id="NumberofNotificationsSpan" ></span>
				 </li>
				  <li  class="dropdown">
					<a    href="#" class="dropdown-toggle navbar-brand" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"  ><span id="NameDiv"></span><span  class='caret'></span></a>
					<ul class="dropdown-menu">
						<li><a id="profilelink" href="/profile/<%- req.session.passport.user%>" >My Profile</a></li>
						<li><a id="albumlink" href="/albums/<%- req.session.passport.user%>" >My Albums</a></li>
						<li><a id="statslink" href="/stats/<%- req.session.passport.user%>" >My Stats</a></li>

						<li><a href="/MyLogout">Logout</a></li>
						<li id="NotificationsList"></li>

						<li id="UndeleteAccount"></li>
						<li id="DeleteAccount"></li>

					</ul>
				  </li>*/

	/*if(Accounts[usracc])
	{
		console.log("Welcome "+Accounts[usracc].name);
		$("#albumlink").attr('href','/albums/'+usracc);
		$("#profilelink").attr('href','/profile/'+usracc);
		$("#statslink").attr('href','/stats/'+usracc);

		$("#NameDiv").html("Welcome "+Accounts[usracc].name);
	if(Accounts[usracc].Invisible)
             {
				$("#InvisibleMessage").html("Days Left To Account Deletion:"+Accounts[usracc].DaysToDelete);
			}
	}
	*/
}
function visitNotification(event)
{
	for (notIter in Notifications)
	{
		if(Notifications[notIter].adr==event.data.thisadr)
		{
			io.socket.put("/notification/destroy/"+Notifications[notIter].id,{},function(rwRes,resData)
			{


			});
		}

	}
	window.location.replace(event.data.thisadr);
}

function showRecentGames(elem,usracc)
{
	//console.log("showrecent games");
	var overallFlex=addFlexDiv(elem,"recentgames","column",'wrap');
		var span=addFlexDiv(overallFlex,'id',"row","nowrap");
	var leftbut=showButton(span,"<","KgreenElement KbigButton");

	showHeader(span,2,"Recent Games ("+JoinedGames[usracc].length+")");

	var rightbut=showButton(span,">","KgreenElement KbigButton");

	leftbut.click(function()
	{
		if(recentGameIndex>0)
		{
		recentGameIndex=recentGameIndex-recentGamesToShow;
		}

		for (iter in JoinedGames[usracc])
		{
		$("#overall"+iter).hide();
		}

		for (iter in JoinedGames[usracc])
		{
			if(iter>=recentGameIndex && iter<(recentGameIndex+recentGamesToShow))
			{
			$("#overall"+iter).show();
			}
		}
	});

	rightbut.click(function()
	{
		if (JoinedGames[usracc].length>(recentGameIndex+recentGamesToShow))
		{
		recentGameIndex=recentGameIndex+recentGamesToShow;
		}

		for (iter in JoinedGames[usracc])
		{
		$("#overall"+iter).hide();
		}

		for (iter in JoinedGames[usracc])
		{
			if(iter>=recentGameIndex && iter<(recentGameIndex+recentGamesToShow))
			{
			$("#overall"+iter).show();
			}
		}

   });

	var flexy=addFlexDiv(overallFlex,"recentgamesflexy","row",'wrap');


	addGamesToRecentGames2(usracc);
}

function addGamesToRecentGames2(usracc)
{
	var flexy=$("#recentgamesflexy");

	for (iter in JoinedGames[usracc])
   {

	  // var newFlex=addFlexDiv(flexy,"resultDiv",'row','wrap');
	  var newFlex=$("<span class='overall' id='overall"+iter+"'></span>");
	  flexy.append(newFlex);

	if(JoinedGames[usracc][iter].Player1Color=='White')
	{

	var usr1=showUsername(newFlex,JoinedGames[usracc][iter].Player1);
	showAvatar(newFlex,JoinedGames[usracc][iter].Player1);
	var usr2=showUsername(newFlex,JoinedGames[usracc][iter].Player2);
	showAvatar(newFlex,JoinedGames[usracc][iter].Player2);

	usr1.attr("class","ChartCell");
	usr2.attr("class","ChartCell");

	}
	else
	{
	var usr1=showUsername(newFlex,JoinedGames[usracc][iter].Player2);
	showAvatar(newFlex,JoinedGames[usracc][iter].Player2);

	var usr2=showUsername(newFlex,JoinedGames[usracc][iter].Player1);
	showAvatar(newFlex,JoinedGames[usracc][iter].Player1);

	usr1.attr("class","ChartCell");
	usr2.attr("class","ChartCell");

	}

	newFlex.append("<p class='ChartCell'>Type:"+JoinedGames[usracc][iter].GameCategory+"</p>");
	newFlex.append("<p class='ChartCell'>Move:"+JoinedGames[usracc][iter].Move+"</p>");
	newFlex.append("<p class='ChartCell'>Created:"+phrasefordate(JoinedGames[usracc][iter].createdAt)+"</p>");
	var gotobut=showButton(newFlex,"Go To Game","KregularButton KgreenElement");
	newFlex.css('cursor', 'pointer');
	gotobut.click({gam:iter,acc:usracc},GoToGame);
	 if (iter<recentGameIndex || iter>(recentGameIndex+recentGamesToShow))
	   {
		newFlex.hide();
		}
}
}

function GoToGame(event)
{

		$(location).attr('href', '/humanvshumannew/'+JoinedGames[event.data.acc][event.data.gam].id);

}

function addGamesToRecentGames(usracc)
{
	var padding ="10px"
	var borderpos1="border-top-style";
	bordersize1="solid";
	var borderpos2="border-bottom-style";
	bordersize2="solid";
	var flexy=$("#recentgamesflexy");
	flexy.empty();
	console.log(flexy);
	var whiteFlex=addFlexDiv(flexy,"whiteName","column",'nowrap');
	var span=addSpan(whiteFlex,'id');
	span.append("<p>White</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

	var blackFlex=addFlexDiv(flexy,"blackName","column",'nowrap');
	var span=addSpan(blackFlex,'id');
	span.append("<p>Black</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);



	var resultFlex=addFlexDiv(flexy,"resultFlex","column",'nowrap');
	var span=addSpan(resultFlex,'id');

	span.append("<p>Result</p>");
	span.css("padding",padding);
   	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

   var timeFlex=addFlexDiv(flexy,"timeFlex","column",'nowrap');
	var span=addSpan(timeFlex,'id');
	span.append("<p>Time</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

   var movesFlex=addFlexDiv(flexy,"movesFlex","column",'nowrap');
   var span=addSpan(movesFlex,'id');
	span.append("<p>Moves</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

   var dateFlex=addFlexDiv(flexy,"dateFlex","column",'nowrap');
   var span=addSpan(dateFlex,'id');
	span.append("<p>Date</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

   var actionFlex=addFlexDiv(flexy,"actionFlex","column",'nowrap');
	var span=addSpan(actionFlex,'id');
	span.append("<p>Action</p>");
	span.css("padding",padding);
   	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

	for (iter in JoinedGames[usracc])
   {
	  // console.log(iter);
	 // console.log(JSON.stringify(JoinedGames[usracc][iter]));
	if(JoinedGames[usracc][iter].Player1Color=='White')
	{
		var par1=$("#whiteName").append("<p></p>");
	showUsername(par1,JoinedGames[usracc][iter].Player1);
		var par2=$("#blackName").append("<p></p>");

	showUsername(par2,JoinedGames[usracc][iter].Player2);

	}
	else
	{
	showUsername(blackFlex,JoinedGames[usracc][iter].Player1);
	showUsername(whiteFlex,JoinedGames[usracc][iter].Player2);

	}
	//console.log("JoinedGames[ProfID][iter][0].id "+JoinedGames[ProfID][iter][0].id);
	//console.log("JoinedGames[ProfID][iter][0].GameCategory "+JoinedGames[ProfID][iter][0].GameCategory);
	timeFlex.append("<p>"+JoinedGames[usracc][iter].GameCategory+"</p>");
	movesFlex.append("<p>"+JoinedGames[usracc][iter].Move+"</p>");
	dateFlex.append("<p>"+phrasefordate(JoinedGames[usracc][iter].createdAt)+"</p>");
	actionFlex.append("<span class='KregularButton KgreenElement'>Go To Game</span>");
	actionFlex.css('cursor', 'pointer');
	actionFlex.click(function(){
		$(location).attr('href', '/humanvshumannew/'+JoinedGames[usracc][iter].id);
	});
}
}


function addJoinedGame(iter,games,myelem){
				console.log(JSON.stringify(games[iter]));
				var overall=$("<span class='overall'></span>");
				overall.append("<span class='ChartCell' id='joinedgamerow"+games[iter].id+"'></span>");
				$("#joinedgamerow"+games[iter].id).append("<span id='joinedgamep1td"+iter+"'></span>");
				console.log("show user name in join div "+games[iter].Player1);
				showUsername($("#joinedgamep1td"+iter),games[iter].Player1);
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgamep2td"+iter+"'></td>");
				showUsername($("#joinedgamep2td"+iter),games[iter].Player2);
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgameButtd"+iter+"'></td>");

				showAnchorButton($("#joinedgameButtd"+iter),"Go to Game");
				$("#button"+ButtonNumber).attr('href',"/humanvshuman/"+games[iter].id);
				}

function showNewGameControls(elem){
	elem.append(`
		<div id="newgamecontrols">


				<h2>Choose a Time Limit:</h2>
				<select id="addGameCategories" class="form-control bg-success" >

		</select>
		<h2>Which Color would you like to be?:</h2>
		<select  id="colorpicker" class="form-control bg-success" data-style="btn-success">
		  <option value='White'>White</option>
		  <option value='Black'>Black</option>
		</select>
		<button id="gobutton" type="submit" class="btn btn-success">Go</button>


			</div>
	`);

	for (giter in gamecategories)
	{
	$("#addGameCategories").append("<option value='"+giter+"'>"+gamecategories[giter].time+" | "+gamecategories[giter].extratime+"</option>");
	}


elem.append(`

			<span  id="playAgainstAIButton" href="/playvsai" class="KbigButton KgreenElement">Play Chess against the AI!</span>

			<span id="playAgainstPersonButton" type="submit" class="KbigButton KgreenElement">Create a New vs Human Game</span>

		`);

		$("#newgamecontrols").hide();

		$("#playAgainstAIButton").click(function()
		{
		$(location).attr('href', '/playvsai');
		});

		$("#playAgainstPersonButton").click(function()
		{
			$("#newgamecontrols").slideToggle();
		});

		$("#gobutton").click(function()
		{
		var type='Timed';
		var id=MyID;
		var Username=Accounts[MyID].Name;
		var timecat=$("#addGameCategories").val();
		var chosencolor=$("#colorpicker").val();
		console.log("GameForm1"+gamecategories[timecat].time);
		console.log("GameForm2"+gamecategories[timecat].extratime);
		console.log("chosen color "+chosencolor);
		var gamecat=gamecategories[timecat].time+"|"+gamecategories[timecat].extratime;

	io.socket.put('/newopengame', { GameType:type,GameCategory:gamecat,TimeLimit:gamecategories[timecat].time,ExtraTimeLimit:gamecategories[timecat].extratime,Player1Color:chosencolor,Player1:id,Player1Name:Username },
    function (resData, jwr) {

      // Refresh the page now that we've been logged in.
      //window.location.reload(true);
		toastr.success('Created New Game');
		if( window.location.pathname.indexOf('/profile')>-1)
		{

			window.location.replace('/');
		}
    });


	});

}

function showOpenGameList(elem,games)
{
	elem.append("<h1>Open Games</h1>");

	var roomname='openchessgameroom';

			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});

io.socket.on('connect',function(){


		var roomname='openchessgameroom';

			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});

		});
			io.socket.on('deleteopengameevent', function (data)
			{
				$("#opengameiter"+data.gameid).detach();
			});
			io.socket.on('deleteopengameevent', function (data)
			{
				$("#opengameiter"+data.gameid).detach();
			});

			io.socket.on('newopengameevent', function (data)
			{
			console.log('newopengameevent'+JSON.stringify(data));

			data.phrase=phrasefordate(data.createdAt);

			if(Accounts[data.Player1])
			{
			games.push(data);
			var myelem=$("#OpenGameListDiv");
			addOpenGame2(myelem,games,games.length-1);
			}
			else
			{

			games.push(data);
			retrieveAccount(data.Player1).then
			(
				function()
				{
					retrieveFollowed(data.Player1).then(
						function(){
							retrievePrivate(data.Player1).then
							(
								function(){
								addOpenGame2($("#OpenGameListDiv"),games,games.length-1);
								}
							)
						}
					)
				}
			);

			}
		});
			//console.log("games "+JSON.stringify(games));
			var openFlex=addFlexDiv(elem,"opengamez","column","wrap");
			var openTitleFlex=addFlexDiv(openFlex,"openGameTitles","row","wrap");
			//openTitleFlex.append("<p>Player</p><p>Date</p><p>Join</p>");
			var openGameListDiv=addFlexDiv(openFlex,"OpenGameListDiv","row","wrap");

				for (iter in games)
				{
				addOpenGame2(openGameListDiv,games,iter);

				}
            /*
            <tr ng-repeat="opengame in opg track by $index">
			<td><%- include('partials/username', {userid: "opengame.Player1",Myid:Myid}); %></td>
			<td>{{opengame.phrase}}</td>

			<% if (req.session.passport) { %>

			<td>
				<button ng-click="">Join Game</button>
					<%- include('partials/avatar', {userid: "opengame.Player1",Myid:Myid}); %>

				<button ng-click="deleteopengame(opengame.id)">Delete Game</button>

			</td>

			<% } %>
			</tr>

		*/
}

	function addOpenGame2(myelem,games,iter)
{
	var overall=$("<span id='opengameiter"+games[iter].id+"' class='overall'></span>");
	myelem.append(overall);
	var usr=showUsername(overall,games[iter].Player1);
	usr.attr("class","ChartCell");
			games[iter].phrase=phrasefordate(games[iter].createdAt);
			var phr=$(games[iter].phrase);
			overall.append(phr);
			phr.attr("class","ChartCell");
			overall.css("border-style","solid");
			var but=showButton(overall,"Join Game");
	but.attr("class","ChartCell KgreenElement KregularButton");
	but.click(function()
	{
		console.log("clicked button");
				//	joingame(games[iter].id,games[iter].Player1,games[iter].Player1Name,games[iter].Player1Color,MyID,Account[MyID].name,games[iter].GameType,games[iter].GameCategory,games[iter].TimeLimit);
		io.socket.put('/joingame',
		{
			GameID:games[iter].id,
			PlayerID:games[iter].Player1,
			//PlayerName:PlayerName,
			PlayerColor:games[iter].Player1Color,
			MyID:MyID,
			//MyName:MyName,
			GameType:games[iter].GameType,
			GameCategory:games[iter].GameCategory,
			Player1TimeLimit:games[iter].TimeLimit*60,
			Player2TimeLimit:games[iter].TimeLimit*60
		}

		,function(resData,jwres)
		{

			//console.log(JSON.parse(resData).id);

				io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres)
			{

			});

		}
		);


	});


			var but2=	showButton(overall,"Delete Game","KgreenElement KregularButton");
					but2.click(function() {
				 io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres){
				});

				});


}
function addOpenGame(myelem,games,iter)
{
	myelem.append("<tr id='opengameiter"+games[iter].id+"'></tr>");
	$("#opengameiter"+games[iter].id).append("<td id='opengametdnameiter"+iter+"'></td>");
	showUsername($("#opengametdnameiter"+iter),games[iter].Player1);
	$("#opengameiter"+games[iter].id).append("<td id='opengamedateiter"+iter+"'></td>");
	games[iter].phrase=phrasefordate(games[iter].createdAt);
	$("#opengamedateiter"+iter).append(games[iter].phrase);
	$("#opengameiter"+games[iter].id).append("<td id='opengametdbuttoniter"+iter+"'></td>");
	showButton($("#opengametdbuttoniter"+iter),"Join Game");
	$("#button"+ButtonNumber).click(function()
	{
				//	joingame(games[iter].id,games[iter].Player1,games[iter].Player1Name,games[iter].Player1Color,MyID,Account[MyID].name,games[iter].GameType,games[iter].GameCategory,games[iter].TimeLimit);
		io.socket.put('/joingame',
		{

			GameID:games[iter].id,
			PlayerID:games[iter].Player1,
			//PlayerName:PlayerName,
			PlayerColor:games[iter].Player1Color,
			MyID:MyID,
			//MyName:MyName,
			GameType:games[iter].GameType,
			GameCategory:games[iter].GameCategory,
			Player1TimeLimit:games[iter].TimeLimit*60,
			Player2TimeLimit:games[iter].TimeLimit*60
		}

		,function(resData,jwres)
		{

			io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres)
			{
			});

		}
		);





	});


			$("#opengameiter"+games[iter].id).append("<td id='opengamedeletetdbuttoniter"+iter+"'></td>");
				showButton($("#opengamedeletetdbuttoniter"+iter),"Delete Game");
					$("#button"+ButtonNumber).click(function() {
				 io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres){
				});

				});


				}

var countries=[
	,'Afghanistan'
	,'Albania'
	,'Algeria'
	,'American Samoa'
	,'Andorra'
	,'Angola'
	,'Anguilla'
	,'Antigua and Barbuda'
	,'Argentina'
	,'Armenia'
	,'Aruba'
	,'Australia'
	,'Austria'
	,'Azerbaijan'
	,'Bahamas'
	,'Bahrain'
	,'Bangladesh'
	,'Barbados'
	,'Belarus'
	,'Belgium'
	,'Belize'
	,'Benin'
	,'Bermuda'
	,'Bhutan'
	,'Bolivia'
	,'Bosnia and Herzegovina'
	,'Botswana'
	,'Brazil'
	,'British Virgin Islands'
	,'Brunei'
	,'Bulgaria'
	,'Burkina Faso'
	,'Burundi'
	,'Cambodia'
	,'Cameroon'
	,'Canada'
	,'Cape Verde'
	,'Cayman Islands'
	,'Central African Republic'
	,'Chad'
	,'Chile'
	,'China'
	,'Christmas Island'
	,'Colombia'
	,'Comoros'
	,'Cook Islands'
	,'Costa Rica'
	,'Croatia'
	,'Cuba'
	,'Cyprus'
	,'Czech Republic'

	,'Democratic Republic of the Congo'
	,'Denmark'
	,'Djibouti'
	,'Dominica'
	,'Dominican Republic'
	,'East Timor'
	,'Ecuador'
	,'Egypt'
	,'El Salvador'
	,'Equatorial Guinea'
	,'Eritrea'
	,'Estonia'
	,'Ethiopia'
	,'Falkland Islands'
	,'Faroe Islands'
	,'Fiji'
	,'Finland'
	,'France'
	,'French Polynesia'
	,'Gabon'
	,'Gambia'
	,'Georgia'
	,'Germany'
	,'Ghana'
	,'Gibraltar'
	,'Greece'
	,'Greenland'
	,'Grenada'
	,'Guam'
	,'Guatemala'
	,'Guinea'
	,'Guinea Bissau'
	,'Guyana'
	,'Haiti'
	,'Honduras'
	,'Hong Kong'
	,'Hungary'
	,'Iceland'
	,'India'
	,'Indonesia'
	,'Iran'
	,'Iraq'
	,'Ireland'
	,'Israel'
	,'Italy'
	,"Ivory Coast"
	,'Jamaica'
	,'Japan'
	,'Jordan'
	,'Kazakhstan'
	,'Kenya'
	,'Kiribati'
	,'Kuwait'
	,'Kyrgyzstan'
	,'Laos'
	,'Latvia'
	,'Lebanon'
	,'Lesotho'
	,'Liberia'
	,'Libya'
	,'Liechtenstein'
	,'Lithuania'
	,'Luxembourg'
	,'Macau'
	,'Macedonia'
	,'Madagascar'
	,'Malawi'
	,'Malaysia'
	,'Maldives'
	,'Mali'
	,'Malta'
	,'Marshall Islands'
	,'Martinique'
	,'Mauritania'
	,'Mauritius'
	,'Mexico'
	,'Micronesia'
	,'Moldova'
	,'Monaco'
	,'Mongolia'

	,'Montenegro'

	,'Montserrat'
	,'Morocco'
	,'Mozambique'
	,'Myanmar'
	,'Namibia'
	,'Nauru'
	,'Nepal'
	,'Netherlands'
	,'Netherlands Antilles'
	,'New Zealand'
	,'Nicaragua'
	,'Niger'
	,'Nigeria'
	,'Niue'
	,'Norfolk Island'
	,'North Korea'
	,'Norway'
	,'Oman'
	,'Pakistan'
	,'Palau'
	,'Panama'
	,'Papua New Guinea'
	,'Paraguay'
	,'Peru'
	,'Philippines'
	,'Pitcairn Islands'
	,'Poland'
	,'Portugal'
	,'Puerto Rico'
	,'Qatar'
	,'Republic of the Congo'
	,'Romania'
	,'Russia'
	,'Rwanda'
	,'Saint Kitts and Nevis'
	,'Saint Lucia'
	,'Saint Pierre'
	,'Saint Vincent and the Grenadines'
	,'Samoa'
	,'San Marino'
	,'Sao Tome and Principe'
	,'Saudi Arabia'
	,'Senegal'
	,'Serbia'
	,'Seychelles'
	,'Sierra Leone'
	,'Singapore'
	,'Slovakia'
	,'Slovenia'
	,'Solomon Islands'
	,'Somalia'
	,'South Africa'

	,'South Korea'

	,'Spain'
	,'Sri Lanka'
	,'Sudan'
	,'Suriname'
	,'Swaziland'
	,'Sweden'
	,'Switzerland'
	,'Syria'
	,'Taiwan'
	,'Tajikistan'
	,'Tanzania'
	,'Thailand'
	,'Tibet'

	,'Togo'
	,'Tonga'
	,'Trinidad and Tobago'
	,'Tunisia'
	,'Turkey'
	,'Turkmenistan'
	,'Turks and Caicos Islands'
	,'Tuvalu'
	,'United Arab Emirates'
	,'Uganda'
	,'Ukraine'
	,'United Kingdom'
	,'United States'
	,'Uruguay'
	,'US Virgin Islands'
	,'Uzbekistan'
	,'Vanuatu'
	,'Vatican City'
	,'Venezuela'
	,'Vietnam'
	,'Wallis And Futuna'
	,'Yemen'
	,'Zambia'
	,'Zimbabwe'
];

	var countryToFilename=function(country)
{
	if (country){
	//return country.replace(/ /gi, "_");
	country=country.replace(/"/g,"");
	return country.replace(/ /gi, "-");
	}
}
