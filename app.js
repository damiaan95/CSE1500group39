var express = require("express");
var http = require("http");
var websocket = require("ws");

 var messages = require("./public/game/messages");
//
// var gameStatistics = require("./statTracker");
var Game = require("./gamestate");

var port = process.argv[2];
var app = express();

//app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/splash/', function (req, res) {
    res.sendFile("index.html", {root: "./public/splash"});
    //res.render("splash.ejs", {gamesInitialized: gameStatus.gamesInitialized, gamesCompleted: gameStatus.gamesCompleted});
});


app.get('/game/', function (req, res) {
    res.sendFile("index.html", {root: "./public/game"});
});

var server = http.createServer(app);
const wss = new websocket.Server({server});

var websockets = {}; //property:websocket, value:game

/*
 *Clean up of websockets object
 */
setInterval(function () {
    for (let i in websockets) {
        let gameObj = websockets[i];
        if (gameObj.finalGamestate()) {
            console.log("Deleting element " + i);
            delete websockets[i];
        }
    }
}, 50000);

var pendingGame = new Game(0);//gameStatus.gamesInitialized++
var connectionID = 0;

wss.on("connection", function connection(ws) {
    let newPlayer = ws;
    newPlayer.id = connectionID++;
    let playerType = pendingGame.addPlayer(newPlayer);
    websockets[newPlayer.id] = pendingGame;

    console.log("Player %s placed in game %s as %s", newPlayer.id, pendingGame.id, playerType);

    /*
     * Inform the client about its assigned player type
     */
    newPlayer.send((playerType === "W") ? messages.S_PLAYER_W : messages.S_PLAYER_B);

    if (pendingGame.hasTwoConnectedPlayers()) {
        pendingGame = new Game(connectionID);//gameStatus.gamesInitialized++
    }

    newPlayer.on("message", function incoming(message) {
        let mess = JSON.parse(message);

        let gameObj = websockets[newPlayer.id];
        let isPlayerW = (gameObj.white === newPlayer);

        if (gameObj.hasTwoConnectedPlayers()) {
            if (mess.type === messages.T_MAKE_A_MOVE) {
                if (isPlayerW) {
                    gameObj.black.send(message);
                    gameObj.setState("B TURN");
                } else {
                    gameObj.white.send(message);
                    gameObj.setState("W TURN");
                }
                if (mess.type === messages.T_GAME_WON) {
                    if (isPlayerW) {
                        gameObj.black.send(messages.S_YOU_LOST);
                        gameObj.setState("W WON");
                    } else {
                        gameObj.white.send(messages.S_YOU_LOST);
                        gameObj.setState("B WON");
                    }
                }
            }
        }
    });

    newPlayer.on("close", function (code) {
        console.log(newPlayer.id + " disconnected...");

        if (code == "1001") {
            let gameObj = websockets[newPlayer.id];

            if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
                gameObj.setState("ABORTED");
            }

            try {
                gameObj.white.close();
                gameObj.white = null;
            } catch (e) {
                console.log("White player closing: " + e);
            }

            try {
                gameObj.black.close();
                gameObj.black = null;
            } catch(e) {
                console.log("Black player closing: " + e);
            }
        }
    });
});


server.listen(port);

