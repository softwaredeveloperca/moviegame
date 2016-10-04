module.exports = {  
  initial_schedule_movie: function(game_id, player_id, models, how_many)
  {
  	 var movie_id='';
	 var duration=0;
	
	 for(var j=0; j < how_many; j++)
	 {		
	
		var query = {player_id: "0", game_id: game_id};
		var update = {player_id: player_id};
		var options = {};

		models.Movies.findOneAndUpdate(query, update, options, function(err, person) {
			
		  models.Ads.findOneAndUpdate(query, update, options, function(err2, person2) {
		  	if (err) {
				console.log('got an error');
		  	}

		  	movie_id=person["_id"];
			ad_id=person2["_id"];
			duration=person["duration"];
		
			 for(var x=0; x<duration; x++){
				models.Schedules.findOneAndUpdate({"game_id": game_id, day: 1, name: 'Timeslot '+(x+1), "slot_id" : (x+1) },
												  {$push : { players : {
																			ad_id: ad_id, 
																			movie_id: movie_id, 
																			player_id: player_id, 
																			player_name: player_id, 
																			movie_part: (x+1)
															 } }
														  },{upsert: true}).exec(function(err, scheduleresult) {
				});
													
			 }
		}); 
		
		}); 

		
  	  }
  }, 
  setup_player_join: function(game_id, player_id, models, how_many)
  {
	 var movie_id='';
	 var duration=0;
	
	 for(var j=0; j < how_many; j++)
	 {
		
		var query = {player_id: "0", game_id: game_id};
		var update = {player_id: player_id};
		var options = {};

		models.Movies.findOneAndUpdate(query, update, options, function(err, person) {	
		  models.Ads.findOneAndUpdate(query, update, options, function(err2, person2) {
		  		if (err) {
					console.log('got an error');
		  		}
		
		   }); 
		
		}); 

		
  	  }

  },
  setup_slots: function(game_id, models, num_slots)
  {
  	  for(var j=1; j <= num_slots; j++)
	  {
	  		slots_module=new models.Slots({'name':"Timeslot " + j, _id: j+Date.now(), 'game_id': game_id, slot_id: j}).save(function(err, created) {
			  	  
  			if( err || !created )
			{ 
				console.log("Movie not created");
			}
  			else 
			{   

			}
			
			
		});
	  }
  },
  setup_player_new_game: function(game_id, models, amount, player_id)
  {
	  console.log('in create movie');
	  var that=this;
	  var players_amt_cnt=0;
	  for(var j=0; j <= amount; j++)
	  {
	  	var cost= Math.floor((Math.random() * 500) + 20);
	  	var types = ['Horror','Comedy', 'Drama', 'Action', 'Romance'];
	  	var type = types[Math.floor(Math.random()*types.length)];
	  	var duration= Number(Math.floor((Math.random() * 4) + 1));
	  	var name = "";
	  	var movie_id = "";
		var ad_name = "";
		var ad_id = "";
		
		var ad_duration= Math.floor((Math.random() * 4) + 1);
		var pay=Math.floor((Math.random() * 500) + 50);
		var failed_pay=Math.floor((Math.random() * (pay / 5)) + 10);
		
	  
	  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		
		
		for( var i=0; i < 8; i++ )
       	 ad_name += possible.charAt(Math.floor(Math.random() * possible.length));
		 
		 for( var i=0; i < 5; i++ )
       	 ad_id += possible.charAt(Math.floor(Math.random() * possible.length));

    	for( var i=0; i < 8; i++ )
       	 name += possible.charAt(Math.floor(Math.random() * possible.length));
	
	 	for( var i=0; i < 5; i++ )
       	 movie_id += possible.charAt(Math.floor(Math.random() * possible.length));
		 
		 
		

			ad_module=new models.Ads({'name':ad_name, _id: ad_id, 'failed_cost': Number(failed_pay), 'pay': Number(pay), 'player_id': player_id, 'game_id': game_id, 'duration': ad_duration}).save(function(err, created) {
			  	  
  			if( err || !created )
			{ 
				console.log("Movie not created");
			}
  			else 
			{   

			}
			
			
		});
		
		//console.log({'name':name, _id: movie_id, game_id: game_id, player_id: 0, cost: cost, type: type, 'duration': duration});
		  movie_module=new models.Movies({'name':name, _id: movie_id, game_id: game_id, player_id: player_id, cost: Number(cost), type: type, 'duration': duration}).save(function(err, created) {
			  	  
  			if( err || !created )
			{ 
				console.log("Movie not created");
			}
  			else 
			{   

			}
			
			
		});
		
		if(j==0 && player_id != 0)
				{

					
					console.log('schedule movie'+movie_id);
					console.log('duration'+duration)
			   		for(var x=0; x<duration; x++){
					
						var schedule={ "_id": movie_id+1+ad_id+x,  
										day: 1, slot_id: (x+1), 
										game_id: game_id, 
										name: 'Timeslot '+(x+1), 
										players: [{
													ad_id: ad_id, 
													movie_id: movie_id, 
													player_id: player_id, 
													player_name: player_id, 
													movie_part: (x+1)
												}] 
									  };
																						
						console.log(schedule);	
						var schedule_module=new models.Schedules(schedule).save(function(err, created) {
			  	  
						});															
			   		}
		}
	  }
	  console.log('end');
	   
  },
  broadcast_gameid: function(tag, data, game_id, models)
  {
      models.Players.find({game_id: game_id}).exec(function(playererr, playerresult) { 
	
		for($x=0; $x<playerresult.length; $x++)
		{
				console.log(playerresult[$x]);
				client=getSocketUserClient(playerresult[$x]._id);
				if(client)
				{
					console.log('sending'+playerresult[$x]._id);
					console.log(tag);
					console.log(data);
					client.emit(tag, data);
				}
			}
		});
   }, 
   broadcast:  function(tag, data, socket_id, models)
   {
		if(tag != "tick"){
	//	console.log('broadcast');
		//console.log(tag);
	//	console.log(data);
		}
	
	models.Players.findOne({'_id' : socket_id }).exec(function(err, result) {
		
		if (err) {
            console.log('error');
			return false;
        } else {
			//console.log('results');
			
			//console.log(result.length);
            if(result.game_id){
				models.Players.find({game_id: result.game_id}).exec(function(playererr, playerresult) { 
				
					for($x=0; $x<playerresult.length; $x++)
					{
						console.log(playerresult[$x]);
						this.client=getSocketUserClient(playerresult[$x]._id);
						if(client)
						{
							if(tag != "tick"){
							//console.log('sending'+playerresult[$x]._id);
							//console.log(tag);
							//console.log(data);
							}
							client.emit(tag, data);
						}
					}
				});
			}
			else {
					console.log('nogame_id');
					return '';
				}
			}
	 });
	
	}, 
	getSocketUserClient: function(socket_id)
	{

  var index = clients.indexOf(socket_id);

   for(var a=0; a<clients.length; a++)
	{
	     if(clients[a].id==socket_id)
	      {
	        return clients[a];
	      }
	  }
  return null;
}
}