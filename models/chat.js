const mongoose=require("mongoose");


// Schema
const chatSchema=mongoose.Schema({
    from:{
        type:String,
        default:"admin",
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:1000
    },
    date:{
        type:Date,
        required:true,
    }
});

const chats=mongoose.model("Chat",chatSchema)



module.exports = chats; 