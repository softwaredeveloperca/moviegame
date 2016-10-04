/*
var express = require('express')
  , router = express.Router()
  , Comment = require('../models/comment')

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))

router.get('/', function(req, res) {
  Comments.all(function(err, comments) {
    res.render('index', {comments: comments})
  })
})
*/

//var exportmodel = require( "./models/export.js" );
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');
// Database
var mongo = require('mongodb');

var monk = require('monk');
var async = require("async");

var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});

var sharedsession = require("express-socket.io-session");
var roommodel = require( "./models/room.js" );
var initmodel = require( "./models/init.js" );
var util = require( "./models/util.js" );

var database_url='mongodb://localhost/products';

var mongoose = require('mongoose');
mongoose.connect(database_url, function(err) {
	console.log('in error');
    if (err) throw err;
	
});
var models = require('./models/db.js')(mongoose);
controllers = require('./controllers/controllers.js');
module.exports=models;
initmodel.loadData(models);
/*
models.Games.find({'id':1}).remove().exec();
models.Rooms.find({}).remove().exec();
models.Games.find({}).remove().exec();
models.Players.find({}).remove().exec();
models.Movies.find({}).remove().exec();
models.MovieTypes.find({}).remove().exec();
models.Slots.find({}).remove().exec();
models.Ads.find({}).remove().exec();

new models.Games({'name':'game1', _id: 1}).save();
new models.Players({'name':'player1', _id: 1, game_id: 1}).save();

new models.Rooms({'name':'lobby', 'label' : 'Lobby', _id: 1, game_id: 1}).save();
new models.Rooms( {'name':'bossroom', 'label':'Bosses Room', _id: 2, game_id: 1}).save();
new models.Rooms( {'name':'ads', 'label':'Ad Room', _id: 3, game_id: 1}).save();
new models.Rooms( {'name':'myroom', 'label':'My Room', _id: 4, game_id: 1}).save();
new models.Rooms( {'name':'scheduling', 'label':'Scheduling', _id: 5, game_id: 1}).save();

    
new models.RoomActions({'name':'Talk', _id: 2, room_id: 2}).save();
new models.RoomActions({'name':'Leave', _id: 2, room_id: 2}).save();
new models.RoomActions({'name':'Quit', _id: 3, room_id: 1}).save();
new models.RoomActions({'name':'Buy', _id: 4, room_id: 3}).save();
new models.RoomActions({'name':'Sell', _id: 5, room_id: 3}).save();
new models.RoomActions({'name':'Show', _id: 6, room_id: 3}).save();

new models.MovieTypes({'name':'Horror', _id: 1}).save();
new models.MovieTypes({'name':'Comedy', _id: 2}).save();
new models.MovieTypes({'name':'Drama', _id: 3}).save();
new models.MovieTypes({'name':'Action', _id: 3}).save();
new models.MovieTypes({'name':'Romance', _id: 3}).save();

new models.Movies({'name':'Movie 1', _id: 1, game_id: 1, player_id: 0, type: 1, 'duration': 2}).save();
new models.Movies({'name':'Movie 2', _id: 2, game_id: 1, player_id: 0, type: 2, 'duration': 2}).save();
new models.Movies({'name':'Movie 3', _id: 3, game_id: 1, player_id: 0, type: 3, 'duration': 1}).save();
new models.Movies({'name':'Movie 4', _id: 4, game_id: 1, player_id: 0, type: 4, 'duration': 3}).save();
new models.Movies({'name':'Movie 5', _id: 5, game_id: 1, player_id: 0, type: 5, 'duration': 2}).save();
new models.Movies({'name':'Movie 6', _id: 6, game_id: 1, player_id: 0, type: 1, 'duration': 3}).save();
new models.Movies({'name':'Movie 7', _id: 7, game_id: 1, player_id: 0, type: 2, 'duration': 2}).save();
new models.Movies({'name':'Movie 8', _id: 8, game_id: 1, player_id: 0, type: 3, 'duration': 1}).save();
new models.Movies({'name':'Movie 9', _id: 9, game_id: 1, player_id: 0, type: 4, 'duration': 2}).save();
new models.Movies({'name':'Movie 10', _id: 10, game_id: 1, player_id: 0, type: 5, 'duration': 2}).save();

new models.Slots({'name':'6pm', _id: 1}).save();
new models.Slots({'name':'7pm', _id: 2}).save();
new models.Slots({'name':'8pm', _id: 3}).save();
new models.Slots({'name':'9pm', _id: 4}).save();
new models.Slots({'name':'10pm', _id: 5}).save();
new models.Slots({'name':'11pm', _id: 6}).save();
new models.Slots({'name':'12am', _id: 7}).save();


new models.Ads({'name':'ad1', _id: 1, 'failed_cost': 50, 'pay': 200, 'player_id': 0, 'game_id': 1, 'duration': 3}).save();
new models.Ads({'name':'ad2', _id: 2, 'failed_cost': 20, 'pay': 100, 'player_id': 0, 'game_id': 1, 'duration': 2}).save();
new models.Ads({'name':'ad3', _id: 3, 'failed_cost': 40, 'pay': 190, 'player_id': 0, 'game_id': 1, 'duration': 3}).save();
new models.Ads({'name':'ad4', _id: 4, 'failed_cost': 100, 'pay': 400, 'player_id': 0, 'game_id': 1, 'duration': 1}).save();
new models.Ads({'name':'ad5', _id: 5, 'failed_cost': 4, 'pay': 20, 'player_id': 0, 'game_id': 1, 'duration': 3}).save();
new models.Ads({'name':'ad6', _id: 6, 'failed_cost': 6, 'pay': 50, 'player_id': 0, 'game_id': 1, 'duration': 4}).save();
new models.Ads({'name':'ad7', _id: 7, 'failed_cost': 12, 'pay': 80, 'player_id': 0, 'game_id': 1, 'duration': 3}).save();
*/





var clients = [];
var timers = [];
var all_games = [];
// Use express-session middleware for express
app.use(session); 

// Use shared session middleware for socket.io
// setting autoSave:true
io.use(sharedsession(session, {
    autoSave:true
})); 
/*
mongo.connect("mongodb://localhost:27017/products", function(err, db) {
  if(!err) {
    console.log("We are connected");
    findG(db, function() {
      db.close();
    });
  } 
});

var findG = function(db, callback) {
	console.log('we call back');
   var cursor =db.collection('products').find({"item":"card"});
   cursor.each(function(err, doc) {
   	console.log('in cursor');
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};
*/

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/client.html');
});

app.get('/react', function(req, res){
  res.sendFile(__dirname + '/react.html');
});


app.get('/client', function(req, res){
  res.sendFile(__dirname + '/client/client.html');
});

app.get('/public', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/app.jsx', function(req, res){
  res.sendFile(__dirname + '/public/app.jsx');
});

app.get('/public/style.css', function(req, res){
  res.sendFile(__dirname + '/public/style.css');
});



app.get('/client/models/rooms.js', function(req, res){
  res.sendFile(__dirname + '/client/models/rooms.js');
});

var sendComments = function (socket) {
	fs.readFile('_comments.json', 'utf8', function(err, comments) {
		comments = JSON.parse(comments);
		socket.emit('comments', comments);
	});
};


function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}


function getScheduleDay(day, results)
{
	return Math.round(results.counter/(results.slot_interval*results.number_slots))+1+day;
}
function getSocketUserClient(socket_id)
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

function make_id()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function broadcast_gameid(tag, data, game_id)
{

	models.Players.find({game_id: game_id}).exec(function(playererr, playerresult) { 
		for($x=0; $x<playerresult.length; $x++)
		{
			client=getSocketUserClient(playerresult[$x]._id);
			if(client)
			{
				client.emit(tag, data);
			}
		}
	});	
}

function broadcast(tag, data, socket_id)
{
		client=getSocketUserClient(socket_id);
        client.emit(tag, data);
}


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('joined', function(msg){
  	console.log("aaa"+msg);
    io.emit('chat message', msg);
  });

  socket.on("loggedin", function(){
  	io.emit('loggedin', true);
  });

  socket.on("getUserData", function(){
  	io.emit('chat message',  socket.handshake.session.userdata + 'other data');
  });
  
  socket.on('fetchComments', function () {
		sendComments(socket);
	});
	
	socket.on('newComment', function (comment, callback) {
		fs.readFile('_comments.json', 'utf8', function(err, comments) {
			comments = JSON.parse(comments);
			comments.push(comment);
			fs.writeFile('_comments.json', JSON.stringify(comments, null, 4), function (err) {
				io.emit('comments', comments);
				callback(err);
			});
		});
	});

   socket.on("ChangeRooms", function(room){
    client=getSocketUserClient(socket.id);
   if(socket.handshake.session.userdata){
	roommodel.sendRoomContent(client, room, models);
   }

   });
   
   socket.on("buysellmovie", function(movie_id){
	  
	 	var player_id=socket.id;
		client=getSocketUserClient(socket.id);
		console.log("player"+player_id);
		console.log("movie_id"+movie_id);
		models.Movies.find({"_id": movie_id}).exec(function(err, result) {
			console.log('find movie' + movie_id);
			console.log(result);
			if(result[0]['_id'])
			{
				result=result[0];
			}
			console.log(result);
			
			if(!result._id)
			{
				console.log('no movie found.');
				client.emit('gamemessage', 'No Movie Found.');  
			}
			else if(result.player_id==player_id)
			{
				console.log('movie and player found.  Sell');
				models.Movies.findOneAndUpdate({"_id": movie_id},{"player_id" : 0}).exec(function(err, result) {
					if (err) {
						client.emit('gamemessage', 'Error.  Unable to sell.' + err.toString());    
					} else {
					   client.emit('gamemessage', 'Movie was sold.');     
					}
					
					});
			}
			else if(result.player_id==0) 
			{
				console.log('movie found no owner.  Buy: MovieID'+movie_id+ ' PlayerID' + player_id);
					models.Movies.findOneAndUpdate({"_id": movie_id},{"player_id" : player_id}).exec(function(err, result) {
					if (err) {
						client.emit('gamemessage', 'Error.  Unable to buy.' + err.toString());    
					} else {
					   client.emit('gamemessage', 'Movie was bought.');     
					}
					
					});
			}
			else if(result.player_id!=player_id)
			{
				console.log('movie found.  belongs to someone else');
				client.emit('gamemessage', 'Movie belongs to someone else.');  
			}
       
		
		});
   });
   
   socket.on("buysellad", function(ad_id){
	  
	 	var player_id=socket.id;
	
		console.log("player"+player_id);
		console.log("ad_id"+ad_id);
		models.Ads.find({"_id": ad_id}).exec(function(err, result) {
			console.log('find ad' + ad_id);
			console.log(result);
			if(result[0]['_id'])
			{
				result=result[0];
			}
			console.log(result);
			
			if(!result._id)
			{
				console.log('no ad found.');
				client.emit('gamemessage', 'No ad Found.');  
			}
			else if(result.player_id==player_id)
			{
				console.log('ad and player found.  Sell');
				models.Ads.findOneAndUpdate({"_id": ad_id},{"player_id" : 0}).exec(function(err, result) {
					if (err) {
						client.emit('gamemessage', 'Error.  Unable to sell.' + err.toString());    
					} else {
					   client.emit('gamemessage', 'ad was sold.');     
					}
					
					});
			}
			else if(result.player_id==0) 
			{
				console.log('ad found no owner.  Buy: adID'+ad_id+ ' PlayerID' + player_id);
					models.Ads.findOneAndUpdate({"_id": ad_id},{"player_id" : player_id}).exec(function(err, result) {
					if (err) {
						client.emit('gamemessage', 'Error.  Unable to buy.' + err.toString());    
					} else {
					   client.emit('gamemessage', 'ad was bought.');     
					}
					
					});
			}
			else if(result.player_id!=player_id)
			{
				console.log('ad found.  belongs to someone else');
				client.emit('gamemessage', 'ad belongs to someone else.');  
			}
       
		
		});
  // }

   });

	socket.on("getschedulelist", function(day)
	{
		models.Players.findOne({"_id" : socket.id}).exec(function(err, playerresults){
			if (err) {
				console.log('error');
			} else {

				models.Games.findOne({"_id" : playerresults.game_id}).exec(function(err, results){
					models.Slots.find({"game_id" : playerresults.game_id}).exec(function(err, slots){
						//schedule_day=Math.round(results.counter/(results.slot_interval*results.number_slots))+1+day;
						schedule_day=getScheduleDay(day, results);
				
						models.Schedules.find({"game_id" : results._id, day: parseInt(schedule_day), players : { $elemMatch: { player_id: socket.id} }},{'game_id':1,'day':1,'slot_id':1,'players': { $elemMatch: { player_id: socket.id} }}).exec(function(err, result) {
							if (err) {
								console.log('error');
							} else {

								var returnschedule=[];

								slots.forEach(function(slot) {
									result.forEach(function(entry){
									    if(entry.slot_id==slot.slot_id)
									    {
									    	player=entry.players.pop();
									    	//slot.name=player.movie_id + '\n Part: ' + player.movie_part;
									    	//slot[movie_id]=player.movie_id;
									    	slot={"name":player.movie_id + '\n Part: ' + player.movie_part, 
									    		   "movie_id":player.movie_id, 
									    		"slot_id":slot.slot_id, 
									    		"game_id":slot.game_id, 
									    		"_id":slot.slot_id};
									    }		    	
									});

									returnschedule.push(slot);
								});
								broadcast('schedulelist', returnschedule, socket.id);    
							}
						});
					});
				});
			}
		});
	});

	
	socket.on("autoschedule", function(day){

		models.Players.findOne({"_id" : socket.id}).exec(function(err, result){
			models.Games.findOne({"_id" : result.game_id}).exec(function(err2, results){
				schedule_day=getScheduleDay(day, results);
				models.Movies.find({"game_id" : results._id, player_id: socket.id}).exec(function(err3, movies) {

				//	models.Schedules.find({"game_id" : results._id, day: schedule_day},{'game_id':1,'day':1,'slot_id':1,'players': { $elemMatch: { player_id: socket.id} }}).exec(function(err4, schedule) {
						
					models.Schedules.update({"game_id" : results._id, day: schedule_day},{ $pull: { "players" : { player_id: socket.id} } },{multi: true}).exec(function(err4, schedule) {

						movies_scheduled=[];
						for(var x=1; x<=results.number_slots; x++)
						{
							shuffle(movies);
							movies.forEach(function(movie) {

									if(movie.duration <= (results.number_slots-x+1))
									{
										console.log('scheduling movie' + x);
										console.log(movie);
										console.log(movie.duration);
										for(var y=0;y<movie.duration;y++)
										{
											console.log({"game_id": result.game_id, "slot_id" : (x+y) },
													  {$push : { players : {
																				ad_id: 0, 
																				movie_id: movie.name, 
																				player_id: socket.id, 
																				player_name: '', 
																				movie_part: (y+1)
																 } }
															  },{upsert: true});

											models.Schedules.findOneAndUpdate({"game_id": result.game_id,  name: 'Timeslot '+(x+y), day: schedule_day, "slot_id" : (x+y) },
													  {$push : { players : {
																				ad_id: 0, 
																				movie_id: movie.name, 
																				player_id: socket.id, 
																				player_name: '', 
																				movie_part: (y+1)
																 } }
															  },{upsert: true}).exec(function(err, scheduleresult) {
											});
											
										}
										x=movie.duration+x;
										//cont=false;	

									}
								});
								broadcast('deletemoviecomplete', true, socket.id); 

						}


	    			});
				});
		    });
		});
	});


	socket.on("addschedulemovie", function(day, movie_id, slot_id, movie_name, length){
	 
		console.log('adding schedule '+'day'+day+'movie:'+movie_id+"slot"+slot_id+"Moviename"+movie_name+"length"+length);


		models.Players.findOne({"_id" : socket.id}).exec(function(err, result){
			models.Games.findOne({"_id" : result.game_id}).exec(function(err2, results){
				schedule_day=getScheduleDay(day, results);
				console.log('schedule day'+schedule_day);
				var cnt=0;
				var extra_day=0;
				for(var x=parseInt(slot_id);x<(parseInt(slot_id)+parseInt(length));x++)
				{
					// Schedule next day if movie goes over
					if(x > results.number_slots)
					{
						extra_day=1;
						current_x=x-results.number_slots;
					}
					else 
					{
						extra_day=0;
						current_x=x;
					}
						console.log('counter'+x);
						cnt++;
						console.log({"game_id": result.game_id, day: schedule_day+extra_day, name: 'Timeslot '+(current_x), "slot_id" : current_x },
														  {
														  $push : { players : {
																					ad_id: 0, 
																					movie_id: movie_name, 
																					player_id: socket.id, 
																					player_name: '', 
																					movie_part: (cnt)
																	 } }
																  });

						//models.Schedules.update({"game_id" : results._id, day: schedule_day+extra_day, slot_id: current_x},{ $pull: { "players" : { player_id: socket.id} } },{multi: true}).exec(function(err4, schedule) {

							models.Schedules.findOneAndUpdate({"game_id": result.game_id, day: schedule_day+extra_day, name: 'Timeslot '+(current_x), "slot_id" : current_x },
															  {
															  $push : { players : {
																						ad_id: 0, 
																						movie_id: movie_name, 
																						player_id: socket.id, 
																						player_name: '', 
																						movie_part: (cnt)
																		 } }
																	  },{upsert: true}).exec(function(err, scheduleresult) {
							});
						//});
					//}
				}

				broadcast('deletemoviecomplete', true, socket.id); 
			});
		
		});
  // }

    });

	socket.on("deletemovieschedule", function(data){
	 
		console.log('deleting schedule movie:');
		//console.log(data);
		models.Players.findOne({"_id" : socket.id}).exec(function(err, result){
			models.Games.findOne({"_id" : result.game_id}).exec(function(err2, results){
				//console.log('results');
				//console.log(results);
				schedule_day=getScheduleDay(data.day, results);
				console.log(schedule_day);
				//console.log({"game_id" : results.game_id, day: schedule_day}{ $pull: { "players" : { player_id: socket.id, movie_id: movie_id } } });
				//console.log({"game_id" : results._id, day: schedule_day},{ $pull: { "players" : { player_id: socket.id, movie_id: data.movie_id } } });
				//console.log(models);
				models.Schedules.update({"game_id" : results._id, day: schedule_day},{ $pull: { "players" : { player_id: socket.id, movie_id: data.movie_id } } },{multi: true}).exec(function(err3, schedule) {

					if (err3) {
						console.log('error');
					} else {
						
							//broadcast('movielist', result, socket.id); 
							//for (var socketId in io.namespaces['/mynamespace'].sockets) {
						   // var socket = io.namespaces['/mynamespace'].sockets[socketId];
						 //   var params = ['test event', {'foo': 'bar'}];
					
						   
						    broadcast('deletemoviecomplete', true, socket.id); 

						//    socket.$emit.apply(socket, params).
		//}
			 
					}
			
				});
			});
		
		});
  // }

    });
   
   socket.on("getmovielist", function(type){
	 
		if(type=="sell"){
			player_id=socket.id;
		}
		else if(type=="schedule"){
			player_id=socket.id;
		}
		else 
		{
			player_id=0;
		}

		models.Players.findOne({"_id" : socket.id}).exec(function(err, results){
			
			models.Movies.find({"player_id" : player_id, "game_id" : results.game_id}).exec(function(err, result) {

			if (err) {
				console.log('error');
			} else {
				if(type=="schedule")
				{
					broadcast('movielist', result, socket.id); 
				}
				else 
				{
					broadcast('movielist', result, socket.id); 
				}
			 	    
			}
			
			});
		
		});
  // }

   });
   
   socket.on("getadlist", function(type){
	
		if(type=="sell"){
			player_id=socket.id;
		}
		else 
		{
			player_id=0;
		}
	
		models.Players.findOne({"_id" : socket.id}).exec(function(err, results){
			models.Ads.find({"player_id" : player_id, "game_id" : results.game_id}).exec(function(err, result) {
		        if (err) {
		            console.log('error');
		        } else {
				   broadcast('adlist', result, socket.id);
	   
		        }
			
			});
		});

   });
   
   var countdown = 0;  
   
   socket.on("timercontrol", function(data){
	   models.Players.findOne({'_id' : socket.id }).exec(function(err, result) {
        if (err) {
            console.log('error');
			return false;
        } else {
			if(data=="restart")
		   {
				models.Games.findOneAndUpdate({"_id": result.game_id},{ status: data, timer: 0, counter: 0, day: 1 } ).exec(function(err2, result2) {
						models.Movies.find({"game_id": result.game_id}).update({ player_id: 0  }).exec(function(err2, result2) {
						});
						models.Ads.find({"game_id": result.game_id}).update({ player_id: 0  }).exec(function(err2, result2) {
						});
				});
		   }
		   else if(data=="speed")
		   {
			   models.Games.findOne({"_id": result.game_id}).exec(function(err3, result3) {
						if(result3['speed'] < 4)
						{
							models.Games.findOneAndUpdate({"_id": result.game_id},{ $inc: { "speed": 1 }}).exec(function(err2, result2){ });
							
						}
				});
		   }
		   else if(data=="slow")
		   {
			   models.Games.findOne({"_id": result.game_id}).exec(function(err3, result3) {
						if(result3['speed'] > 1)
						{
							models.Games.findOneAndUpdate({"_id": result.game_id},{ $inc: { "speed": -1 }}).exec(function(err2, result2){ });
						}
				});
		   }
		   else 
		   {
		   	 if(result.game_id){
		   	 	models.Games.findOneAndUpdate({"_id": result.game_id},{ status: data } ).exec(function(err2, result2) {
				
				});
		   	 }
		   }
		}
	 });
	  
   });
	

  socket.on("login", function(userdata) {
  		console.info('New client connected (id=' + socket.id + ').');
		console.log('user data'+userdata);
    	clients.push(socket);
        socket.handshake.session.userdata = socket.id;
        socket.emit('loggedin', 'Logged in.');
        var index = clients.indexOf(socket);
        if (index != -1) {
            console.info('Client logged in (id=' + socket.id + ').');
        }
		var game_id=1;
		//if(userdata=='')
		// {
		//	 userdata="Unknown";
		//}
		console.log('userdata');
		console.log(userdata);
        models.Games.findOne({'players' : { $lt: 4} }).exec(function(err, result) {
        if (err) {
            console.log('error');
			return 1;
        } else {
            if(!result){
			  var game_id=make_id();
			  var num_slots=8;
              Game = new models.Games({'name': game_id, '_id':game_id, 'speed': 1, 'day': 1, 'counter': 0, 'heartbeat': 2, 
              							'population': 100000, 'slot_interval': 15, 'number_slots': num_slots, 'players': 1, 'status': 'pause', 'type': userdata.gamevs}).save(
			  function(err, created) {
	 	
	 				util.setup_slots(game_id, models, num_slots);
					util.setup_player_new_game(game_id, models, 10, socket.id);
					util.setup_player_new_game(game_id, models, 40, 0);
			  
			  });

			 Player = new models.Players({'name':userdata.loginName, '_id': socket.id, 'game_id': game_id, 'money': 2000})
			 .save(function(err, created) {

				}
			 );
		

			  util.broadcast_gameid('gamemessage', 'player'+socket.id+' has joined the game', game_id, models);
			  socket.emit('newgame', 'newgame');
		
			  
			//  console.log(Game);
			 // timers[game_id] = setTimeout(function() { socket.emit('tick', 'aa'); }, 1000);
			   var counter=0;
			   
			   if(!timers[game_id]){
				  timers[game_id]=setInterval(function() {  
					
					
					models.Games.findOne({"_id": game_id}).exec(function(err, result) {
						//console.log('findone');
						//console.log(result);
						if(result)
						{
							counter=counter+(result['heartbeat']*result['speed']);
							models.Games.findOneAndUpdate({"_id": game_id, 'status': 'play'},{ $inc: { "counter": (result['heartbeat']*result['speed']) }}).exec(function(err2, result2){ });
							if(result['status']=="play")
							{
								counter=result['counter'];
								console.log('find game');
								var currentslot=parseInt(result['counter'])%parseInt(result['slot_interval']);
								if(currentslot<(result['heartbeat']*result['speed']))
								{

									//models.Schedules.findOneAndUpdate({"game_id": game_id, "slot_id" : (currentslot-1) },{}).exec(function(err, schedulecalulate) {
									//});

									var current_day=schedule_day=getScheduleDay(0, result);

									//{ "price" : { "$exists" : false } }
									models.Schedules.findOneAndUpdate({"game_id": game_id, day: current_day, "slot_id" : currentslot},{}).exec(function(err, scheduleresult) {
										console.log('schedule result');
										console.log(scheduleresult);

										if(scheduleresult)
										{
											//var scheduleoutput = Array.prototype.slice.call(scheduleresult);
											console.log(scheduleresult.players);
											broadcast_gameid('schedule',  scheduleresult.players, game_id);

											//var data=Object.keys(scheduleresult).map(function (key) {return scheduleresult[key]});
											//var indents = [];
											//for (var i = 0; i < this.props.level; i++) {
	//										  indents.push(<span className='indent' key={i}></span>);
											//}
											//socket.emit('schedule',  data);
										}
									});
								}

								var data={ time_count: Number(counter) };
								broadcast_gameid('tick', data, game_id);
							}		
							else if(result['status']=="restart")
							{
								counter=0;
								models.Games.findOneAndUpdate({"_id": game_id},{ day : 1, counter : 0, status: 'pause'}).exec(function(err2, result2){ });	
								broadcast_gameid('tick', data, game_id);
							}
						}
					});
				  }, 2000);
			   }
            }
			else { 
			
				models.Games.findOneAndUpdate({"_id": result._id},{ $inc: { "players": 1 }}).exec(function(err, result) {
					Player = new models.Players({'name':userdata.loginName, '_id': socket.id, 'game_id': result._id, 'money': 2000}).save();
				//	io.emit('gamemessage', 'player'+socket.id+' has joined the game');
					console.log('before setup player join'); 
					util.initial_schedule_movie(result._id, socket.id, models, 1);
					util.setup_player_join(result._id, socket.id, models, 9);

					//util.add_player_ads(game_id, player_id, models, 10);
					broadcast_gameid('gamemessage', 'player'+socket.id+' has joined the game', result._id);
					socket.emit('newgame', 'newgame');
				});
				
			}
        }
	
      	});
    });

  socket.on("logout", function(userdata) {
  		var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('Client gone (id=' + socket.id + ').');
        }
	
  		console.info('Deleting client connected (id=' + socket.id + ').');
        if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
        }
        socket.emit('loggedoff', 'Logoff.');
		
		models.Players.findOne({"_id": socket.id}).exec(function(err, result) {
			models.Players.find({"_id": socket.id}).remove().exec();
			console.log('after player deletes result');
			console.log(result);
			if(result === null)
			{
				return false;
			}
			console.log('pAST NULL CHECK');
			//if(!result.hasOwnProperty('game_id'))
			//{
			//	return false;
			//}
			console.log(result.game_id);
			if(result.game_id)
			{
				console.log('in found player game' + result.game_id);
				models.Games.findOne({"_id": result.game_id}).exec(function(err2, result2) {
					if(result2._id)
					{
						if(result2.players < 2)
						{
							clearInterval(result2.game_id);
        					timers[result2.game_id]=null;
							models.Games.findOne({'_id': result.game_id}).remove().exec();
							broadcast_gameid('gamemessage', 'all players have has left the game', result2.game_id);
						}
						else 
						{
							models.Games.findOneAndUpdate({"_id": result.game_id},{ $inc: { "players": -1 }}).exec(function(err, result) {
							//	new models.Players({'name':'player'+socket.id, '_id': socket.id, 'game_id': result._id, 'money_id': 2000}).save();
								broadcast_gameid('gamemessage', 'player'+socket.id+' has left the game', result.game_id);

							});
						}
					}
					
				});	
			}
			
		});
    }); 

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
