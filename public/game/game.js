var main = function () {
    "use strict";

    var i = 0;
    var j;
    for (i; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            var $tile = document.createElement('div');
            $tile.id = rowLetter(j) + i.toString();
            $tile.setAttribute("row", i);
            $tile.setAttribute("column", j);
            $("#board").append($tile);
            if ((i + j) % 2 === 0) {
                $("#board div:nth-child(" + ((i)*8 + j + 1) + ")").addClass("Color1");
            } else {
                $("#board div:nth-child(" + ((i)*8 + j + 1) + ")").addClass("Color2");
            }
        }
    }

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


    function rowLetter(row) {
        switch (row) {
            case 1:
                return "a";
            case 2:
                return "b";
            case 3:
                return "c";
            case 4:
                return "d";
            case 5:
                return "e";
            case 6:
                return "f";
            case 7:
                return "g";
            case 8:
                return "h";
        }
    }

};

$(document).ready(main);