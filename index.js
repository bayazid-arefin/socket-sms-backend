const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const path = require("path")
const app = express();
const port = 5000;
app.use(express.json())
app.use(cors())
const http = require('http')
const Server = require('socket.io').Server

// data import
const Message = require('./model/message.mode')






const server = http.createServer(app);
const io = new Server(server,{
    cors : {
      origin:"*"
    }
})



io.on("connection", (socket) =>{
  console.log("connection on")
  
  const loadMessages = async () =>{
    try{
      const messages = await Message.find().sort({Timestamp:1}).exec();
      socket.emit("chat", messages)
    }
    catch(err){
      console.log(err)
    }
  }
  loadMessages()

  socket.on('newMessage', async(msg) =>{
    try{
      const newMessageCrt = new Message(msg)
      await newMessageCrt.save()
      io.emit('message', msg)
    }
    catch(err){
      console.log(err)
    }
  })

  socket.on("disconnect", () =>{
    console.log("disconnected")
  })
})

server.listen("5001", ()=>{
  console.log("socket server is running at 5001")
})

app.get('/', (req, res) => {
    res.send("Hello")
})
  
mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.pass}@arefins.mi8bj9m.mongodb.net/?retryWrites=true&w=majority&appName=arefins`)
.then(()=> {
    console.log('connent successfully in mongoDB');
    app.listen(port, () =>{
        console.log(`server run prot in : ${port}`)
    })
    
})
.catch((error)=>{console.log(error)})