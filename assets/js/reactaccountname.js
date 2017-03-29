
class Username extends React.Component {
   constructor(props) {
      super(props);
		
      this.state = {
         data: 'Initial data...'
      }

      this.updateState = this.updateState.bind(this);
	 io.socket.get('/user/'+MyID,
					function(usr){
			this.setState({user:sailsResponse.data});
		});
   };
updateState() {
      this.setState({data: 'Data updated...'})
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
