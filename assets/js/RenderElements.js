function showUsername(elem,usracc)
{
elem.append("<span class='redtext'>"+usracc.FideTitle+"</span> "+usracc.name);	
}

function showOpenGameList(elem,usracc)
{
	
	
		 elem.append(`<h2 class='sub-header'>Open Games</h2>
          <div class="table-responsive" style="overflow:visible;">
            <table class="table table-striped">
              
		
			<thead>
                <tr>
	              <th>Player</th>
                  <th>Date</th>
                  <th>Join</th>
				<!--HEADERS OF TABLE-->
                </tr>
           </thead>
           <tbody>`);
				/*
            <tr ng-repeat="opengame in opg track by $index">
			<td><%- include('partials/username', {userid: "opengame.Player1",Myid:Myid}); %></td>
			<td>{{opengame.phrase}}</td>
		
			<% if (req.session.passport) { %>
    		
			<td>		
				<button ng-click="joingame(opengame.id,opengame.Player1,opengame.Player1Name,opengame.Player1Color,'<%- req.session.passport.user%>',User.name,opengame.GameType,opengame.GameCategory,opengame.TimeLimit)">Join Game</button>
					<%- include('partials/avatar', {userid: "opengame.Player1",Myid:Myid}); %>
    		
				<button ng-click="deleteopengame(opengame.id)">Delete Game</button>
				
			</td>
			
			<% } %>
			</tr>
            </tbody>
            </table>
          </div>	
		*/
}
