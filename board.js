function Piece(color){
    this.color = color;
}

function MovesPiece(color){
    Piece.call(this, color);
    this.moved = false;
}

MovesPiece.prototype = Object.create(Piece.prototype);
MovesPiece.prototype.constructor = MovesPiece;

MovesPiece.prototype.getMoved = function(){
    return this.moved;
};

MovesPiece.prototype.isMoved = function(){
    this.moved = true;
};

function Pawn(color){
    MovesPiece.call(this,color);
}

Pawn.prototype = Object.create(MovesPiece.prototype);
Pawn.prototype.constructor = Pawn;

function Tower(color){
    Piece.call(this,color);
}

Tower.prototype = Object.create(Piece.prototype);
Tower.prototype.constructor = Tower;

function Knight(color){
    Piece.call(this,color);
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

function Rook(color){
    Piece.call(this,color);
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

function Queen(color){
    Piece.call(this,color);
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

function King(color){
    MovesPiece.call(this,color);
}

King.prototype = Object.create(MovesPiece.prototype);
King.prototype.constructor = King;

function Board(player){
    this.createBoard = function(){
        var opposite;
        if(player === "W"){
            opposite = "B";
        }else{
            opposite = "W";
        }
        var board = {
        {new Tower(opposite), new Knight(opposite), new Rook(opposite), new Queen(opposite), new King(opposite), new Rook(opposite), new Knight(opposite), new Tower(opposite)}
        {new Pawn(opposite), new Pawn(opposite), new Pawn(opposite), new Pawn(opposite), new Pawn(opposite), new Pawn(opposite), new Pawn(opposite), new Pawn(opposite)}
        {null, null, null, null, null, null, null, null}
        {null, null, null, null, null, null, null, null}
        {null, null, null, null, null, null, null, null}
        {null, null, null, null, null, null, null, null}
        {new Pawn(player), new Pawn(player), new Pawn(player), new Pawn(player), new Pawn(player), new Pawn(player), new Pawn(player), new Pawn(player)}
        {new Tower(player), new Knight(player), new Rook(player), new Queen(player), new King(player), new Rook(player), new Knight(player), new Tower(player)}
    }
        return board;
    }
}

module.exports(Board);