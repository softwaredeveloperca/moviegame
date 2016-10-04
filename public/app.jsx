

var CommentBox = React.createClass({
	getInitialState: function () {
		return {
			comments: null
		};
	},
	componentDidMount: function () {
		var that = this;
		this.socket = io();
		this.socket.on('comments', function (comments) {
			that.setState({ comments: comments });
		});
		this.socket.emit('fetchComments');
	},
	submitComment: function (comment, callback) {
		this.socket.emit('newComment', comment, function (err) {
			if (err)
				return console.error('New comment error:', err);
			callback();
		});
	},
	render: function() {
		return (
			<div className="commentBox">
				<h3>Comments:</h3>
				<CommentList comments={this.state.comments}/>
				<CommentForm submitComment={this.submitComment}/>
			</div>
		);
	}
});
var CommentList = React.createClass({
	render: function () {
		var Comments = (<div>Loading comments...</div>);
		if (this.props.comments) {
			Comments = this.props.comments.map(function (comment) {
				return (<Comment comment={comment} />);
			});
		}
		return (
			<div className="commentList">
				{Comments}
			</div>
		);
	}
});
var Comment = React.createClass({
	render: function () {
		return (
			<div className="comment">
				<span className="author">{this.props.comment.author}</span> said:<br/>
				<div className="body">{this.props.comment.text}</div>
			</div>
		);
	}
});
var CommentForm = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var that = this;
		var author = this.refs.author.getDOMNode().value;
		var text = this.refs.text.getDOMNode().value;
		var comment = { author: author, text: text };
		var submitButton = this.refs.submitButton.getDOMNode();
		submitButton.innerHTML = 'Posting comment...';
		submitButton.setAttribute('disabled', 'disabled');
		this.props.submitComment(comment, function (err) {
			that.refs.author.getDOMNode().value = '';
			that.refs.text.getDOMNode().value = '';
			submitButton.innerHTML = 'Post comment';
			submitButton.removeAttribute('disabled');
		});
	},
	render: function () {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" name="author" ref="author" placeholder="Name" required /><br/>
				<textarea name="text" ref="text" placeholder="Comment" required></textarea><br/>
				<button type="submit" ref="submitButton">Post comment</button>
			</form>
		);
	}
});

var SystemMessage = React.createClass({
	getInitialState: function() {
        return {
			message: this.props.message
        };
    },
	hidealert: function() {
		this.setState({message : '' });
	},
	render: function () {
			style = {
                	'display': 'none'
            };
			if (this.state.message) {
            	style = {
                	'display': 'block'
            	};
        	}
		return (
			<div>
			 <div class="alert" style={style}>
  				<span class="closebtn" onClick={() => {this.hidealert()}}>&times;</span>
  				{this.state.message}
			</div></div>
		);
	}
});

var Clock = React.createClass({
	getInitialState: function() {
        return {
        	style: this.props.style, 
			clock: this.props.clock
        };
    },
	render: function () {
		return (<div style={style}>{this.state.clock}</div>); 
	}
});

var Player = React.createClass({
	getInitialState: function() {
		console.log('players');
		console.log(this.props.players);
        return {
			name: this.props.players.player_name, 
			id: this.props.players.player_id, 
			movie_name: this.props.players.movie_id, 
			movie_part: this.props.players.movie_part, 
			ad_id: this.props.players.ad_id
        };
    },
	render: function () {
		console.log('state');
		console.log(this.props);
		return (<div>Name: {this.state.name}
				<br />ID: {this.state.id}
				<br />Now Playing: {this.state.movie_name} Part {this.state.movie_part}</div>); 
	}
}); 


var Players = React.createClass({
	getInitialState: function() {
        return {
			all_players: this.props.all_players
        };
    },
    render: function() {
	    var rows = [];
	    console.log('before render');
	    console.log(this.state.all_players);
	    this.state.all_players.forEach(function(player) {
	    	console.log(player);
	      rows.push(<td><Player players={player} /></td>);
	    });
	    return (
	      <table>
	        <thead>
	          <tr>
	            <th>WhatsOn</th>
	          </tr>
	        </thead>
	        <tbody><tr>{rows}</tr></tbody>
	      </table>
	    );
	}
});


var ScheduleSlots = React.createClass({
	getInitialState: function() {
		  console.log(this.props);
        return {
			all_slots: this.props.all_slots, 
			schedule_title: this.props.schedule_title, 
			slotoptions: [], 
			movielist: [], 
			slot_id: 0, 
			slot_name: null, 
			day: this.props.day, 
			movie_id: null, 
			socket: this.props.socket
        };
    }, 
    componentDidMount: function () {
		this.socket=this.props.socket;
		var that = this;		
		this.socket.on('deletemoviecomplete', function (iscomplete) {
			that.props.refreshSchedule();	
		});
	
		this.socket.on('movielist', function (movielist) {
			that.setState({"movielist": movielist});
		});
		console.log('after');
		
	}, 
	updateSlot: function(slot_id,slot_name)
	{
		console.log('slot name'+slot_name);
		this.setState({"slot_id": slot_id, "slot_name": slot_name});
		this.socket.emit('getmovielist', 'schedule'); 
	}, 
	deleteSlot: function(movie_id)
	{
		this.setState({"movie_id": movie_id});
		var slot_data = { movie_id: movie_id, day: this.state.day};
		console.log('slot data');
		console.log(slot_data);

		this.socket.emit('deletemovieschedule', slot_data); 
	}, 
    successhandler: function(){
    	//this.state.all_slots.forEach(function(slot) {
    	//  this.state.slotoptions.push(
      //          <option key={slot._id} value={slot._id}>{slot}</option>
      //    );
	  //  });

    }, 
    handleAutoSchedule: function(){
    	this.socket.emit('autoschedule', this.state.day); 
    }, 
    handleAddScheduleSlot: function(){
    	//day, movie_id, slot_id, movie_name, length
    	console.log('slot_id'+this.state.slot_id);
    	var pieces='';
    	if(this.movielist.id != '')
    	{
    		pieces=this.movielist.value.split(' ');	
    	}
    	console.log('pieces');
    	console.log(pieces);
    	this.socket.emit('addschedulemovie', this.state.day, this.movielist.id, this.state.slot_id, pieces[0], pieces[1].replace('(', '').replace(')', ''));
    }, 
    render: function() {
	    var rows = [];
	    var slotoptions = [];
	    console.log('slots');
	 //   console.log(this.deleteSlot(movie_));
	   var that=this;
	    this.state.all_slots.forEach(function(slot) {
	      rows.push(<tr><td><ScheduleSlot key={slot._id+Math.floor((Math.random() * 10000) + 1)} data={slot} updateSlot={that.updateSlot} deleteSlot={that.deleteSlot} /></td></tr>);
	    });


	    var slot_id=this.state.slot_id;

	    var style = {
                	'display': 'none'
            	};
	    if (slot_id) {
            	style = {
                	'display': 'block'
            	};
		}


		console.log(style);

		console.log('movie list');
		console.log(this.state.movielist);	    

	    this.state.movielist.forEach(function(movie) {
	      slotoptions.push(<option key={movie._id} id={movie._id} value={movie.id}>{movie.name} ({movie.duration})</option>);
	   });
	    
	    return (
	    <table><tr><td valign="top">
	    	<table>
	        <thead>
	          <tr>
	            <th>Schedule</th>
	          </tr>
	        </thead>
	        <tbody>{rows}</tbody>
	     	</table>
	      </td><td valign="top">
	      	  <button  onClick={() => {this.handleAutoSchedule()}}>Auto Schedule</button>
	      	  <div style={style}>
	      	  
		      <h2>Add to Schedule</h2>	      
		        		<select id="add_movie" ref={(ref) => this.movielist = ref}>
		        			<option value="">Select Movie</option>
		        			{slotoptions}
		        		</select>
		        		<button  onClick={() => {this.handleAddScheduleSlot()}}>Add to {this.state.slot_name}</button>
		        	</div> 	
	      </td></tr></table>
	    );
	}
});

var ScheduleOption = React.createClass({
	getInitialState: function() {
        return {
			id: this.props.id,
			text: this.props.text
        };
    },
	render: function () {
		var isLoggedIn = this.state.isLoggedIn;
			if (isLoggedIn) {
            	style = {
                	'display': 'none'
            	};
				logoffstyle = {
                	'display': 'block'
            	};
        	}
			else {
				style = '';
			}
		//return (<option value="{this.state.id}">Name: {this.state.text}</option>); 
		return (<div value="{this.state.id}">Name: {this.state.text}</div>); 
	}
});

var ScheduleSlot = React.createClass({
	getInitialState: function() {
        return {
			data: this.props.data, 
			deleteFunc: this.props.deleteSlot, 
			socket: this.props.socket
        };
    }, 
     componentDidMount: function () {
		this.socket=this.props.socket;	
	}, 
    handleAddSchedule: function(slot_id,slot_name) {
    	this.props.updateSlot(slot_id,slot_name);
    },  
    handleDeleteSchedule: function(movie_id) {
    	this.props.deleteSlot(movie_id);
    }, 
	render: function () {
		var movie_id = this.state.data.movie_id;
			if (movie_id) {
            	style = {
                	'display': 'none'
            	};
            	deletestyle = {
                	'display': 'block'
            	};
        	}
			else {
				deletestyle = {
                	'display': 'none'
            	};
				style = {
                	'display': 'block'
            	};
			}
		return (<div>Name: {this.state.data.name} <button  onClick={() => {this.handleAddSchedule(this.state.data.slot_id,this.state.data.name)}} style={style}>Schedule Slot</button>
				<button  onClick={() => {this.handleDeleteSchedule(movie_id)}} style={deletestyle}>Delete Slot</button>

				</div>); 
	}
}); 

var Main = React.createClass({
	getInitialState: function() {
        return {
            isLoggedIn: false, 
			uniqueId: Date.now(), 
			uniqueId2: Date.now(), 
			uniqueMessageId: Date.now()+1, 
			uniqueClockId: Date.now()+2, 
			socket: null, 
			message: null, 
			clockdisplay: null, 
			loginName: null, 
			gamevs: null, 
			status: 'pause', 
			schedule: []
        };
    },
	
	componentDidMount: function () {
		this.socket = io();
		var that = this;
		

		this.socket.on('newgame', function (message) {
			that.setState({isLoggedIn: true, socket: that.socket, uniqueId2: Date.now()});
		});
		this.socket.on('loggedoff', function (message) {
			that.setState({isLoggedIn: false, uniqueId: Date.now()});
		});
		this.socket.on('tick', function (message) {
			that.setState({clockdisplay: message['time_count'], uniqueClockId: Date.now()});
			console.log(message['time_count']);
		});
		this.socket.on('gamemessage', function (systemmessage) {
		console.log('game message received'+systemmessage);
			that.setState({message: systemmessage, uniqueMessageId: Date.now()});
		});
		
		this.socket.on('gamestatus', function (message) {
		console.log('game status received'+message);
			that.setState({status: message, uniqueMessageId: Date.now()});
		});
		
		this.socket.on('schedule', function (schedule_list) {
			that.setState({schedule: schedule_list, uniqueId2: Date.now()});
		});
	}, 
	handleJoinClick: function() {
		var login = {"loginName": this.state.loginName, "gamevs": this.state.gamevs};
		this.socket.emit('login', login);   
    }, 
	handleLogoffClick: function() {
        this.socket.emit('logout', 'bye');   
    }, 
	handleChange: function(event) {
		console.log('event');
		console.log(event);
    	this.setState({loginName: event.target.value});
		console.log(this.state.loginName);
    },
	handleChangeVs: function(event)
  {
 
  	this.setState({gamevs: event.target.value});
  },
  handleChangeStatus: function(event)
  {
  	console.log(event.target.value);
  	this.socket.emit('timercontrol', event.target.value);   
  }, 
	render: function () {
			var isLoggedIn = this.state.isLoggedIn;
			if (isLoggedIn) {
            	style = {
                	'display': 'none'
            	};
				logoffstyle = {
                	'display': 'block'
            	};
        	}
			else {
				style = {
                	'display': 'block'
            	};
				logoffstyle = {
                	'display': 'none'
            	};
			}
			clockstyle = {
                	'display': 'none'
            	};
            clockstyle=logoffstyle;

		return (
			<div><form style={style}><input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      /><br />
	  <input type="radio" name="gamevs" onChange={this.handleChangeVs} value="Computer" checked /> Vs Computer
      <input type="radio" name="gamevs" onChange={this.handleChangeVs} value="Human" /> Vs Human
	  </form>
	  		
			<button onClick={this.handleJoinClick} style={style}>Join</button>
			<button onClick={this.handleLogoffClick} style={logoffstyle}>Logoff</button> <br /> 
			<div style={logoffstyle}>{this.state.clockdisplay}</div><button style={logoffstyle} value="play" onClick={this.handleChangeStatus}>Start</button>
			<button style={clockstyle} value="stop" onClick={this.handleChangeStatus}>Pause Game</button>
			<button style={clockstyle} value="speed" onClick={this.handleChangeStatus}>Speed Game</button>
			<button style={clockstyle} value="slow" onClick={this.handleChangeStatus}>Slow Game</button>
			<button style={clockstyle} value="restart" onClick={this.handleChangeStatus}>Restart Game</button>
			<Clock style={logoffstyle} time={this.state.clockdisplay} key={this.state.uniqueClockId} />		
			<SystemMessage message={this.state.message} key={this.state.uniqueMessageId} />
			<Players style={logoffstyle} key={this.state.uniqueId2} all_players={this.state.schedule} />
			<MainPanel style={logoffstyle} key={this.state.uniqueId} isLoggedIn={this.state.isLoggedIn} socket={this.state.socket} />
			</div>
		);
	}
});

/*
var SigninForm = React.createClass({
  getInitialState: function() {
    return {value: 'Name', gamevs: 'Computer};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleChangeVs: function(value)
  {
  	this.setState({gamevs: event.target.value});
  },

  render: function() {
    return (
      <form><input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
	  <input type="radio" name="gamevs" onChange={this.handleChangeVs} value="Computer"/>Vs Computer
      <input type="radio" name="gamevs" onChange={this.handleChangeVs} value="Human"/>Wait for Players
	  </form>
    );
  }
});
*/

var MainPanel = React.createClass({ 
    getInitialState: function() {
    console.log('in main panel');
	console.log(this.props);
        return {
            room: 'Lobby', 
			socket: this.props.socket
        };
    },
	
    getRoom : function () { 
		var room = this.state.room;
		if(this.props.isLoggedIn==true){
		console.log('sssocket');
		console.log(this.props.socket);
			if(room == "Boss")
			{
				return <BossRoom  socket={this.props.socket} />
			}
			else if(room == "MyRoom")
			{
				return <MyRoom  socket={this.props.socket} />
			}
			else if(room == "Schedule")
			{
				return <Schedule socket={this.props.socket} />
			}
			else if(room == "Movie")
			{
				return <MovieRoom socket={this.props.socket} />
			}
			else if(room == "Ad")
			{
				return <AdRoom  socket={this.props.socket} />
			}
			else if(room == "Lobby")
			{ 
				return <LobbyRoom  socket={this.props.socket} />
			}
		}
		
		
		return 'Join a game';
	}, 
	setRoom : function (r) {
		this.setState({ "room": r });
	},
	render: function () {
		var style = {
                	'display': 'none'
            	};
		if (this.props.isLoggedIn) {
            	style = {
                	'display': 'block'
            	};
        }
		
		return (
			<div>{this.props.isLoggedIn ? <ul>
				<li className={style}><button id="Lobby" onClick={() => {this.setRoom('Lobby')}}>Lobby</button></li>
				<li className={style}><button id="Boss" onClick={() => {this.setRoom('Boss')}}>Bosses Room</button></li>
				<li className={style}><button id="MyRoom" onClick={() => {this.setRoom('MyRoom')}}>My Room</button></li>
				<li className={style}><button id="Schedule" onClick={() => {this.setRoom('Schedule')}}>Schedule</button></li>
				<li className={style}><button id="Movies" onClick={() => {this.setRoom('Movie')}}>Movies</button></li>
				<li className={style}><button id="Ads" onClick={() => {this.setRoom('Ad')}}>Ads</button></li></ul> : null}
			
			{this.getRoom()}</div>
		);
	}
});

var Schedule = React.createClass({
	getInitialState: function(){
		return {
			room: "Schedule", 
			schedulelist: [], 
			schedule_title: "", 
			uniqueId: Date.now(), 
			day: null
		}
	}, 
	componentDidMount: function () {
		this.socket=this.props.socket;
		var that = this;		

		this.socket.on('schedulelist', function (schedule) {
			console.log('schedulelist');
			console.log(schedule);
			that.setState({"schedulelist": schedule, uniqueId: Date.now()});		
		});
		if(this.state.day === null)
		{
			this.showschedule(0);
		}
	}, 
	refreshSchedule: function()
	{
		this.socket.emit('getschedulelist', this.state.day); 
	}, 
	showschedule: function (day) { 
		var that = this;
		//that.setState({"day": day});	
		var schedule_title="Todays Schedule";
		if(day === -1) schedule_title="Tomorrows Schedule";
		else if(day === 1) schedule_title="Yesterdays Schedule";

		this.setState({"schedule_title": schedule_title, "day": day});
		this.socket.emit('getschedulelist', day); 
	},
	render: function () {
		
		return (
			<div>
				Schedule Room<br />
				<button onClick={() => {this.showschedule(0)}}>Today Schedule</button>
				<button onClick={() => {this.showschedule(1)}}>Tomorrow Schedule</button>
				<button onClick={() => {this.showschedule(-1)}}>Yesterday Schedule</button>		
				<ScheduleSlots key={this.state.uniqueId} day={this.state.day} socket={this.props.socket} refreshSchedule={this.refreshSchedule} all_slots={this.state.schedulelist} schedule_title={this.state.schedule_title} />	
			</div>
		);
	}
});


var MovieRoom = React.createClass({ 
	getInitialState: function() {
        return {
            movielist: [],
			selectedIndex: -1, 
			id: 0, 
			duration: 0,
			type: '', 
			cost: 0,  
			name: '' 
        };
    },
	componentDidMount: function () {
		this.socket=this.props.socket;
		var that = this;		
		this.socket.on('movielist', function (movielist) {
			console.log(movielist);
			that.setState({"movielist": movielist, selectedIndex: 0});

			if(typeof(that.state.movielist[0]) != "undefined")
			{
				that.display(0);
			}
			
		});
		//this.socket.emit('getmovielist'); 
		console.log('after');
		
	}, 
	next: function () {
		if (this.state.selectedIndex + 1 < this.state.movielist.length) {
  			this.display(this.state.selectedIndex + 1);
		}
		else {
			this.display(0);
		}
	}, 
	previous: function () {
		if ((this.state.selectedIndex  - 1) >= 0) {
			
  			this.display(this.state.selectedIndex - 1);
		}
		else {
			this.display((this.state.movielist.length - 1));
		}
	}, 
	purchase : function (id){
		console.log('purchase' + id);
		this.socket.emit('buysellmovie', id); 
		//this.setState({selectedIndex: -1});
	}, 
	display: function (index) {
		this.setState({ 
			name: this.state.movielist[index].name, 
			duration: this.state.movielist[index].duration, 
			id: this.state.movielist[index]._id, 
			type: this.state.movielist[index].type, 
			cost: this.state.movielist[index].cost, 
			selectedIndex: index});
	}, 
	showmovielist: function (type) { 
		this.socket.emit('getmovielist', type); 
	}, 
	render: function () {
		var settings = {
    		dots: true
    	}
		return (
			<div>
				Movie Room<br />
				
				<button onClick={() => {this.showmovielist('buy')}}>Buy List</button> - <button onClick={() => {this.showmovielist('sell')}}>Sell List</button>
				<div>
					<h4>{this.state.name}</h4>
					Cost:{this.state.cost}<br />
					Type:{this.state.type}<br />
					Length:{this.state.duration} slot(s)<br />
					
					<button onClick={() => {this.purchase(this.state.id)}}>Buy/Sell</button>
					
				
				<button disabled={!this.state.movielist.length} onClick={this.previous}>Previous</button><button disabled={!this.state.movielist.length} onClick={this.next}>Next</button>
				</div>
				
			</div>
		);
	}
	
	
});
/*

{Object.keys(movielist).map(function(key) {
    			
					<div>a {movielist[key].name}</div>
					console.log(movielist[key].name);
				})}
<div className='container'>
      			</div>
<Slider {...settings}>	
				<div><img src='http://placekitten.com/g/400/200' /></div>
				
				
        		</Slider>
{Object.keys(movielist).map(function(key) {
    			
					<img src='http://placekitten.com/g/400/200' />
					
				})}
				*/

var BossRoom = React.createClass({ 
	render: function () {
		return (
			<div>Boss Room</div>
		);
	}
});

var LobbyRoom = React.createClass({ 
	render: function () {
		return (
			<div>Lobby Room</div>
		);
	}
});

var AdRoom = React.createClass({ 
	getInitialState: function() {
        return {
            adlist: [],
			selectedIndex: -1, 
			id: 0, 
			duration: 0,
			pay: 0,  
			failed_cost: 0, 
			name: '' 
        };
    },
	componentDidMount: function () {
		this.socket=this.props.socket;
		var that = this;		
		this.socket.on('adlist', function (adlist) {
			console.log(adlist);
			that.setState({"adlist": adlist, selectedIndex: 0});

			if(typeof(that.state.adlist[0]) != "undefined")
			{
				that.display(0);
			}
			
		});
		//this.socket.emit('getadlist'); 
		console.log('after');
		
	}, 
	next: function () {
		if (this.state.selectedIndex + 1 < this.state.adlist.length) {
  			this.display(this.state.selectedIndex + 1);
		}
		else {
			this.display(0);
		}
	}, 
	previous: function () {
		if ((this.state.selectedIndex  - 1) >= 0) {
			
  			this.display(this.state.selectedIndex - 1);
		}
		else {
			this.display((this.state.adlist.length - 1));
		}
	}, 
	purchase : function (id){
		console.log('purchase' + id);
		this.socket.emit('buysellad', id); 
		//this.setState({selectedIndex: -1});
	}, 
	display: function (index) {
		this.setState({ 
			name: this.state.adlist[index].name, 
			duration: this.state.adlist[index].duration, 
			id: this.state.adlist[index]._id, 
			pay: this.state.adlist[index].pay, 
			failed_cost: this.state.adlist[index].failed_cost, 
			selectedIndex: index});
	}, 
	showadlist: function (type) { 
		this.socket.emit('getadlist', type); 
	}, 
	render: function () {
		var settings = {
    		dots: true
    	}
		return (
			<div>
				Ad Room<br />
				
				<button onClick={() => {this.showadlist('buy')}}>Buy List</button> - <button onClick={() => {this.showadlist('sell')}}>Sell List</button>
				<div>
					<h4>{this.state.name}</h4>
					Pays:{this.state.pay}<br />
					Failed Cost:{this.state.failed_cost}<br />
					Length:{this.state.duration} slot(s)<br />
					
					<button onClick={() => {this.purchase(this.state.id)}}>Buy/Sell</button>
					
				
				<button disabled={!this.state.adlist.length} onClick={this.previous}>Previous</button><button disabled={!this.state.adlist.length} onClick={this.next}>Next</button>
				</div>
				
			</div>
		);
	}
	
	
});

var MyRoom = React.createClass({ 
	render: function () {
		return (
			<div>My Room</div>
		);
	}
});


React.render(
	<Main/>,
	document.getElementById('main')
);


/*
React.render(
	<CommentBox/>,
	document.getElementById('content')
);
*/