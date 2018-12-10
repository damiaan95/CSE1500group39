function Piece(color, row, column, type) {
    this.color = color;
    this.type = type;
    this.position = {
        row: row,
        column: column
    }
    this.moves = {
        hor: 1,
        ver: 1,
        diag: 1
    }
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

MovesPiece.prototype.getMoved = function () {
    return this.moved;
};

MovesPiece.prototype.isMoved = function () {
    this.moved = true;
};

function Pawn(color, column, row) {
    MovesPiece.call(this, color, column, row, "Pawn");
    this.moves = {
        ver: 1,
    }
}

Pawn.prototype = Object.create(MovesPiece.prototype);
Pawn.prototype.constructor = Pawn;

function Rook(color, column, row) {
    Piece.call(this, color, column, row, "Rook");
    this.moves = {
        hor: 1,
        ver: 1,
    }
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

function Knight(color, column, row) {
    Piece.call(this, color, column, row, "Knight");
    this.moves = {};
    
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

function Bishop(color, column, row) {
    Piece.call(this, color, column, row, "Bishop");
    this.moves = {
        diag: 1
    }
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

function Queen(color, column, row) {
    Piece.call(this, color, column, row, "Queen");
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

function King(color, column, row) {
    MovesPiece.call(this, color, column, row, "King");
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

function letterToRow(rowLetter) {
    switch (rowLetter) {
        case "a":
            return 0;
        case "b":
            return 1;
        case "c":
            return 2;
        case "d":
            return 3;
        case "e":
            return 4;
        case "f":
            return 5;
        case "g":
            return 6;
        case "h":
            return 7;
        default:
            return -1;
    }
}

function translateCoordinates(row, column) {
    return rowLetter(row) + (column + 1).toString();
}

function translateDivID(id) {
    let rowLetter = id.charAt(0);
    let column = Number(id.charAt(1) - 1);
    let row = letterToRow(rowLetter);
    position = {
        row: row,
        column: column 
    }
    return position;
}

function pieceConquered(piece){
    var $image = document.createElement('img');
    $image.src="../images/" + piece.color + piece.type + ".png";
    console.log($image.src)
    $("#conquered_pieces").append($image);
};

function Board(color, gameState) {
    if (color === "W") {
        this.playerColor = "W";
        this.opponentColor = "B";
    } else {
        this.playerColor = "B";
        this.opponentColor = "W";
    }

    this.whiteKing = new King("W", 4, 0);
    this.blackKing = new King("B", 4, 7);

    this.board =
        [
            [new Rook("B", 0, 7), new Knight("B", 1, 7), new Bishop("B", 2, 7), new Queen("B", 3, 7), this.blackKing, new Bishop("B", 5, 7), new Knight("B", 6, 7), new Rook("B", 7, 7)],
            [new Pawn("B", 0, 6), new Pawn("B", 1, 6), new Pawn("B", 2, 6), new Pawn("B", 3, 6), new Pawn("B", 4, 6), new Pawn("B", 5, 6), new Pawn("B", 6, 6), new Pawn("B", 7, 6)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn("W", 0, 1), new Pawn("W", 1, 1), new Pawn("W", 2, 1), new Pawn("W", 3, 1), new Pawn("W", 4, 1), new Pawn("W", 5, 1), new Pawn("W", 6, 1), new Pawn("W", 7, 1)],
            [new Rook("W", 0, 0), new Knight("W", 1, 0), new Bishop("W", 2, 0), new Queen("W", 3, 0), this.whiteKing, new Bishop("W", 5, 0), new Knight("W", 6, 0), new Rook("W", 7, 0)]
        ];

    this.getKing = function (color) {
        if (color === "W") {
            return this.whiteKing;
        } else {
            return this.blackKing;
        }
    };

    this.getPiece = function(position) {
        return this.board[position.column][position.row];
    }

    this.getPieces = function (color) {
        var pieces = [];
        let i = 0;
        let j;
        for(i; i<=7; i++) {
            for(j = 0; j<=7; j++) {
                let position = {
                    row: i,
                    column: j
                }
                if(this.getPiece(position) instanceof Piece && this.getPiece(position).color === color && !(this.getPiece(position) instanceof King)){
                    pieces.push(this.getPiece(position));
                }
            }
        }
        return pieces;
    };

    this.move = function (from, to) {
        if (this.checkValidity(from, to, true)) {
            let posTo = this.getPiece(to);
            if(posTo instanceof Piece) {
                this.board[to.column][to.row] = null;
            }
            
            this.board[to.column][to.row] = this.getPiece(from);
            this.board[from.column][from.row] = null;
            
            this.drawMove(from, to, posTo);
            gameState.updateGameState(from, to, posTo, false);
        } else {
            console.log("invalid move");
        }
    };

    this.moveFromOpponent = function (from, to, posTo) {
        this.board[to.column][to.row] = null;
        
        this.board[to.column][to.row] = this.getPiece(from);
        this.board[from.column][from.row] = null;
        this.drawMove(from, to, posTo);
    };

    this.drawMove = function (from, to, posTo) {
        let divIDFrom = translateCoordinates(from.row, from.column);
        let $image = $("#" + divIDFrom + " img:last-child").get();
        $("#" + divIDFrom + " img:last-child").remove();
        let divIDTo = translateCoordinates(to.row, to.column);
        //console.log(posTo);
        if(posTo !== null) {
            
            $("#" + divIDTo + " img:last-child").remove();
            pieceConquered(posTo);
        }
        $("#" + divIDTo).append($image);
    };

    this.checkValidity = function (from, to, real) {
        let rowFrom = from.row;
        let columnFrom = from.column;
        let rowTo = to.row;
        let columnTo = to.column;

        //try to move to the same position.
        if (rowFrom === rowTo && columnFrom === columnTo) {
            console.log("trying to move to the same position");
            return false;
        }

        let piece = this.getPiece(from);

        //this is actually a piece.
        if(piece !== null) {
            //try to move on top of friendly piece.
            let posTo = this.getPiece(to);
            if(posTo instanceof Piece && posTo.color === piece.color && real) {
                console.log("trying to move ontop of friendly piece");
                return false;
            }

            let rpath = rowTo - rowFrom;
            let cpath = columnTo - columnFrom;
            let xvec = 0;
            let yvec = 0;
            if(rpath !== 0) {
                xvec = rpath/Math.abs(rpath);
            }
            if(cpath !== 0){
                yvec= cpath/Math.abs(cpath);
            }

            //special case of a knight:
            if(piece instanceof Knight) {
                let horJump = Math.abs(rpath);
                let verJump = Math.abs(cpath);
                if((horJump === 2 && verJump === 1) || (horJump === 1 && verJump === 2)) {
                    return true;
                }
            }

            //special case of a MovesPiece:
            if(piece instanceof MovesPiece) {
                //moved pawn or king cannot do more than one step:
                if((piece.getMoved() || piece instanceof King) && (cpath > 1 || rpath > 1)) {
                    console.log("trying to move too far");
                    return false;
                }
                //a king cannot move to a position where it would be checked.
                if(piece instanceof King && real) {
                    console.log(piece);
                    if(this.isPositionChecked(to, piece.color)) {
                       console.log("king cannot move to a position where it would be checked");
                        return false;
                    }
                }
                //unmoved pawn cannot do more than 2 steps:
                if(!piece.getMoved() && piece instanceof Pawn && cpath > 2) {
                    console.log("pawn cant move more than two steps");
                    return false; 
                }
            }

            //a move cannot be made if this would result in our king being checked.
           // if(!(piece instanceof King) && this.kingIsCheckedAfterMove(from, to, piece) && real) {
             //    console.log("If this piece moves, the king would be checked");
               //  return false;
            // }

            //There are no pieces in the way.
            if(this.isPathClear(from, rpath, cpath, xvec, yvec)) {
                //move is diagonal and piece can move diagonally.
                if(Math.abs(rpath) === Math.abs(cpath)) {
                    //piece is allowed to move diagonally.
                    if(piece.moves.diag === 1) {
                        if(piece instanceof MovesPiece && !piece.getMoved() && real) {
                            piece.isMoved();
                        }
                        return true;
                    }
                    //piece is a pawn that will take an opponents piece.
                    if(piece instanceof Pawn && Math.abs(cpath) === 1) {
                        console.log("pawn diagonal");
                        if(posTo instanceof Piece && posTo.color !== piece.color && real) {
                            console.log("pawn can take!");
                            if(!piece.getMoved()) {
                                piece.isMoved();
                            }
                            return true
                        }
                        if(!real) {
                            console.log("pawn faking a move");
                            console.log(piece);
                            return true;
                        }
                    }
                }
                
                //move is vertical and piece can move vertically.
                if(rpath === 0 && piece.moves.ver === 1) {
                    //special case for pawns:
                    if(piece instanceof Pawn) {
                        //pawns cannot walk backwards or take an opponents piece directly in front of them.
                        if(posTo instanceof Piece) {
                            return false;
                        }
                        if(this.playerColor === "W" && cpath<0) {
                            console.log("pawn cannot walk backwards");
                            return false;
                        }
                        if(this.playerColor === "B" && cpath>0) { 
                            return false;
                        }
                    }
                    if(piece instanceof MovesPiece && !piece.getMoved() && real) {
                        piece.isMoved();
                    }
                   return true;
                }
                //move is horizontal and piece can move horizontally.
                if(cpath === 0 && piece.moves.hor === 1) {
                    if(piece instanceof MovesPiece && !piece.getMoved() && real) {
                        piece.isMoved();
                    }
                    return true;
                }
            }
        }
        console.log("something else");
        return false;
    };

    this.isPathClear = function(from, rpath, cpath, xvec, yvec) {
        let i = 1;
        let j = 1;

        while(i*xvec !== rpath || j*yvec !== cpath) {
            if(this.board[from.column + j*yvec][from.row + i*xvec] !== null) {
                return false;
            }
            i++;
            j++;
        }
        return true;
    };

    this.isPositionChecked = function(to) {
       // console.log("reached!");
        //console.log(this.getPiece(kingpos).color === "W")
        let checked = false;
        if(this.playerColor === "W") {
            console.log("black");
            let blackPieces = this.getPieces("B");
            blackPieces.forEach(p => {
                let from = p.position;
                console.log(p);
                if(this.checkValidity(from, to, false)) {
                    console.log("checked!");
                    checked = true;
                }
            });
        } else {
            let whitePieces = this.getPieces("W");
            console.log("white");
            whitePieces.forEach(p => {
                let from = p.position;
                console.log(p);
                if(this.checkValidity(from, to, false)) {
                    console.log("checked!");
                    checked = true;
                }
            });
        }
        return checked;
    };

    this.kingIsCheckedAfterMove = function(from, to, piece) {
        //console.log(this.playerColor);
        //console.log(piece.color);
        let kingPos = this.getKing(piece.color).position;
        let checked = false;

        //fake the move.
        this.board[to.column][to.row] = piece;
        this.board[from.column][from.row] = null;

        //check if the king would be checked by this move.
        if(this.isPositionChecked(kingPos, piece.color)){
            checked = true;
        }

        //undo the faked move.
        this.board[from.column][from.row] = piece;
        this.board[to.column][to.row] = null;

        return checked;
    };

    this.getAllPossibleMoves = function (from) {
        let moves = [];
        let piece = this.getPiece(from);
        if(piece instanceof Piece) {
            let position = piece.position;
            let row = position.row;
            let column = position.column;
            //to do
            if(piece instanceof King) {
                let i = -1;
                let j;
                for(i; i<2; i++) {
                    for(j = -1; j<2; j++) {
                        let nRow = row + i;
                        let nColumn = column + j;
                        if(nRow >= 0 && nColumn >= 0 && nRow <= 7 && nColumn <= 7) {
                            console.log("inside the board!");
                            let to = {
                                row: nRow,
                                column: nColumn
                            }
                            if(this.checkValidity(from, to, false)){
                                console.log("there is a move!");
                                moves.push(to);
                            }
                        }
                    }
                }
            }
        }
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
                    $tile.setAttribute("color", "Color1");
                } else {
                    $tile.setAttribute("color", "Color2");
                }
                temp++;
            }
        }
    };


    this.drawBoard = function () {
        this.setBoardCoordinates();
        let i = 0;
        let j;
        for (i; i <= 1; i++) {
            for(j = 0; j<=7; j++) {
                let row = i
                let column = j
                let piece = this.board[row][column];
                let image = piece.constructor.name;
                //console.log(piece.constructor.name);
                let $img = document.createElement("img");
                $img.src = "../images/B" + image + ".png";
                //console.log(piece.position.row);
                //console.log(piece);
                $("#" + translateCoordinates(piece.position.row, piece.position.column)).prepend($img);
            }
        }
        for (i = 6; i <= 7; i++) {
            for(j = 0; j <= 7; j++){
                let row = i;
                let column = j;
                let piece = this.board[row][column];
                let image = piece.constructor.name;
                let $img = document.createElement("img");
                $img.src = "../images/W" + image + ".png";
                // console.log(piece.position.row);
                // console.log(piece.position.column);
                $("#" + translateCoordinates(piece.position.row, piece.position.column)).prepend($img);
            }
        }
    };
}
