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
        let clicked = null;

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
            if (clicked === null) {
                console.log("1 click");
                clicked = $(event.target);
                if (clicked.children().length > 0) {
                    clicked.addClass("Clicked")
                    console.log(clicked);
                } else {
                    clicked = null;
                }
            } else {
                if ((clicked.attr("row") === $(event.target).attr("row")) && (clicked.attr("column") === $(event.target).attr("column"))) {
                    clicked.removeClass();
                    clicked = null;
                } else {
                    console.log("2 click");
                    move.play();
                    let to = $(event.target);
                    console.log(to);
                    gameStateObj.getBoard().move(
                        Number(clicked.attr("row")), Number(clicked.attr("column")),
                        Number(to.attr("row")), Number(to.attr("column")));
                    clicked.removeClass();
                    clicked = null;
                }
            }
        });


    }


})();