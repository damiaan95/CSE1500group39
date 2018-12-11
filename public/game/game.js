var main = function () {
    "use strict";

    function moveMade(from, to) {
        var $move = document.createElement('p');
        $move.innerText = (from + " -> " + to);
        $("#moves").prepend($move);
    }

    // $("#buttons button").on("click", function (event) {
    //     access();
    //     moveMade("key", "pressed");
    //     // document.getElementById("board").webkitRequestFullscreen();
    // });
};

$(document).ready(main);