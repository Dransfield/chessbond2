var ButtonNumber=0;
var UserNamesPrinted={};
var DropDowns={};
var Navbar={};

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
	
			var flagimage=$("<img data-toggle='tooltip' title='' class='countryflag' src=''></img>");
		
			if(Accounts[usracc]['Country'])
			{
			flagimage.attr("src","/images/flatflags/"+countryToFilename(Accounts[usracc]['Country'])+".png");
			
				
			}
			elem.append(flagimage);
			
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
function showChatMessage(elem,msg)
{
var newdiv;
if(msg.sender==MyID)
{
	newdiv=$("<div  style='background-color:lightgrey;overflow:visible;padding:4px;'></div>");
}
else
{
	newdiv=$("<div style='background-color:lightgreen;overflow:visible;padding:4px;'></div>");
	
}
console.log("show chat message "+JSON.stringify(msg));
console.log("sender "+msg.sender);
elem.append(newdiv);
showsmallAvatar(newdiv,msg.sender);
showUsername(newdiv,msg.sender);
newdiv.append(":"+msg.content);	

elem.append("<hr>");

}
function CreateDropDown(usracc)
{

	DropDowns[usracc]=$("<ul id='droplist"+usracc+"' class='userdropdown-content' ></ul>");
	
	DropDowns[usracc].append("<li><a>Cumulative Rating "+Accounts[usracc].ELO+"</a></li>");
	DropDowns[usracc].append("<li><a href='#'>View Game Archive</a></li>");
   	DropDowns[usracc].append("<li><a href='#'>View Game	</a></li>");
   	DropDowns[usracc]['Foll']=$("<li id='FollowDD"+usracc+"'></li>");
	DropDowns[usracc].append(DropDowns[usracc]['Foll']);
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
	{console.log(usracc+"is null account");}
	elem.append(`
	<div class="userdropdown">

<!--<img class="onlinecircle"  ng-show="Accounts[<%- userid %>].online && Accounts[<%- userid %>].idle" src="/images/orangecirclesml.png"></img>-->
<!--<img class="onlinecircle"  ng-show="Accounts[<%- userid %>].online && Accounts[<%- userid %>].idle"  src="/images/greencirclesml.png"></img>-->
<!--<img class="onlinecircle"  ng-show="!Accounts[<%- userid %>].online" src="/images/greycirclesml.png"></img>-->
<img class="smallprofilepic" src="`+Accounts[usracc].picture+`"></img>

</div>
`);	
}

function showAvatar(elem,usracc)

{
	elem.append(`
	<div class="userdropdown">

<!--<img class="onlinecircle"  ng-show="Accounts[<%- userid %>].online && Accounts[<%- userid %>].idle" src="/images/orangecirclesml.png"></img>-->
<!--<img class="onlinecircle"  ng-show="Accounts[<%- userid %>].online && Accounts[<%- userid %>].idle"  src="/images/greencirclesml.png"></img>-->
<!--<img class="onlinecircle"  ng-show="!Accounts[<%- userid %>].online" src="/images/greycirclesml.png"></img>-->
<img class="profilepic" src="`+Accounts[usracc].picture+`"></img>

</div>
`);	
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
elem.append("<div class='userdropdown'  id='usernamedropdown"+usracc+"-"+thisuserprinted+"' ><span  class='redtext'>"+Accounts[usracc].FideTitle+"</span> <b>"+Accounts[usracc].name+"</b> </div>");	
 //href='/profile/"+usracc+"'
 }
 else
 {
	 console.log(Accounts[usracc]);
elem.append("<div>Deleted Account</div>");	
 	 
	}
	
	$("#usernamedropdown"+usracc+"-"+thisuserprinted).click(function()
	{
		//console.log("clicked on username");
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);
		
			});
	
		$("#usernamedropdown"+usracc+"-"+thisuserprinted).mouseenter(function()
		{//console.log("MOUSE ENTER");
			//console.log(DropDowns[usracc]);
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);
		
			});
		$("#usernamedropdown"+usracc+"-"+thisuserprinted).mouseleave(function()
		{//console.log("MOUSE LEAVE");
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
   <div ng-controller="BlockedAccountController" ng-init="setShouldGetBlockedAccounts('<%- Myid %>')">
    <div  ng-show="BlockedAccounts[<%- userid%>]" ng-click="UnBlockUser('<%- Myid %>',<%- userid %>)">UnBlock Member</div>
	  <div  ng-show="!BlockedAccounts[<%- userid%>]" ng-click="BlockUser('<%- Myid %>',<%- userid %>)">Block Member</div>
	
	</div>
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
				Accounts[usracc]['Profupdatedspan'].html("Profile Updated:");
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
function showChatForm(elem,chatID,msgtype)
{
	var chatform=$("<input type='text' autocomplete='off' class='form-control' placeholder='post message' name='name' >");
		var chatbutton=$("<button id='postbutton' class='btn btn-default btn-sm' type='submit' >Post Message</button>");
		elem.append(chatform);
		elem.append(chatbutton);
		 chatform.keypress(function (e) {
 var key = e.which;
 //console.log("key "+key);
 if(key == 13)  // the enter key code
  { e.preventDefault();
	 // console.log("send wall post"+chatform.val());
		 	SendWallPost(MyID,chatID,msgtype,"",chatform.val());
		 	chatform.val("");
		}
		 });
		chatbutton.click(function(){
			SendWallPost(MyID,chatID,msgtype,"",chatform.val());
			chatform.val("");
			});
	
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
	optionDiv.hide();
	vbb.click(function(){
		optionDiv.slideToggle();
	});
		boardThemeSel.change(function()
		{
			var obj=JSON.parse($(this).val());
		//	console.log(obj.whitebackground);
		//console.log(JSON.stringify($(this).val()['whitebackground']));
		$(".chess_square_light").css("background-color",obj.whitebackground);	
		$(".chess_square_dark").css("background-color",obj.blackbackground);
		
		Accounts[MyID].BoardTheme=obj.name;	
		updateAccountInfo('BoardTheme',MyID);
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
						
				
						
						
				<a  href="/#" >Chessbond
						
				</a>
			</span>	
              
			<a href="/opentournament"> <img style="background-color:white; "
			src="/tournyred1.gif">
			</a>
				
			<span id="attachnavdropdown" style="color:white;" >
			Welcome `+plyrName+`<span  class='caret'></span>
			</span>
		  
		</div>
			
`);

if (boardscreen)
{
	var optionspan=$("#navbarfirstspan").append("<span></span>");
	showBoardOptions(optionspan);
	
}

var coverall;
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

if (!Accounts[MyID].Invisible)
{
NDDlinks['DeleteLink']=$("<a href='/DeleteAccount'><li style='list-style-position: inside;color:black'>Delete Account</li></a>");
}
else
{
NDDlinks['DeleteLink']=$("<a href='/UndeleteAccount'><li style='list-style-position: inside;color:black'>UnDelete Account</li></a>");
}


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
function showRecentGames(elem,usracc)
{
	//console.log("showrecent games");
	var overallFlex=addFlexDiv(elem,"recentgames","column",'wrap');
		var span=addSpan(overallFlex,'id');
	showHeader(span,2,"Recent Games");
	var flexy=addFlexDiv(overallFlex,"recentgamesflexy","row",'wrap');
	
	
	
	
   //console.log(JSON.stringify(JoinedGames[ProfID]));
   
	//console.log(JoinedGames[ProfID][iter].Player1);
	
   /*
	
		
				  
            <tr ng-repeat="game in GameInfo track by $index">
		
		<td >
		<%- include('partials/avatar', {userid: "game.WhitePlayerID",Myid:Myid}); %>
    	<%- include('partials/username', {userid: "game.WhitePlayerID",Myid:Myid}); %>
		({{game.WhiteELO}})
		</td>
			

		
		<td>
		<%- include('partials/avatar', {userid: "game.BlackPlayerID",Myid:Myid}); %>
    	<%- include('partials/username', {userid: "game.BlackPlayerID",Myid:Myid}); %>	
		({{game.BlackELO}})
		
		</td>
		
			<td>{{game.res}}</td>
			<td>{{game.GameCategory}}</td>
			<td>{{game.moves}}</td>
			<td>{{game.date}}</td>
			<td><a href="/humanvshuman/{{game.id}}" target="_blank">Link</a></td>
			
			
			<tr>
			</tr>
            </tbody>
            </table>
            	<div class="btn btn-lg btn-success" ng-show="chessgameskip>0" ng-click="GetOlderChessGames(LookedatUser.id)"><</div>
				<div class="btn btn-lg btn-success" ng-click="GetMoreChessGames(LookedatUser.id)">></div>

          </div>
          </span>
          */	
          addGamesToRecentGames(usracc);
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

function showJoinedGameList(elem,games)
{
	console.log(JSON.stringify(games));
	elem.append(`
<h2 class='sub-header'>Your Games</h2>
          <div class='table-responsive' style='overflow:visible;'>
            <table class='table table-striped'>
              
		
			<thead>
                <tr>
	              <th>Player1</th>
                  <th>Player2</th>
                  
				<!--HEADERS OF TABLE-->
                </tr>
           </thead>
           <tbody id='JoinedGameListDiv'>
				  
            </tbody>
            </table>
          </div>`).hide().slideDown();;
          
          var myelem=$("#JoinedGameListDiv");
				for (iter in games)
				{
					addJoinedGame(iter,games,myelem);
				}
				
io.socket.on('newmygameevent', function (data)
			{
			console.log('recieved new game event '+data);
			
			data.phrase=phrasefordate(data.createdAt);
			games.push(data);
			addJoinedGame(games.length-1,games,myelem);
			});
          /*
            <tr ng-repeat="game in joinedgames track by $index">
			<td><%- include('partials/username', {userid: "game.Player1",Myid:Myid}); %></td>
			<td><%- include('partials/username', {userid: "game.Player2",Myid:Myid}); %></td>
			
			<td>
				<button ng-click="PlayGame(game.id,game.Player2)" class="btn btn-lg btn-success" >Play Game</a>
				<button ng-click="deletegame(game.id,'<%-  req.session.passport.user %>')">Delete Game</button>
			</td>
			
			</tr>retri
          */
}

function addJoinedGame(iter,games,myelem){
				console.log(JSON.stringify(games[iter]));
				myelem.append("<tr id='joinedgamerow"+games[iter].id+"'></tr>");
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgamep1td"+iter+"'></td>");
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
    });
	
	
	});
		
}

function showOpenGameList(elem,games)
{
	
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
			addOpenGame(myelem,games,games.length-1);
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
								addOpenGame($("#OpenGameListDiv"),games,games.length-1);
								}
							)
						}
					)
				}
			);
			
			}
		});
			//console.log("games "+JSON.stringify(games));
			
	
		 elem.append(`<h2 class='sub-header'>Open Games</h2>
          <div class='table-responsive' style='overflow:visible;'>
            <table class='table table-striped'>
              
		
			<thead >
                <tr>
	              <th>Player</th>
                  <th>Date</th>
                  <th>Join</th>
				<!--HEADERS OF TABLE-->
                </tr>
           </thead>
           <tbody id='OpenGameListDiv'>
           
           </tbody>
           </table>
           </div>
           
           `).hide().slideDown();
           
				var myelem=$("#OpenGameListDiv");
				
				
				for (iter in games)
				{
				addOpenGame(myelem,games,iter);

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
	return country.replace(/ /gi, "-");
	}
}
