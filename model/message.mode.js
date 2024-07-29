const mongoose = require('mongoose');

const Messageschema = mongoose.Schema(
    {
        sendAt : {
            type : String
        },
        smsText : {
            type : String
        },
        profileId : {
            type : String
        },
        chatId : {
            type: String
        },
        smsType:{
            type: String,
            default: "text"
        }
    },
    {
        timestamps : {type:Date, default: Date.now}
    }
);

const Message = mongoose.model('Message', Messageschema);
module.exports= Message;