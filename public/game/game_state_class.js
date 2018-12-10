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

        let king = this.board.getKing(color);
        let kingPos = king.color;

        return this.board.isPositionChecked(kingPos);
    };

    this.isOpponentCheckmate = function() {
        return false;
        let kingMoves = this.board.getAllPossibleMoves(this.board.getKing(this.board.opponentColor).position);
        return (kingMoves.length === 0 && this.isPlayerChecked(this.board.opponentColor));
    };

    this.updateGameState = function(from, to, taken, myTurn) {
        if(myTurn) {
            this.board.moveFromOpponent(from, to, taken);
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
            mess = JSON.stringify(message); 
            socket.send(mess);
            this.turn = false;
        }
    };
};