var game = function(gameID) {
    this.id = gameID;
    this.white = null;
    this.black = null;
    this.gameState = "0 JOINT";
};

game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0;
game.prototype.transitionStates["1 JOINT"] = 1;
game.prototype.transitionStates["2 JOINT"] = 2;
game.prototype.transitionStates["W TURN"] = 3;
game.prototype.transitionStates["B TURN"] = 4;
game.prototype.transitionStates["W WON"] = 5;
game.prototype.transitionStates["B WON"] = 6;
game.prototype.transitionStates["ABORTED"] = 7;

game.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0, 0, 0],   // 0 JOINT
    [1, 0, 1, 0, 0, 0, 0, 0],   // 1 JOINT
    [0, 0, 0, 1, 0, 0, 0, 1],   // 2 JOINT
    [0, 0, 0, 0, 1, 1, 0, 1],   // W TURN
    [0, 0, 0, 1, 0, 0, 1, 1],   // B TURN
    [0, 0, 0, 0, 0, 0, 0, 0],   // W WON
    [0, 0, 0, 0, 0, 0, 0, 0],   // B WON
    [0, 0, 0, 0, 0, 0, 0, 0],   // ABORTED
];

game.prototype.isValidTransition = function(from, to) {
    
    console.assert(typeof from == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof from);
    console.assert(typeof to == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof to);
    console.assert( from in game.prototype.transitionStates == true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, from);
    console.assert( to in game.prototype.transitionStates == true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, to);
    
    let i, j;
    if (! (from in game.prototype.transitionStates)) {
        return false;
    }
    else {
        i = game.prototype.transitionStates[from];
    }

    if (!(to in game.prototype.transitionStates)) {
        return false;
    }
    else {
        j = game.prototype.transitionStates[to];
    }

    return (game.prototype.transitionMatrix[i][j] > 0);
};

game.prototype.isValidState = function (s) {
    return (s in game.prototype.transitionStates);
};

game.prototype.setState = function (newState) {

    console.assert(typeof newState == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof newState);

    if (game.prototype.isValidState(newState) && game.prototype.isValidTransition(this.gameState, newState)) {
        this.gameState = newState;
        console.log("[STATUS] %s", this.gameState);
    }
    else {
        return new Error("Impossible status change from %s to %s", this.gameState, w);
    }
};

game.prototype.hasTwoConnectedPlayers = function() {
    return !(this.gameState === "0 JOINT" || this.gameState === "1 JOINT" );
};

game.prototype.addPlayer = function(player) {
    console.assert(p instanceof Object, "%s: Expecting an object (WebSocket), got a %s", arguments.callee.name, typeof p);

    if (game.prototype.hasTwoConnectedPlayers()) {
        return new Error("Invalid call to addPlayer, current state is %s", this.gameState);
    }

    if(this.white === null) {
        this.white = p;
        game.prototype.setState("1 JOINT");
        return "W";
    } else {
        this.black = p;
        game.prototype.setState("2 JOINT");
        return "B";
    }
};

game.prototype.finalGamestate = function(){
    switch(this.gameState){
        case "W WON":
        case "B WON":
        case "ABORTED":
            return true;
        default:
            return false;
    }
};

module.exports = game;



