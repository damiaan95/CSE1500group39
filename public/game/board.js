function Piece(color, row, column, type) {
    this.color = color;
    this.type = type;
    this.position = {
        row: row,
        column: column
    };
}

Piece.prototype.getPosition = function () {
    return this.position;
};

function MovesPiece(color, row, column, type) {
    Piece.call(this, color, row, column, type);
    this.moved = false;
}

MovesPiece.prototype = Object.create(Piece.prototype);
MovesPiece.prototype.constructor = MovesPiece;

MovesPiece.prototype.isMoved = function () {
    return this.moved;
};

MovesPiece.prototype.didMove = function () {
    this.moved = true;
};

function Pawn(color, column, row) {
    MovesPiece.call(this, color, column, row, "Pawn");
}

Pawn.prototype = Object.create(MovesPiece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.getMoves = function (board, hitMoves) {
    let moves = [];
    let direction;


    if (!(hitMoves === true)) {
        direction = -1;
        hitMoves = false;
    } else {
        direction = 1;
        hitMoves = true;
    }

    let position = {row: (this.position.row + direction), column: this.position.column};
    let blockingPiece = board.getPiece(position);
    if (blockingPiece == null && !hitMoves) {
        moves.push(position);
    }

    if (!(this.isMoved())) {
        position = {row: (this.position.row + 2 * direction), column: this.position.column};
        blockingPiece = board.getPiece(position);
        if (blockingPiece == null && !hitMoves) {
            moves.push(position);
        }
    }

    position = {row: (this.position.row + direction), column: (this.position.column + 1)};
    blockingPiece = board.getPiece(position);
    if ((blockingPiece !== null && blockingPiece.color !== this.color) || hitMoves) {
        moves.push(position);
    }

    position = {row: (this.position.row + direction), column: (this.position.column - 1)};
    blockingPiece = board.getPiece(position);
    if ((blockingPiece !== null && blockingPiece.color !== this.color) || hitMoves) {
        moves.push(position);
    }

    return moves;
};

function Rook(color, column, row) {
    Piece.call(this, color, column, row, "Rook");
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.getMoves = function (board) {
    let moves = [];
    // Horizontal to the right
    for (let x = this.position.column + 1; x < 8; x++) {
        let pos = {row: this.position.row, column: x};
        let pieceThere = board.getPiece(pos);
        if (pieceThere !== null) {
            if (pieceThere.color !== this.color) {
                moves.push(pos);
            }
            break;
        } else {
            moves.push(pos);
        }
    }

    // Horizontal to the left
    for (let x = this.position.column - 1; x >= 0; x--) {
        let pos = {row: this.position.row, column: x};
        let pieceThere = board.getPiece(pos);
        if (pieceThere !== null) {
            if (pieceThere.color !== this.color) {
                moves.push(pos);
            }
            break;
        } else {
            moves.push(pos);
        }
    }

    // Vertical up
    for (let y = this.position.row - 1; y >= 0; y--) {
        let pos = {row: y, column: this.position.column};
        let pieceThere = board.getPiece(pos);
        if (pieceThere !== null) {
            if (pieceThere.color !== this.color) {
                moves.push(pos);
            }
            break;
        } else {
            moves.push(pos);
        }
    }

    // Vertical down
    for (let y = this.position.row + 1; y < 8; y++) {
        let pos = {row: y, column: this.position.column};
        let pieceThere = board.getPiece(pos);
        if (pieceThere !== null) {
            if (pieceThere.color !== this.color) {
                moves.push(pos);
            }
            break;
        } else {
            moves.push(pos);
        }
    }

    return moves;
};

function Knight(color, column, row) {
    Piece.call(this, color, column, row, "Knight");
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.getMoves = function (board) {
    let maybeMoves = [
        {row: this.position.row - 2, column: this.position.column + 1},
        {row: this.position.row - 1, column: this.position.column + 2},
        {row: this.position.row + 1, column: this.position.column + 2},
        {row: this.position.row + 2, column: this.position.column + 1},
        {row: this.position.row + 2, column: this.position.column - 1},
        {row: this.position.row + 1, column: this.position.column - 2},
        {row: this.position.row - 1, column: this.position.column - 2},
        {row: this.position.row - 2, column: this.position.column - 1}
    ];
    let moves = [];
    for (let i = 0; i < maybeMoves.length; i++) {
        let pieceThere = board.getPiece(maybeMoves[i]);
        if ((pieceThere == null || pieceThere.color !== this.color)) {
            moves.push(maybeMoves[i]);
        }
    }
    return moves;
};

function Bishop(color, column, row) {
    Piece.call(this, color, column, row, "Bishop");
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.getMoves = function (board) {
    let moves = [];
    let multiples = [{x: 1, y: 1}, {x: -1, y: 1},
        {x: 1, y: -1}, {x: -1, y: -1}];
    for (let i = 0; i < multiples.length; i++) {
        for (let x = 1; x < 8; x++) {
            let pos = {
                row: this.position.row + (x * multiples[i].x),
                column: this.position.column + (x * multiples[i].y)
            };
            if (!board.inBoard(pos)) {
                break;
            }
            let pieceThere = board.getPiece(pos);
            if (pieceThere !== null) {
                if (pieceThere.color !== this.color) {
                    moves.push(pos);
                }
                break;
            } else {
                moves.push(pos);
            }
        }
    }
    return moves;
};

function Queen(color, column, row) {
    Piece.call(this, color, column, row, "Queen");
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.getMoves = function (board) {
    let rookList = Rook.prototype.getMoves.call(this, board);
    let moves = Bishop.prototype.getMoves.call(this, board);
    moves = moves.concat(rookList);
    return moves;
};

function King(color, column, row) {
    MovesPiece.call(this, color, column, row, "King");
}

King.prototype = Object.create(MovesPiece.prototype);
King.prototype.constructor = King;

King.prototype.getMoves = function (board) {
    // Get all basic moves
    let moves = [];
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            let newPos = {
                row: this.position.row + y,
                column: this.position.column + x
            };
            let pieceThere = board.getPiece(newPos);
            if (pieceThere == null || pieceThere.color !== this.color) {
                moves.push(newPos);
            }
        }
    }


    // Don't walk into opponent king range
    let tempMoves = [];
    let opponentKing = board.getNotMyKing();
    for (let i = 0; i < moves.length; i++) {
        let xDist = Math.abs(moves[i].column - opponentKing.position.column);
        let yDist = Math.abs(moves[i].row - opponentKing.position.row);
        if (xDist > 1 || yDist > 1) {
            tempMoves.push(moves[i]);
        }
    }
    moves = tempMoves;


    // Get all opponent moves
    let opponentPieces = board.getPiecesExceptKing(board.opponentColor);
    let allOpponentMoves = [];
    opponentPieces.forEach(function (piece) {
        if (piece instanceof Pawn) {
            let pawnMoves = piece.getMoves(board, true);
            allOpponentMoves = allOpponentMoves.concat(pawnMoves);
        } else {
            allOpponentMoves = allOpponentMoves.concat(piece.getMoves(board));
        }
    });

    // Don't put yourself in check.
    let finalMoves = [];
    for (let i = 0; i < moves.length; i++) {
        let checkingMove = moves[i];
        let inThere = false;

        for (let j = 0; j < allOpponentMoves.length; j++) {
            let opponentMove = allOpponentMoves[j];
            // noinspection EqualityComparisonWithCoercionJS
            if (checkingMove.row == opponentMove.row
                && checkingMove.column == opponentMove.column) {
                inThere = true;
            }
        }

        if (!inThere) {
            finalMoves.push(checkingMove);
        }
    }

    return finalMoves;
};

King.prototype.check = function (board) {
    // Get all opponent moves
    let opponentPieces = board.getPiecesExceptKing(
        board.opponentColor);
    let allOpponentMoves = [];
    opponentPieces.forEach(function (piece) {
        if (piece instanceof Pawn) {
            let pawnMoves = piece.getMoves(board, true);
            allOpponentMoves = allOpponentMoves.concat(pawnMoves);
        } else {
            allOpponentMoves = allOpponentMoves.concat(piece.getMoves(board));
        }
    });
    let checked = false;
    for (let i = 0; i < allOpponentMoves.length; i++) {
        if (allOpponentMoves[i].row === this.position.row
            && allOpponentMoves[i].column === this.position.column) {
            checked = true;
        }
    }
    return checked;
};

King.prototype.checkMate = function (board) {
    let checked = this.check(board);
    return checked && (this.getMoves(board).length === 0);
};

function Board(color, gameState) {
    if (color === "W") {
        this.playerColor = "W";
        this.opponentColor = "B";
    } else {
        this.playerColor = "B";
        this.opponentColor = "W";
    }

    console.log(this.playerColor);
    this.whiteKing = new King("W", 7, 4);
    this.blackKing = new King("B", 0, 4);

            this.board =
                [
                [new Rook("B", 0, 0), new Knight("B", 0, 1), new Bishop("B", 0, 2), new Queen("B", 0, 3), this.blackKing, new Bishop("B", 0, 5), new Knight("B", 0, 6), new Rook("B", 0, 7)],
                [new Pawn("B", 1, 0), new Pawn("B", 1, 1), new Pawn("B", 1, 2), new Pawn("B", 1, 3), new Pawn("B", 1, 4), new Pawn("B", 1, 5), new Pawn("B", 1, 6), new Pawn("B", 1, 7)],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [new Pawn("W", 6, 0), new Pawn("W", 6, 1), new Pawn("W", 6, 2), new Pawn("W", 6, 3), new Pawn("W", 6, 4), new Pawn("W", 6, 5), new Pawn("W", 6, 6), new Pawn("W", 6, 7)],
                [new Rook("W", 7, 0), new Knight("W", 7, 1), new Bishop("W", 7, 2), new Queen("W", 7, 3), this.whiteKing, new Bishop("W", 7, 5), new Knight("W", 7, 6), new Rook("W", 7, 7)]
            ];

    this.getMyKing = function () {
        if (this.playerColor === "W") {
            return this.whiteKing;
        } else {
            return this.blackKing;
        }
    };

    this.getNotMyKing = function () {
        if (this.opponentColor === "W") {
            return this.whiteKing;
        } else {
            return this.blackKing;
        }
    };

    this.getPiece = function (position) {
        if (!this.inBoard(position)) {
            return null;
        }
        return this.board[position.row][position.column];
    };


    this.getPiecesExceptKing = function (color) {
        const pieces = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let position = {
                    row: i,
                    column: j
                };
                let pieceThere = this.getPiece(position);

                if (pieceThere !== null
                    && pieceThere.color === color
                    && !(pieceThere instanceof King)) {
                    pieces.push(pieceThere);
                }
            }
        }
        return pieces;
    };

    this.move = function (from, to) {
        if (this.checkValidity(from, to)) {
            let posTo = this.getPiece(to);
            let movedPiece = this.getPiece(from);
            this.board[to.row][to.column] = movedPiece;
            this.board[from.row][from.column] = null;
            movedPiece.position.column = Number(to.column);
            movedPiece.position.row = Number(to.row);
            if (this.getMyKing().check(this)) {
                this.board[from.row][from.column] = movedPiece;
                movedPiece.position.row = Number(from.row);
                movedPiece.position.column = Number(from.column);
                this.board[to.row][to.column] = posTo;
                alert("Can't do this move, since it results in being checked");
                return;
            }

            this.drawMove(from, to, posTo);
            gameState.updateGameState(from, to, posTo, false);
        } else {
            console.log("invalid move");
        }
    };

    this.moveFromOpponent = function (from, to, posTo) {
        from = this.translateOfColor(from.row, from.column);
        to = this.translateOfColor(to.row, to.column);

        let movedPiece = this.getPiece(from);
        this.board[to.row][to.column] = movedPiece;
        this.board[from.row][from.column] = null;
        movedPiece.position.column = Number(to.column);
        movedPiece.position.row = Number(to.row);
        this.drawMove(from, to, posTo);
        if (this.getMyKing().checkMate(this)) {
            alert("CHECK-MATE!!!!");
        }
    };

    this.drawMove = function (from, to, posTo) {
        let divIDFrom = this.coordinatesToDivID(from.row, from.column, this.playerColor);
        let $image = $("#" + divIDFrom + " img:last-child").get();
        $("#" + divIDFrom + " img:last-child").remove();

        let divIDTo = this.coordinatesToDivID(to.row, to.column, this.playerColor);
        if (posTo !== null) {
            $("#" + divIDTo + " img:last-child").remove();
        }
        $("#" + divIDTo).append($image);
    };

    this.checkValidity = function (from, to) {
        let piece = this.getPiece(from);
        if (piece == null) {
            return false;
        }

        let moves = piece.getMoves(this);
        for (let i = 0; i < moves.length; i++) {
            // noinspection EqualityComparisonWithCoercionJS
            if (moves[i].row == to.row && moves[i].column == to.column) {
                return true;
            }
        }
        console.log("Can't move there, moves were:");
        console.log(moves);
        return false;


    };

    this.inBoard = function (position) {
        return !(position.row < 0 || position.row > 7 ||
            position.column < 0 || position.column > 7);
    };

    this.setViewBoard = function () {
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                let square = document.createElement('div');
                square.id = this.coordinatesToDivID(row, column, this.playerColor);
                square.setAttribute("row", row.toString());
                square.setAttribute("column", column.toString());
                $("#board").append(square);
                if ((row + column) % 2 === 0) {
                    square.setAttribute("color", "Color1");
                } else {
                    square.setAttribute("color", "Color2");
                }
            }
        }
    };
    this.drawBoard = function () {
        this.setViewBoard();
        let column, row;
        for (row = 0; row <= 1; row++) {
            for (column = 0; column <= 7; column++) {
                let piece = this.board[row][column];
                let image = piece.constructor.name;
                let img = document.createElement('img');
                img.src = "../images/" + piece.color + image + ".png";
                $("#" + this.coordinatesToDivID(piece.position.row, piece.position.column, "W")).prepend(img);
            }
        }
        for (row = 6; row <= 7; row++) {
            for (column = 0; column <= 7; column++) {
                let piece = this.board[row][column];
                let image = piece.constructor.name;
                let img = document.createElement("img");
                img.src = "../images/" + piece.color + image + ".png";
                let divId = this.coordinatesToDivID(piece.position.row, piece.position.column, "W");
                $("#" + divId).prepend(img);
            }
        }

    };

    /////////////////////////////////////////////////////////
    //////// Here the matrix is drawn to the board //////////
    /////////////////////////////////////////////////////////

    function pieceConquered(piece) {
        let $image = document.createElement('img');
        let c;
        if (piece.color === "W") {
            c = "B";
        } else {
            c = "W";
        }

        $image.src = "../images/" + c + piece.type + ".png";
        $("#conquered_pieces").append($image);
    }

    /////////////////////////////////////////////////////////
    /// Translation of coordinates from views to matrices ///
    /////////////////////////////////////////////////////////

    this.coordinatesToDivID = function (row, column, color) {
        let letter;
        let number;
        if (color === "W") {
            letter = String.fromCharCode(97 + Number(column));
            number = 8 - row;
            return letter + number;
        } else {
            letter = String.fromCharCode(104 - column);
            number = Number(row) + 1;
            return letter + number;
        }
    };

    this.divIdToCoordinates = function (id, color) {
        let colNum = id.charCodeAt(0);
        let rowNum = id.charAt(1);

        if (color === "W") {
            return {
                column: colNum - 97,
                row: 8 - rowNum
            }
        } else {
            return {
                column: 104 - colNum,
                row: rowNum - 1
            }
        }
    }

    this.translateOfColor = function (row, col) {
        let oppId = this.coordinatesToDivID(row, col, this.opponentColor);
        return this.divIdToCoordinates(oppId, this.playerColor);
    }
}
