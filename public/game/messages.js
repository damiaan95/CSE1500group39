(function(exports){

    exports.T_GAME_WON = "GAME-WON";             
    exports.O_GAME_WON = {
        type: exports.T_GAME_WON
    };
    exports.S_GAME_WON = JSON.stringify(exports.O_GAME_WON);

    exports.T_MAKE_A_MOVE = "MAKE-A-MOVE";
    exports.O_MAKE_A_MOVE = {
        type: exports.T_MAKE_A_MOVE,
        data: null
    };

    exports.T_YOU_LOST = "YOU_LOST";
    exports.O_YOU_LOST = {
        type: exports.T_YOU_LOST
    };
    exports.S_YOU_LOST = JSON.stringify(exports.O_YOU_LOST);

    exports.T_PLAYER_W = "PLAYER_W";
    exports.O_PLAYER_W = {
        type: exports.T_PLAYER_W
    }
    exports.S_PLAYER_W = JSON.stringify(exports.O_PLAYER_W);
    
    exports.T_PLAYER_B = "PLAYER_B";
    exports.O_PLAYER_B = {
        type: exports.T_PLAYER_B
    }
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);
    
})(typeof exports === "undefined" ? this.Messages = {} : exports);