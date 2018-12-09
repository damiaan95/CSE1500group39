var main = function () {
    "use strict";

    function moveMade(from, to){
        var $move = document.createElement('p');
        $move.innerText = (from + " -> " + to);
        $("#moves").prepend($move);
    }

    $("#buttons button").on("click", function(event){
        moveMade("key", "pressed");
        pieceLost("Logo chess game.png", true);
        pieceLost("Logo chess game.png", false);
        // document.getElementById("board").webkitRequestFullscreen();
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




};

$(document).ready(main);