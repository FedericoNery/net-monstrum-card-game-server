const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const { io_from_app, server_from_app } = require("./app");
const Mazo = require("./models/Mazo");
const Usuario = require("./models/Usuario");

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    io = io_from_app
    const httpServer = server_from_app
    const port = httpServer.address().port;
    console.log(port)
    clientSocket = new Client(`http://localhost:${port}`);
    clientSocket.on("connect", done);
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("createNewGame", (done) => {
    clientSocket.on("new game created", ({ gameId, mySocketId }) => {
      expect(Number.isInteger(gameId)).toBeTruthy();
      expect(mySocketId).toBeDefined();
      done();
    });
    clientSocket.emit("createNewGame", { usuario: Usuario.get_usuario_de_prueba_1(), mazo: Mazo.get_mazo_prueba_1() })

    //serverSocket.emit("hello", "world");
  });

  test("playerJoinGame", (done) => {
    var gameIdGameCreated = null
    var socketIdGameCreated = null
    clientSocket.on("new game created", ({ gameId, mySocketId }) => {
      console.log("new game created gameId", gameId)
      console.log("new game created mySocketId", mySocketId)
      gameIdGameCreated = gameId
      socketIdGameCreated = mySocketId
      console.log("NEW GAME CREATED")
      expect(Number.isInteger(gameId)).toBeTruthy();
      expect(mySocketId).toBeDefined();

      console.log("GAME ID CREATED", gameIdGameCreated)
      clientSocket.emit("playerJoinGame", { gameIdToJoin: gameIdGameCreated, usuario: Usuario.get_usuario_de_prueba_1(), mazo: Mazo.get_mazo_prueba_1() })
      //done();
    });

    /*TODO VER ESTE CASO*/
    clientSocket.on("start game", ({ gameId, mySocketId }) => {
      const drink = jest.fn();
      drink()
      expect(drink).toHaveBeenCalled();
      console.log("START GAME")
    });

    clientSocket.on("playerJoinedRoom", ({ gameId, socketId }) => {
      expect(gameId).toBe(gameIdGameCreated);
      expect(socketId).toBe(socketIdGameCreated);
      console.log("PLAYER JOINED ROOM")
      done();
    })

    clientSocket.emit("createNewGame", { usuario: Usuario.get_usuario_de_prueba_1(), mazo: Mazo.get_mazo_prueba_1() })


    //serverSocket.emit("hello", "world");
  });

  test("obtener rooms", (done) => {
    clientSocket.on("obtener rooms", ({ roomsConUnSoloJugador }) => {
      expect(Array.isArray(roomsConUnSoloJugador)).toBeTruthy();
      done();
    });

    clientSocket.emit("obtener rooms");
  });

  test.skip("start game", (done) => {
    
  });
});