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
  }, 
  getRoomContent: function(who, room){
      var color="#567891";
      switch (room)
      {
        case "room":
          color="123456";
        break;
        case "bossroom":
          color="987654";
        break;
        case "ads":
          color="167890";
        break;
        case "scheduling":
          color="345678";
        break;
      }
      return color;
  }
};

module.exports = function(mongoose) {
    var Material = new Schema({
        name                :    {type: String, index: true},
        id                  :    ObjectId,
        materialId          :    String,
        surcharge           :    String,
        colors              :    {
            colorName       :    String,
            colorId         :    String,
            surcharge       :    Number
        }
    });
    // declare seat covers here too
    var models = {
      Materials : mongoose.model('Materials', Material),
      SeatCovers : mongoose.model('SeatCovers', SeatCover)
    };
    return models;
}