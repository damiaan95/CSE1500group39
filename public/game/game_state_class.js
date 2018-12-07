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

    this.isPlayerChecked = function() {

        let king = this.board.getKing(this.playerColor);
        let kingPos = king.getPosition();

        if(this.playerColor === "W") {
            let blackPieces = this.board.getPieces("B");
            blackPieces.forEach(piece => {
                let pos = piece.getPosition();
                if(this.board.checkValidity(pos, kingPos, this)) {
                    return true;
                }
            });
        } else {
            let blackPieces = this.board.getPieces("W");
            blackPieces.forEach(piece => {
                let pos = piece.getPosition();
                if(this.board.checkValidity(pos, kingPos, this)) {
                    return true;
                }
            });
        }
        return false;
    };

    this.isOpponentCheckmate = function() {
        let kingMoves;
        if(this.playerColor === "W") {
            kingMoves = this.board.getAllPossibleMoves(this.board.getKing("B").getPosition(), this);
        }  else {
            kingMoves = this.board.getAllPossibleMoves(this.board.getKing("W").getPosition(), this);
        }
        return (kingMoves.length === 0 && this.checked.opponent);
    };

    this.updateGameState = function(piece, to) {

        this.board.move(piece.position, to);

        if(this.isOpponentCheckmate()) {
            socket.send(Messages.S_GAME_WON);
            socket.close();
        }

        if(!this.turn) {
            this.turn = true;
            this.checked = this.isPlayerChecked();
        } else {
            this.turn = false;
        }
    };
}