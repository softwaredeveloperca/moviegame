module.exports = function(mongoose) {
    var Games = new mongoose.Schema({
        name                :   {type: String, index: true}, 
        _id 				:  	{type: String, index: true},
		day            		:   Number, 
		speed            	:   Number, 
		counter			 	:	Number, 
		players				:   Number , 
		status				:   String, 
        slot_interval       :   Number, 
        number_slots        :   Number, 
        heartbeat           :   Number, 
        population          :   Number, 
		type				:   String
    });

    var Players = new mongoose.Schema({
        name                :    {type: String, index: true}, 
        _id   				:    { type: String, index: true},
        game_id             :    String, 
		money				:    Number
    });

    var Rooms = new mongoose.Schema({
        name                :    {type: String, index: true},  
        _id :  { type: Number },
        game_id             :    Number, 
        label               :    String
    });

    var RoomActions = new mongoose.Schema({
        name                :    {type: String, index: true}, 
        _id :  { type: Number },
        room_id             :    Number, 
    });

    var Movies = new mongoose.Schema({
        name                :    {type: String, index: true}, 
        _id :  { type: String, index: true },
        cost                :    Number, 
        type                :    String,
        player_id           :    String, 
        duration            :    Number, 
        game_id             :    String 
    });

    var MovieTypes = new mongoose.Schema({
        name                :    {type: String, index: true}, 
        _id                 :  { type: Number },
        cost                :    Number 
    });

    var Ads = new mongoose.Schema({
        name                :    {type: String, index: true}, 
        _id :  { type: String },
        game_id             :    String, 
        failed_cost         :    Number, 
        pay                 :    Number, 
        duration            :    Number, 
        player_id           :    String
    });

    var Schedules = new mongoose.Schema({
        name                :    {type: String, index: true}, 
        _id :  { type: String },
        game_id             :    String, 
        slot_id             :    Number,  
        day                 :    Number, 
        players             :  [ {ad_id               :    String, 
                                 movie_id            :    String, 
                                 player_id           :    String, 
                                 player_name         :    String,
                                 movie_part          :    Number,
                                }
                               ]
    });

    var Slots = new mongoose.Schema({
        name                :    {type: String, index: true}, 
        _id                 :    { type: String },
        game_id             :  String,  
        slot_id             :  Number
    });

var models = { 
      Games : mongoose.model('Games', Games), 
      Players : mongoose.model('Players', Players), 
      RoomActions : mongoose.model('RoomActions', RoomActions), 
      Rooms : mongoose.model('Rooms', Rooms), 
      Ads : mongoose.model('Ads', Ads), 
      Movies : mongoose.model('Movies', Movies), 
      MovieTypes : mongoose.model('MovieTypes', MovieTypes), 
      Schedules : mongoose.model('Schedules', Schedules), 
      Slots : mongoose.model('Slots', Slots), 
    };
    return models;
}
