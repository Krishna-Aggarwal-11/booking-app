const mongoose  = require("mongoose") 

const PlaceSchema = new mongoose.Schema({
    owner : {type : mongoose.Schema.Types.ObjectId,ref:'User'},
    title : String ,
    address:String,
    photo :[String],
    perks :[String],
    description : String,
    extraInfo : String,
    checkIn :Number,
    checkOut :Number,
    maxGuests :Number,
    price :Number,

})

const PlaceModel = mongoose.model("Place", PlaceSchema);

module.exports = PlaceModel ;