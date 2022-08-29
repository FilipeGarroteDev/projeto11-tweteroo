import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

function validateUsername(username) {
  if (username === '') {
    return false;
  }
  return true;
}

function validateAvatar(avatar) {
  const regex =
    /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;

  if (avatar === '' || !avatar.match(regex)) {
    return false;
  }
  return true;
}

function validateTweet(tweet) {
  if (tweet === '') {
    return false;
  }
  return true;
}

server.post('/sign-up', (req, res) => {
  const newUser = req.body;
  if (!validateUsername(newUser.username) || !validateAvatar(newUser.avatar)) {
    res
      .status(400)
      .send(
        'Todos os campos são obrigatórios!\nPreencha-os no formato correto.'
      );
    return;
  }
  users.push(newUser);
  res.status(201).send('OK');
});

server.get('/tweets', (req, res) => {
  const page = Number(req.query.page);
  if (page < 1) return res.status(400).send('Informe uma página válida!');
  const position = page * 10 + 1;
  const lastTweets = [];
  if (page) {
    for (
      let i = tweets.length - (position - 10);
      i > tweets.length - position;
      i--
    ) {
      if (tweets[i]) lastTweets.push(tweets[i]);
    }
  }
  return res.send(lastTweets);
});

server.get('/tweets/:user', (req, res) => {
  const userTweets = [];
  const params = req.params.user;
  for (let i = tweets.length - 1; i >= 0; i--) {
    if (tweets[i] && tweets[i].username === params) userTweets.push(tweets[i]);
  }
  res.send(userTweets);
});

server.post('/tweets', (req, res) => {
  const profilePhoto = users.find((user) => user.username === req.headers.user);
  const avatar = profilePhoto ? profilePhoto.avatar : '';
  const newTweet = {
    ...req.body,
    username: req.headers.user,
    avatar,
  };

  if (!validateUsername(newTweet.username) || !validateTweet(newTweet.tweet)) {
    res.status(400).send("Por favor, preencha o campo 'tweet'");
    return;
  }

  tweets.push(newTweet);
  res.status(201).send('OK');
});

server.listen(5000, () => {
  console.log('Listening to port 5000');
});
