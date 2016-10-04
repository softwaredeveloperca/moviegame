module.exports = {
  create_movie: function(models)
  {
  },
  create_ad: function(models)
  {
  },
  create_init_player: function(models, player)
  {
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
//console.log('clients');
  //console.log(clients);
 // console.log('socket_id');
  //console.log(socket_id);
  var index = clients.indexOf(socket_id);
 // console.log('index');
 // console.log(index);
 // console.log(clients[index]);
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