import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];


server.post("/sign-up", (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.send(newUser)
  console.log("OK")
})

server.get("/tweets", (req, res) => {
  const lastTweets = []
  for(let i = tweets.length-1; i>tweets.length-10; i--){
    if(tweets[i]) lastTweets.push(tweets[i])
  }
  res.send(lastTweets)
})

server.post("/tweets", (req, res) => {
  const profilePhoto = users.find(user => user.username === req.body.username)
  const avatar = profilePhoto ? profilePhoto.avatar : ""
  
  const newTweet = {
    ...req.body,
    avatar,
  }
  tweets.push(newTweet)
  res.send(newTweet)
  console.log("OK")
})

server.listen(5000, function(){
  console.log("Listening to port 5000")
})