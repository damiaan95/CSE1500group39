var main = function () {
    "use strict";

    function moveMade(from, to) {
        var $move = document.createElement('p');
        $move.innerText = (from + " -> " + to);
        $("#moves").prepend($move);
    }

    $("#buttons button").on("click", function (event) {
        access();
        moveMade("key", "pressed");
        // document.getElementById("board").webkitRequestFullscreen();
    });
};

var access = function() {
    var cookiesArray = document.cookie.split(';');
    var cookies = [];

    for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].split("=");
        cookies[cookie[0]] = cookie[1];
    }

    let timesAccessed = null;
    if(cookies[cookie[0]] !== null){
        timesAccessed = cookies[cookie[0]];
    }

    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 172800 * 1000;
    now.setTime(expireTime);
    if (timesAccessed == null) {
        timesAccessed = 1;
        document.cookie = "timesAccessed=1;Expires=" + now.toUTCString();
    } else {
        document.cookie = "timesAccessed=" + timesAccessed + ";Expires=Fri, 24-Jan-1970 12:45:00 GMT";
        document.cookie = "timesAccessed=" + (++timesAccessed) + ";Expires=" + now.toUTCString();
    }

    let $accessed = document.createElement('p');
    $accessed.innerText = "You have accessed this page: " + timesAccessed + " times";
    $("#game").append($accessed);
};

$(document).ready(main);