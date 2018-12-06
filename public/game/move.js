(function() {
    
    Move.checkValidity = function(from, to, gs) {
        if(from === to || gs.isChecked()) {
            return false;
        }
        return true;
    };

    Move.getAllPossibleMoves = function(from, gs) {
        let moves = [];
        //to do
        return moves;
    };
    
    Move.executeMove = function(from, to, gs) {
        if(checkValidity(from, to, gs)) {
           //to do
        } else {
            return;
        }
    };
    
})(this.Move = {});


