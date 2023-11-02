const http = require("http");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
// const app = express();
require("events").EventEmitter.prototype._maxListeners = 100;
const app = require("./app");
var cors = require("cors");

const queryRouterFile = require("./api/routes/query");
const userRouterFile = require("./api/routes/user");
const postRouterFile = require("./api/routes/post");
const storyRouterFile = require("./api/routes/story");
const highlightRouterFile = require("./api/routes/highlight");
const orderRouterFile = require("./api/routes/order");
// Model
const User = require("./api/models/user")

///cors issuenpm start
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // origin: 'https://www.helpros.app/api/',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // credentials: true,
  },
});

queryRouterFile.queryRouter(io);
userRouterFile.userRouter(io);
postRouterFile.postRouter(io);
storyRouterFile.storyRouter(io);
highlightRouterFile.highlightRouter(io);
orderRouterFile.orderRouter(io);

// Socket.io
let users = [];

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('addUser', (userId) => {
    const isUserExists = users.find((user) => user.userId === userId);

    if (!isUserExists && userId !== null) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit('getUsers', users);
    }
  });

  socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
    // Socket to be used by only those who are logged in
    const receiver = users.find((user) => user.userId === receiverId);
    const sender = users.find((user) => user.userId === senderId);
    const user = await User.findById(senderId)
    if (receiver) {
      io.to(receiver.socketId).to(socket.id).emit('getMessage', {
        senderId,
        message,
        conversationId,
        receiverId,
        user: { id: user._id, fullName: user.userName, profilePicture: user.image }
      });
    }
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });
});

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

const port = process.env.port || 6002;

server.listen(port, () => {
  console.log(`Server Started At PORT : ${port} {CC Project Backend}`);
});

module.exports = server;
