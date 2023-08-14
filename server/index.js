const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

const initCodeBlocks = () => {
  const blocks = [];
  const names = ["Async code", "Functions code", "Loops code", "Meta code"]
  for (let i = 0; i < 4; i++) {
    blocks.push({
      id: i,
      name: names[i],
      code: ''
    });
  }
  return blocks;
}

const codeBlocks = initCodeBlocks();


io.on("connection", (socket) => {
  // fetch existing users
  let firstToConnect = true;
   // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
       userID: id,
       username: socket.username,
       isMentor: firstToConnect
     });
     firstToConnect = false;
  }
  socket.emit("users", users);
  socket.emit("initSections", codeBlocks);

  socket.on("codeChange", (block) => {
    codeBlocks[block.id].code = block.code;
    socket.broadcast.emit("codesections", codeBlocks);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
