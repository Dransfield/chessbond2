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
function addFlexDiv(elem,id,direction,wrap='nowrap')
{
	var flex=$("<div id='"+id+"' style='display:flex;flex-direction:"+direction+";flex-wrap:"+wrap+";'></div>")
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
function showHeader(elem,num,content)
{
elem.append("<h"+num+">"+content+"</h"+num+">");	
	
}
function showUsernameJumbo(elem,usracc)
{
	var jum=$("<span class='jumbotron'><span>");
      var header=$("<h1></h1>");
      jum.append(header);
      showUsername(header,usracc);
	elem.append(jum);
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
elem.scrollTop(elem[0].scrollHeight);
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

function UpdateTypedText(words,elemTochange)
{
	elemTochange.html(Accounts[ProfID][words]);
		Accounts[ProfID]['ProfileUpdated']=new Date();
				
			io.socket.put('/user/'+ProfID+"?ProfileUpdated="+Accounts[ProfID]['ProfileUpdated'],{
				
					  }  
				  
				,function(resData,jwres)
			{
				
					Accounts[ProfID]['ProfileUpdatedPhrase']=phrasefordate(Accounts[ProfID]['ProfileUpdated']);
					
					$("#ProfileUpdatedPhrase").html(Accounts[ProfID]['ProfileUpdatedPhrase']);
				Accounts[ProfID]['Profupdatedspan'].html("Profile Updated:");
			}
			);
		
		io.socket.put('/user/'+ProfID+"?"+words+"="+Accounts[ProfID][words],{
				
					  }  
				  
				,function(resData,jwres)
			{
				
				
				}
			);
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
function showAnchorButton(elem,words,linkto,btnstyle="btn-success"){
	ButtonNumber=ButtonNumber+1;
	//console.log("ButtonNumber"+ButtonNumber);
	elem.append("<a href='"+linkto+"' class='btn btn-lg "+btnstyle+"'  id='button"+ButtonNumber+"'>"+words+"</a>");
	
	//$("#button"+ButtonNumber).click(function() {
 // alert( "Handler for .click() called." );
//});
	
}

function showButton(elem,words,btnstyle="btn-success"){
	ButtonNumber=ButtonNumber+1;
	//console.log("ButtonNumber"+ButtonNumber);
	elem.append("<span class='btn btn-lg btn-success' id='button"+ButtonNumber+"'>"+words+"</span>");
	//$("#button"+ButtonNumber).click(function() {
 // alert( "Handler for .click() called." );
//});
	
}

function showNavbar(elem,usracc)
{
	var plyrName=Accounts[usracc].name;

elem.append(`
			<img style="background-color:white;width:50px;height:50px; "
					src="/knight50.png">
			</img> 
					
			
					
					
					<a class="navbar-brand" href="/#" >Chessbond
					
					</a>
					
              
				<a href="/opentournament"> <img style="background-color:white; "
				src="/tournyred1.gif">
				</a>
				
				<div id="attachnavdropdown" >
				Welcome `+plyrName+`<span  class='caret'></span>
				</div>
		  
				
			
`);

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

NavbarDropDown=$("<ul style='z-index:99;width:inherit;position:absolute;right:10px;background-color:white;padding:30px 5px 10px 5px;box-shadow: 10px 10px 5px grey;'></ul>");
NDDlinks={};
NDDlinks['ProfileLink']=$("<a  id='profilelink' href='/profile/"+Accounts[MyID].id+"'><li style='list-style-position: inside;color:black'> My Profile</li></a>");
NDDlinks['AlbumLink']=$("<a id='albumlink' href='/albums/"+Accounts[MyID].id+"' ><li style='list-style-position: inside;color:black'>My Albums</li></a>");
NDDlinks['StatsLink']=$("<a id='statslink' href='/stats/"+Accounts[MyID].id+"' ><li style='list-style-position: inside;color:black'>My Stats</li></a>");
NDDlinks['LogoutLink']=$("<a href='/MyLogout'><li style='list-style-position: inside;color:black'>Logout</li></a>");
for (iter in NDDlinks)
{
	NavbarDropDown.append(NDDlinks[iter]);
	NavbarDropDown.append("<br>");
	}

$("#attachnavdropdown").mouseenter(function()
{$(this).append(NavbarDropDown);}
);

$("#attachnavdropdown").click(function()
{
{$(this).append(NavbarDropDown);}
	
});

$("#attachnavdropdown").mouseleave(function()
{NavbarDropDown.detach();}
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

function showJoinedGameList(elem,games)
{
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
			
			</tr>
          */
}

function addJoinedGame(iter,games,myelem){
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
			
			<a  id="playAgainstAIButton" href="/playvsai" class="btn btn-lg btn-success">Play Chess against the AI!</a>
		
			<button  id="playAgainstPersonButton" type="submit" class="btn btn-lg btn-success">Create a New vs Human Game</button>
			
		`);
		
		$("#newgamecontrols").hide();
		
		$("#playAgainstPersonButton").click(function()
		{
			$("#newgamecontrols").slideDown();
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
		
