
class Username extends React.Component {
   constructor(props) {
      super(props);
		
      this.state = {
         data: 'Initial data...'
      }

      this.updateState = this.updateState.bind(this);
      this.updateState2 = this.updateState2.bind(this);
	 io.socket.get('/user/'+MyID,
					function(usr){
			this.updateState2(usr);
		});
   };
updateState() {
      this.setState({data: 'Data updated...'})
   }
updateState2(usr) {
      this.setState({user: usr});
   }
   render() {
      return (
         <div>
            <button onClick = {this.updateState}>CLICK</button>
            <h4>{this.state.data}</h4>
             <h1>{this.state.user.name}</h1>
         </div>
        
      );
   }
}
ReactDOM.render(
  <Username />,
  document.getElementById('accname')
);
