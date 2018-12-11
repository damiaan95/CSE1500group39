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
        let $clicked = null;

        if (incomingMessage.type === "START-GAME") {
            gameStateObj.setTurn();
            document.getElementById("message").innerHTML = "Your move";
        }

        if (incomingMessage.type === Messages.T_PLAYER_B) {
            gameStateObj.setPlayerColor("B");

            gameStateObj.setBoard(new Board("B", gameStateObj));
            gameStateObj.getBoard().drawBoard();
            document.getElementById("message").innerHTML = "Opponents move";
        }

        if (incomingMessage.type === Messages.T_PLAYER_W) {
            gameStateObj.setPlayerColor("W");
            gameStateObj.setBoard(new Board("W", gameStateObj));
            gameStateObj.getBoard().drawBoard();

        }

        if (incomingMessage.type === Messages.T_MAKE_A_MOVE) {
            let from = incomingMessage.data.from;
            let to = incomingMessage.data.to;
            let taken = incomingMessage.data.taken;
            gameStateObj.updateGameState(from, to, taken, true);
            document.getElementById("message").innerHTML = "Your move";
        }

        $("#board div").on("mouseup", function (event) {
            if (gameStateObj.getTurn()) {
                if ($clicked === null) {
                    $clicked = $(event.target);

                    let clickMatrixPos = {row: $clicked.attr("row"), column: $clicked.attr("column")};
                    let oppColor = gameStateObj.board.opponentColor;
                    let clickedPiece = gameStateObj.board.getPiece(clickMatrixPos);
                    if (clickedPiece == null) {
                        console.log("There is no piece here!");
                        $clicked = null;
                        return;
                    }


                    if ((!($clicked.children().length > 0))) {
                        $clicked = null;
                    } else if (clickedPiece.color === oppColor) {
                        $clicked = null;
                    } else {
                        $clicked.addClass("Clicked");
                    }
                } else {
                    let $to = $(event.target);
                    if ($clicked.attr("id") === $to.attr("id")) {
                        $clicked.removeClass();
                        $clicked = null;
                    } else {
                        // console.log("2 click");
                        let from = {row: $clicked.attr("row"), column: $clicked.attr("column")};
                        let to = {row: $to.attr("row"), column: $to.attr("column")};
                        gameStateObj.getBoard().move(from, to);
                        $clicked.removeClass();
                        $clicked = null;
                        document.getElementById("message").innerHTML = "Opponents move";
                    }
                }
            } else {
                console.log("not your turn")
            }
        });
        


    }


})();