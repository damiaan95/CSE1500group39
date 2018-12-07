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

function MovesPiece(color, row, column) {
    Piece.call(this, color, row, column);
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

function Pawn(color, column, row) {
    MovesPiece.call(this, color, column, row);
}

Pawn.prototype = Object.create(MovesPiece.prototype);
Pawn.prototype.constructor = Pawn;

function Rook(color, column, row) {
    Piece.call(this, color, column, row);
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

function Knight(color, column, row) {
    Piece.call(this, color, column, row);
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

function Bishop(color, column, row) {
    Piece.call(this, color, column, row);
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

function Queen(color, column, row) {
    Piece.call(this, color, column, row);
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

function King(color, column, row) {
    MovesPiece.call(this, color, column, row);
}

King.prototype = Object.create(MovesPiece.prototype);
King.prototype.constructor = King;

function rowLetter(row) {
    switch (row) {
        case 0:
            return "a";
        case 1:
            return "b";
        case 2:
            return "c";
        case 3:
            return "d";
        case 4:
            return "e";
        case 5:
            return "f";
        case 6:
            return "g";
        case 7:
            return "h";
        default:
            return "!";
    }
}

function translateCoordinates(row, column) {
    return (rowLetter(row) + (column + 1).toString()).toString();
}

function Board(color) {
    if (color === "W") {
        this.playerColor = "W";
        this.opponentColor = "B";
    } else {
        this.playerColor = "B";
        this.opponentColor = "W";
    }

    this.playerKing = new King(this.playerColor, 4, 0);
    this.opponentKing = new King(this.opponentColor, 4, 7);

    this.board =
        [
            [new Rook("B", 0, 7), new Knight("B", 1, 7), new Bishop("B", 2, 7), new Queen("B", 3, 7), this.opponentKing, new Bishop("B", 5, 7), new Knight("B", 6, 7), new Rook("B", 7, 7)],
            [new Pawn("B", 0, 6), new Pawn("B", 1, 6), new Pawn("B", 2, 6), new Pawn("B", 3, 6), new Pawn("B", 4, 6), new Pawn("B", 5, 6), new Pawn("B", 6, 6), new Pawn("B", 7, 6)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn("W", 0, 1), new Pawn("W", 1, 1), new Pawn("W", 2, 1), new Pawn("W", 3, 1), new Pawn("W", 4, 1), new Pawn("W", 5, 1), new Pawn("W", 6, 1), new Pawn("W", 7, 1)],
            [new Rook("W", 0, 0), new Knight("W", 1, 0), new Bishop("W", 2, 0), new Queen("W", 3, 0), this.playerKing, new Bishop("W", 5, 0), new Knight("W", 6, 0), new Rook("W", 7, 0)]
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

    this.move = function (rowFrom, columnFrom, rowTo, columnTo) {
        if (this.checkValidity(rowFrom, columnFrom, rowTo, columnTo)) {
            this.board[rowTo][columnTo] = this.board[rowFrom][columnFrom];
            this.board[rowFrom][columnFrom] = null;
            this.drawMove(rowFrom, columnFrom, rowTo, columnTo);
        } else {
            alert("Invalid move!");
        }
    };

    this.drawMove = function (rowFrom, columnFrom, rowTo, columnTo) {
        let divIDFrom = translateCoordinates(rowFrom, columnFrom);
        let $image = $("#" + divIDFrom + " img:last-child").get();
        $("#" + divIDFrom + " img:last-child").remove();
        let divIDTo = translateCoordinates(rowTo, columnTo);
        $("#" + divIDTo).append($image);
    };

    this.checkValidity = function (position, to) {
        return true;
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

    this.setBoardCoordinates = function () {
        let j;
        let row;
        let column;
        let temp;
        for (let i = 0; i < 8; i++) {
            temp = 0;
            for (j = 7; j >= 0; j--) {
                let $tile = document.createElement('div');

                if (this.playerColor === "W") {
                    row = 7 - j;        //7
                    column = 7 - i;     //0
                } else {
                    row = j;    //0
                    column = i; //7
                }
                $tile.id = translateCoordinates(row, column);
                $tile.setAttribute("row", row);
                $tile.setAttribute("column", column);
                $("#board").append($tile);
                if ((i + temp) % 2 === 0) {
                    $("#board div:nth-child(" + ((i) * 8 + temp + 1) + ")").addClass("Color1");
                } else {
                    $("#board div:nth-child(" + ((i) * 8 + temp + 1) + ")").addClass("Color2");
                }
                temp++;
            }
        }
    };


    this.drawBoard = function () {
        this.setBoardCoordinates();
        let i = 1;
        for (i; i <= 16; i++) {
            let row = Math.floor((i - 1) / 8);
            let column = (i - 1) % 8;
            let piece = this.board[row][column];
            let image = piece.constructor.name;
            let $img = document.createElement("img");
            $img.src = "../images/B" + image + ".png";
            $("#" + translateCoordinates(piece.position.row, piece.position.column)).prepend($img);
        }
        i = 49;
        for (i; i <= 64; i++) {
            let row = Math.floor((i - 1) / 8);
            let column = (i - 1) % 8;
            let piece = this.board[row][column];
            let image = piece.constructor.name;
            let $img = document.createElement("img");
            $img.src = "../images/W" + image + ".png";
            $("#" + translateCoordinates(piece.position.row, piece.position.column)).prepend($img);
        }
    };
}