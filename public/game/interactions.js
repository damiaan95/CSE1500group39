//client side
(function setup() {
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
            if (clicked == null) {
                if (clicked === $(event.target)) {
                    clicked.removeClass();
                    clicked = null;
                } else {
                    console.log("1 click");
                    clicked = $(event.target);
                    clicked.addClass("Clicked")
                    console.log(clicked);
                }
            } else {
                console.log("2 click");
                let to = $(event.target);
                console.log(to);
                gameStateObj.getBoard().move(
                    Number(clicked.attr("row")), Number(clicked.attr("column")),
                    Number(to.attr("row")), Number(to.attr("column")));
                clicked.removeClass();
                clicked = null;
            }
        });


    }


})();