var main = function () {
    "use strict";



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

    function pieceLost(piece){
        var $image = document.createElement('img');
        $image.src="../images/" + piece.color + piece.type + ".png";
        $("#lost_pieces").append($image);
    };
};

$(document).ready(main);