function Piece(color, row, column) {
    this.color = color;
    this.position = {
        row: row,
        column: column
    }
}

Piece.prototype.getPosition = function () {
    return this.position;
};

function MovesPiece(color) {
    Piece.call(this, color);
    this.moved = false;
}

MovesPiece.prototype = Object.create(Piece.prototype);
MovesPiece.prototype.constructor = MovesPiece;

MovesPiece.prototype.getMoved = function () {
    return this.moved;
};

MovesPiece.prototype.isMoved = function () {
    this.moved = true;
};

function Pawn(color) {
    MovesPiece.call(this, color);
}

Pawn.prototype = Object.create(MovesPiece.prototype);
Pawn.prototype.constructor = Pawn;

function Rook(color) {
    Piece.call(this, color);
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

function Knight(color) {
    Piece.call(this, color);
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

function Bishop(color) {
    Piece.call(this, color);
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

function Queen(color) {
    Piece.call(this, color);
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

function King(color) {
    MovesPiece.call(this, color);
}

King.prototype = Object.create(MovesPiece.prototype);
King.prototype.constructor = King;

function Board(color) {
    if (color === "W") {
        this.playerColor = "W";
        this.opponentColor = "B";
    } else {
        this.playerColor = "B";
        this.opponentColor = "W";
    }

    this.playerKing = new King(this.playerColor, 7, 4);
    this.opponentKing = new King(this.opponentColor, 0, 4);

    this.board =
        [
            [new Rook(this.opponentColor, 0, 0), new Knight(this.opponentColor, 0, 1), new Bishop(this.opponentColor, 0, 2), new Queen(this.opponentColor, 0, 3), this.opponentKing, new Bishop(this.opponentColor, 0, 5), new Knight(this.opponentColor, 0, 6), new Rook(this.opponentColor, 0, 7)],
            [new Pawn(this.opponentColor, 1, 0), new Pawn(this.opponentColor, 1, 1), new Pawn(this.opponentColor, 1, 2), new Pawn(this.opponentColor, 1, 3), new Pawn(this.opponentColor, 1, 4), new Pawn(this.opponentColor, 1, 5), new Pawn(this.opponentColor, 1, 6), new Pawn(this.opponentColor, 1, 7)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn(this.playerColor, 6, 0), new Pawn(this.playerColor, 6, 1), new Pawn(this.playerColor, 6, 2), new Pawn(this.playerColor, 6, 3), new Pawn(this.playerColor, 6, 4), new Pawn(this.playerColor, 6, 5), new Pawn(this.playerColor, 6, 6), new Pawn(this.playerColor, 6, 7)],
            [new Rook(this.playerColor, 7, 0), new Knight(this.playerColor, 7, 1), new Bishop(this.playerColor, 7, 2), new Queen(this.playerColor, 7, 3), this.playerKing, new Bishop(this.playerColor, 7, 5), new Knight(this.playerColor, 7, 6), new Rook(this.playerColor, 7, 7)]
        ];

    this.getKing = function (color) {
        if (color === this.playerColor) {
            return this.playerKing;
        } else {
            return this.opponentKing;
        }
    };

    this.getPieces = function (color) {
        var pieces = [];
        for (var row in this.board) {
            for (var square in row) {
                if ((square != null && square.color === color) || (square != null && color === "ALL")) {
                    pieces.push(square);
                }
            }
        }
        return pieces;
    };

    this.move = function (position, to) {
        if (this.checkValidity(position, to)) {
            let row = position.row;
            let column = position.column;
            this.board[to.row][to.column] = this.board[row][column];
            this.board[row][column] = null;
        } else {
            alert("Invalid move!");
        }
    };

    this.checkValidity = function (position, to) {
        if (position.row === to.row && position.column === to.column) {
            return false;
        }
        let piece = this.board[position.row][position.column];
        //to do
        return true;
    };

    this.getAllPossibleMoves = function (from, gs) {
        let moves = [];
        let piece = gs.board.getPiece(from);
        //to do
        return moves;
    };

    this.drawBoard = function(){
        let i = 1;
        for(i; i <= 16; i++){
            let row = Math.floor((i-1)/8);
            let column = (i-1)%8;
            let type = this.board[row][column];
            let image = type.constructor.name;
            let $img = document.createElement("img");
            $img.src = "../images/" + this.opponentColor + image + ".png";
            $("#board div:nth-child(" + i + ")").prepend($img);
        }
        i = 49;
        for(i; i <= 64; i++){
            let row = Math.floor((i-1)/8);
            let column = (i-1)%8;
            let type = this.board[row][column];
            let image = type.constructor.name;
            let $img = document.createElement("img");
            $img.src = "../images/" + this.opponentColor + image + ".png";
            $("#board div:nth-child(" + i + ")").prepend($img);
        }
    };
}