module.exports = {
	loadData: function(models){
		models.Games.find({'id':1}).remove().exec();
models.Rooms.find({}).remove().exec();
models.Games.find({}).remove().exec();
models.Players.find({}).remove().exec();
models.Movies.find({}).remove().exec();
models.MovieTypes.find({}).remove().exec();
models.Slots.find({}).remove().exec();
models.Ads.find({}).remove().exec();
models.Schedules.find({}).remove().exec();

	//	new models.Games({'name':'game1', _id: 1}).save();
//new models.Players({'name':'player1', _id: 1, game_id: 1}).save();

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
new models.MovieTypes({'name':'Action', _id: 4}).save();
new models.MovieTypes({'name':'Romance', _id: 5}).save();

new models.Movies({'name':'Movie 1', _id: 1, game_id: 1, player_id: 0, cost: 500, type: 'Comedy', 'duration': 2}).save();
new models.Movies({'name':'Movie 2', _id: 2, game_id: 1, player_id: 0, cost: 500,  type: 'Comedy', 'duration': 2}).save();
new models.Movies({'name':'Movie 3', _id: 3, game_id: 1, player_id: 0, cost: 500,  type: 'Drama', 'duration': 1}).save();
new models.Movies({'name':'Movie 4', _id: 4, game_id: 1, player_id: 0, cost: 500,  type: 'Action', 'duration': 3}).save();
new models.Movies({'name':'Movie 5', _id: 5, game_id: 1, player_id: 0, cost: 500,  type: 'Romance', 'duration': 2}).save();
new models.Movies({'name':'Movie 6', _id: 6, game_id: 1, player_id: 0, cost: 500,  type: 'Horror', 'duration': 3}).save();
new models.Movies({'name':'Movie 7', _id: 7, game_id: 1, player_id: 0, cost: 500,  type: 'Comedy', 'duration': 2}).save();
new models.Movies({'name':'Movie 8', _id: 8, game_id: 1, player_id: 0, cost: 500,  type: 'Drama', 'duration': 1}).save();
new models.Movies({'name':'Movie 9', _id: 9, game_id: 1, player_id: 0, cost: 500, type: 'Action', 'duration': 2}).save();
new models.Movies({'name':'Movie 10', _id: 10, game_id: 1, player_id: 0, cost: 500, type: 'Romance', 'duration': 2}).save();

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

		return true;
	}
}
