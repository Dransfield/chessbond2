var ButtonNumber=0;
function showUsername(elem,usracc)
{
	
elem.append("<span class='redtext'>"+Accounts[usracc].FideTitle+"</span> "+Accounts[usracc].name);	
}
function showButton(elem,words){
	ButtonNumber=ButtonNumber+1;
	//console.log("ButtonNumber"+ButtonNumber);
	elem.append("<span class='btn btn-lg btn-success' id='button"+ButtonNumber+"'>"+words+"</span>");
	
	//$("#button"+ButtonNumber).click(function() {
 // alert( "Handler for .click() called." );
//});
	
}
function showNavbar(elem,usracc)
{
	elem.append(`
	<nav class="navbar navbar-default navbar-inverse">
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
             src="/knight.png">
             
              <div  style="color:white;" id="InvisibleMessage">
			</div>
			<a class="navbar-brand" href="/#" >Chessbond
			
			</a>
			
			</span>	  
		</div>
              
     		 <ul class="navbar-nav" style="padding:6px;">
			<li  class="nav-item">
			
			</li>
			</ul>
		   <div id="navbarNav" class="collapse navbar-collapse" ng-class="!navCollapsed && 'in'">
	
			<ul class="nav navbar-right">
			
					
				  <ul class="nav navbar-nav navbar-right">
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
				  </li>
				  </ul>
				  
				
			
			</ul>
		</div>
		
   </div>
</nav>
	`).hide().slideDown();
	//<%- include options.ejs %>
	//<li ng-show="Accounts['<%- Myid %>'].Invisible==true"><a href="/UndeleteAccount">Undelete Account</a></li>
					//<li ng-show="!Accounts['<%- Myid %>'].Invisible"><a href="/DeleteAccount">Delete Account</a></li>
					
	//do NumberofNotificationsSpan
	//NotificationsList<li ng-click="DestroyNotifications(n.adr)" ng-repeat="n in Notifications track by $index" value="{{n.msg}}">
						  //<a href="{{n.adr}}">{{n.msg}}</a></li>
	if(Accounts[usracc])
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
				myelem.append("<tr id='joinedgamerow"+games[iter].id+"'></tr>");
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgamep1td"+iter+"'></td>");
				showUsername($("#joinedgamep1td"+iter),games[iter].Player1);
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgamep2td"+iter+"'></td>");
				showUsername($("#joinedgamep2td"+iter),games[iter].Player2);
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgameButtd"+iter+"'></td>");
				
				showButton($("#joinedgameButtd"+iter),"Go to Game");
				
				}
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
function showNewGameControls(elem){
	elem.append(`
		<div id="newgamecontrols">
			<form id="newgameform" ng-submit="createopengame('Timed',User.id,User.name )" >
		
				<h2>Choose a Time Limit:</h2>
				<select  ng-options="(c.time+'|'+c.extratime) for c in gamecategories" ng-model="timeobject" id="timelimitpicker" class="form-control bg-success" data-style="btn-success">
		
		</select>
		<h2>Which Color would you like to be?:</h2>
		<select ng-model="GameForm.color" id="colorpicker" class="form-control bg-success" data-style="btn-success">
		  <option>White</option>
		  <option>Black</option>
		</select>
		<button id="go button" type="submit" class="btn btn-success">Go</button>
		</form>
			
			</div>
	`);
elem.append(`	 <div class="row">
			 <div class="col-md-2 ">  
			</div>
			<div class="text-center col-md-3">
			<a  id="playAgainstAIButton" href="/playvsai" class="btn btn-lg btn-success">Play Chess against the AI!</a>
			</div>
		 <div class="col-md-2 ">  
			</div>
		 <div class="text-center col-md-3">
		 
			<button  id="playAgainstPersonButton" type="submit" class="btn btn-lg btn-success">Create a New vs Human Game</button>
			</div>
		<div class="col-md-2 ">  
			</div>
		</div>`);
		
		$("#newgamecontrols").hide();
		
		$("#playAgainstPersonButton").click(function()
		{
			$("#newgamecontrols").slideDown();
		});
		
}

function showOpenGameList(elem,games)
{
			
		var roomname='openchessgameroom';
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			
			io.socket.on('deleteopengameevent', function (data)
			{
				$("#opengameiter"+data.gameid).detach();
			});
			
	console.log("games "+JSON.stringify(games));
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
					
					myelem.append("<tr id='opengameiter"+games[iter].id+"'></tr>");
					$("#opengameiter"+games[iter].id).append("<td id='opengametdnameiter"+iter+"'></td>");
					 showUsername($("#opengametdnameiter"+iter),games[iter].Player1);
					$("#opengameiter"+games[iter].id).append("<td id='opengametdbuttoniter"+iter+"'></td>");
					showButton($("#opengametdbuttoniter"+iter),"Join Game");
					$("#button"+ButtonNumber).click(function() {
				//	joingame(games[iter].id,games[iter].Player1,games[iter].Player1Name,games[iter].Player1Color,MyID,Account[MyID].name,games[iter].GameType,games[iter].GameCategory,games[iter].TimeLimit);
				
					
					io.socket.put('/joingame',{
				
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
				
			 io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres){
				});
			
				}
			);
					
				
			
			
					
					});

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
