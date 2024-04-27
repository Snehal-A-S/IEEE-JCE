const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    eventName:String,
    eventDate:String,
    eventVenue:String,
    eventDescription:String,
    eventPoster:String,
    eventPhotographs:[
        {
            photoname : String,
            photoData : String,
        }
    ]

});

const Event = mongoose.model("Event",eventSchema);
module.exports= Event;