const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const chats=require("./models/chat.js")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.listen(8080,()=>{
    console.log("http://127.0.0.1:8080")
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsaap");
}

main().then((res)=>{
    console.log("Connection Successful to whatsaap");
})
.catch((err)=>{
    console.log("Error: ",err)
})

// chat creations

// chats.insertMany(
//     [
//         {
//             from:"Shivam Dhingra",
//             to:"Lavisha Meni",
//             msg:"I love you lavisha but always afraid to tell you.",
//             date:Date()
//         },
//         {
//             from:"Lavisha Meni",
//             to:"Shivam Dhingra",
//             msg:"Don't you think,you should have told me this thing face to face.",
//             date:Date()
//         },
//         {
//             from:"Shivam Dhingra",
//             to:"Lavisha Meni",
//             msg:"I always wanted to become a perfect-match for you but i don't know what I  made myself after soo many years.",
//             date:Date()
//         },
//         {
//             from:"Lavisha Meni",
//             to:"Shivam Dhinrga",
//             msg:"If you actually loved me then prove it by transforming yourself into a hardworking person",
//             date:Date()
//         },
//     ]
// )


app.get("/",async(req,res)=>{
       let data=await chats.find({});
        res.render("chat.ejs",{data,editChat:""})
})
// Create
app.post("/chat",(req,res)=>{
    let{from,to,msg}=req.body;
    chats.insertOne({
        from:from,
        to:to,
        msg:msg,
        date:new Date()
    })
    res.redirect("/")
})
// edit
app.get("/chat/edit/:id",async(req,res)=>{
    let{id}=req.params;
    let data=await chats.find({});
    let editChat=await chats.findById(id);
    res.render("chat.ejs",{data,editChat})
})
app.post("/chat/edit/:id",async(req,res)=>{
    let{id}=req.params;
    let {newMsg}=req.body;
    await chats.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    res.redirect("/")
})
app.get("/chat/delete/:id",async(req,res)=>{
    let{id}=req.params;
    await chats.findByIdAndDelete(id);
    res.redirect("/")
})