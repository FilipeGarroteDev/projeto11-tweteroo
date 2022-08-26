import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = []


server.post("/sign-up", (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.send(newUser)
  console.log(newUser)
})



server.listen(5000, function(){
  console.log("Listening to port 5000")
})