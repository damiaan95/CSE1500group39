var main = function () {
    "use strict";

    function moveMade(from, to) {
        var $move = document.createElement('p');
        $move.innerText = (from + " -> " + to);
        $("#moves").prepend($move);
    }

    $("#fullscreen").on("click", function (event) {
        document.getElementById("board").webkitRequestFullscreen();
    });
};

$(document).ready(main);