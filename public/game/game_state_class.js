//Client side

function GameState(socket) {
    this.playerColor = null;
    this.board = null;
    this.turn = false;
    this.checked = {
        thisPlayer: false,
        opponent: false
    };


    this.getBoard = function(){
        return this.board;
    };

    this.setBoard = function(board){
        this.board = board;
    };

    this.getPlayerColor = function() {
        return this.playerColor;
    };

    this.setPlayerColor = function(type) {
        this.playerColor = type;
    };

    this.getTurn = function() {
        return this.turn;
    };

    this.setTurn = function() {
        this.turn = true;
    };

    this.isChecked = function() {
        return this.checked.thisPlayer;
    };

    this.opponentIsChecked = function() {
        return this.checked.opponent;
    };
    
    this.isPlayerChecked = function(color) {
        let king;
        if (color === this.board.playerColor) {
            king = this.board.getMyKing();
        } else {
            king = this.board.getNotMyKing();
        }
        return king.check(this.board);
    };

    this.isOpponentCheckmate = function() {
        // return false;
        return this.board.getNotMyKing().check(this.board);
    };

    this.updateGameState = function(from, to, taken, myTurn) {
        if(myTurn) {
            this.board.moveFromOpponent(from, to, taken);
            // if (this.board.getNotMyKing().checkMate(this.board)) {
            //     alert("You lost...");
            // }
            this.turn = true;
            //this.checked.thisPlayer = this.isPlayerChecked();
        } else
        if(this.isOpponentCheckmate()) {
            socket.send(Messages.S_GAME_WON);
            console.log("WON!!!!!!!!!");
            socket.close();
        } else {
            let message = Messages.O_MAKE_A_MOVE;
            message.data.from = from;
            message.data.to = to;
            message.data.taken = taken;
            let mess = JSON.stringify(message);
            socket.send(mess);
            this.turn = false;
        }
    };
};