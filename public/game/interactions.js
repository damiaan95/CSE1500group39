//client side
(function setup() {
    var move = new Audio("../sound-effects/Move.mp3");
    var socket = new WebSocket("ws://localhost:3000");

    /*
     *Initialize all UI elements of the game:
     * - The board and its pieces
     * - Moves made list
     * - Conquered and lost pieces
     * - Forfeit button
     *
     * the GameState object coordinates everything
     */

    var gameStateObj = new GameState(socket);

    socket.onmessage = function (event) {

        let incomingMessage = JSON.parse(event.data);
        let $clicked = null;

        if (incomingMessage.type === Messages.T_PLAYER_B) {
            gameStateObj.setPlayerColor("B");

            gameStateObj.setBoard(new Board("B"));
            gameStateObj.getBoard().drawBoard();

            // .forEach(function(square){
        }
        if (incomingMessage.type === Messages.T_PLAYER_W) {
            gameStateObj.setPlayerColor("W");
            gameStateObj.setBoard(new Board("W"));
            gameStateObj.getBoard().drawBoard();
        }

        $("#board div").bind("click", function (event) {
            if ($clicked === null) {
                console.log("1 click");
                $clicked = $(event.target);
                clickedID = $clicked.attr('id');
                
                if ($clicked.children().length > 0) {
                    $clicked.addClass("Clicked");
                    console.log($clicked);
                } else {
                    $clicked = null;
                }
            } else {
                if (clickedID === $(event.target).attr("id")) {
                    $clicked.removeClass();
                    $clicked = null;
                } else {
                    console.log("2 click");
                    move.play();
                    let toID = $(event.target).attr('id');
                    // console.log(toID);
                     let from = translateDivID(clickedID);
                     let to = translateDivID(toID);
                     gameStateObj.getBoard().move(from, to);
                     $clicked.removeClass();
                     $clicked = null;
                }
            }
        });


    }


})();