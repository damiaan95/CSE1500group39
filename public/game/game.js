function GameState(board, socket) {

    this.playerType = null;
    this.board = board;
    this.turn = false;
    this.checked = false;
    this.enemyChecked = false;

    this.getPlayerType = function() {
        return this.playerType;
    };

    this.setPlayerType = function(type) {
        this.playerType = type;
    };

    this.getTurn = function() {
        return turn;
    };

    this.setTurn = function() {
        this.turn = true;
    };

    this.isChecked = function() {
        return checked;
    }
    this.enemyIsChecked = function() {
        return enemyChecked;
    };

    this.gotChecked = function(type) {

        let king = board.getKing(type);
        let kingPos = king.getPos();
        
        if(type === "white") {
            let blackPieces = board.getPieces("black");
            blackPieces.forEach(piece => {
                let pos = piece.getPosition();
                if(Move.checkValidity(pos, kingPos, this)) {
                    return true;
                }
            });
        } else {
            let blackPieces = board.getPieces("white");
            blackPieces.forEach(piece => {
                let pos = piece.getPosition();
                if(Move.checkValidity(pos, kingPos, this)) {
                    return true;
                }
            });
        }
        return false;
    }

    this.checkmate = function() {
        let kingMoves;
        if(this.playerType === "white") {
            kingMoves = Move.getAllPossibleMoves(this.board.getKing("black").getPosition, this);
        }  else {
            kingMoves = Move.getAllPossibleMoves(this.board.getKing("white").getPosition, this);
        }
        return (kingMoves.length === 0 && enemyChecked);
    }

    this.updateGameState = function(newBoard) {
        this.board = newBoard;

        if(this.checkmate()) {
            let winningMessage = Messages.T_GAME_WON;
            socket.send(JSON.stringify(winningMessage));
            socket.close();
        }

        if(!this.turn) {
            this.turn = true;
            this.checked = this.gotChecked(playerType);
        } else {
            this.turn = false;
        }
    };
};

var main = function () {

    "use strict";
    //
    // var a = 1;
    // var b = 2;
    // var c = 3;
    // var d = 4;
    // var e = 5;
    // var f = 6;
    // var g = 7;
    // var h = 8;

    var i = 1;
    var j;
    for (i; i <= 8; i++) {
        for (j = 1; j <= 8; j++) {
            var $tile = document.createElement('div');
            $tile.id = rowLetter(j) + i.toString();
            $tile.setAttribute("row", i);
            $tile.setAttribute("column", j);
            $("#board").append($tile);
            if ((i + j) % 2 === 0) {
                $("#board div:nth-child(" + ((i-1)*8 + j) + ")").addClass("Color1");
            } else {
                $("#board div:nth-child(" + ((i-1)*8 + j) + ")").addClass("Color2");
            }
        }
    }

    function moveMade(from, to){
        var $move = document.createElement('p');
        $move.innerText = (from + " -> " + to);
        $("#moves").append($move);
    }

    $("#buttons button").on("click", function(event){
        moveMade("key", "pressed");
        pieceLost("Logo chess game.png", true);
        pieceLost("Logo chess game.png", false);

    });

    function pieceLost(piece, turn){
        var $image = document.createElement('img');
        $image.src="../images/" + piece;
        if(turn){
            $("#conquered_pieces").append($image);
        }else {
            $("#lost_pieces").append($image);
        }
    }

    function pieceConquered(piece){

    }


    function rowLetter(row) {
        switch (row) {
            case 1:
                return "a";
            case 2:
                return "b";
            case 3:
                return "c";
            case 4:
                return "d";
            case 5:
                return "e";
            case 6:
                return "f";
            case 7:
                return "g";
            case 8:
                return "h";
        }
    }

};

$(document).ready(main);