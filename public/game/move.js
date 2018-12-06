(function() {
    
    Move.checkValidity = function(from, to, gs) {
        if(from === to) {
            return false;
        }
        let piece = gs.board.getPiece(from);
        //to do
        return true;
    };

    Move.getAllPossibleMoves = function(from, gs) {
        let moves = [];
        let piece = gs.board.getPiece(from);
        //to do
        return moves;
    };
    
    Move.executeMove = function(from, to, gs) {
        if(checkValidity(from, to, gs)) {
           //to do
        } else {
            console.log("Invalid move!")
            return;
        }
    };
    
})(this.Move = {});


