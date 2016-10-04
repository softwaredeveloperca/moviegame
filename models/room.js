/*
module.exports = {
  escape: function(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },
  unescape: function(html) {
    return String(html)
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, '\'')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  },
  test: function(){
    return 'testaaa';
  }
};
*/
module.exports = {
  test: function(){
      return 'this works';
  }, 
  sendRoomContent: function(who, room, models){
      var color="#567891";
      switch (room)
      {
        case "myroom":
          color="123456";
		models.Schedules.find({player_id: 0}, function (err, docs) {
         who.emit('adlist', docs);
        });
        break;
		case "lobby":
          color="FFCCFF";
		  who.emit('changecurrentroom', room, color, []);
        break;
        case "bossroom":
          color="987654";
        break;
        case "ads":
          color="167890";
			models.Ads.find({player_id: 0}, function (err, docs) {
				console.log('found ads');
				console.log(docs);
				who.emit('changecurrentroom', room, color, docs);
        	});
        break;
		case "movies":
          color="167890";
			models.Movies.find({player_id: 0}, function (err, docs) {
				console.log('found movie');
				console.log(docs);
				who.emit('changecurrentroom', room, color, docs);
        	});
        break;
        case "scheduling":
          color="345678";
        break;
      }
  }
};
