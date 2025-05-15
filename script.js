// const gameboard = (function () {
    
//     const board = ["", "", "", "", "", "", "", "", ""];
//     const updateBoard = function () {

//     }

// })()


const gameboard = (() => {
          
    function newBoard() {
        let row1 = ["", "", ""];
        let row2 = ["", "", ""];
        let row3 = ["", "", ""];

        return [row1, row2, row3];
    }

    function placeMarker (player, x, y) {
        if (board[x][y] != "") {
            console.log("Someone already picked that spot.");
            return;
        } else {
            board[x][y] = player;
        }
    }

    function displayBoard () {

        console.log(board[0][0] + " | " + board[0][1] + " | " + board[0][2]);
        console.log(board[1][0] + " | " + board[1][1] + " | " + board[1][2]);
        console.log(board[2][0] + " | " + board[2][1] + " | " + board[2][2]);
    }

    function check3 (array) {
        if (array[0] != "") {
            return array.every(i => i === array[0]);
        } 
    }

    function checkBoard () {

        
        let hor1 = board[0];
        let hor2 = board[1];
        let hor3 = board[2];

        let ver1 = [board[0][0], board[1][0], board[2][0]];
        let ver2 = [board[0][1], board[1][1], board[2][1]];
        let ver3 = [board[0][2], board[1][2], board[2][2]];

        let diag1 = [board[0][0], board[1][1], board[2][2]];
        let diag2 = [board[0][2], board[1][1], board[2][0]];

        let winLanes = [hor1, hor2, hor3, ver1, ver2, ver3, diag1, diag2]

        for (i=0; i < winLanes.length; i++) {
            if (check3(winLanes[i])) {
                return winLanes[i][0];
            }
        }
    }

    function resetBoard () {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                board[x][y] = "";
            }
        }
    }

    const board = newBoard();

    return {placeMarker, displayBoard, resetBoard, checkBoard}

})()

function createPlayer (name) {
    let marker = 0
    const playerName = name;

    function getName () {
        return playerName;
    }

    function getMarker () {
        return marker;
    }

    function setMarker (num) {
        marker = num;
    }

    return { getName, setMarker, getMarker }
}


function newGame (p1, p2) {
    const player1 = createPlayer(p1);
    player1.setMarker(1);
    const player2 = createPlayer(p2);
    player2.setMarker(2);

    gameboard.resetBoard();

    let turnCounter = 1;

    function takeTurn(x, y) {
        if (turnCounter % 2 == 0) {
            gameboard.placeMarker(player2.getMarker(), x, y);            
        } else {
            gameboard.placeMarker(player1.getMarker(), x, y);
        }
        gameboard.displayBoard();
        turnCounter = ++turnCounter; 
        if (gameboard.checkBoard() != undefined) {
                const winner = gameboard.checkBoard() === player1.getName() ? player1.getName() : player2.getName();
                console.log(winner + " WINS!");
                gameboard.resetBoard();
                turnCounter = 1;
            }
    }

    return { takeTurn };
}

