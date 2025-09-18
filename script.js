
// Game Functionality

const gameboard = (() => {
          
    function newBoard() {
        let row1 = ["", "", ""];
        let row2 = ["", "", ""];
        let row3 = ["", "", ""];

        return [row1, row2, row3];
    }

    function placeMarker (player, x, y) {
        let marker = player == 2 ? "O" : "X";

        if (board[x][y] != "") {
            console.log("Someone already picked that spot.");
            return;
        } else {
            board[x][y] = player;
            let target = document.getElementById(`r${x}c${y}`);
            target.innerHTML = marker;
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

function startGame () {
    let p1Name = getElementById('player1').value;
    let p2Name = getElementById('player2').value;
    return newGame(p1Name, p2Name);
}

function createPlayer (name, marker) {
        let playerMarker = marker
        let playerName = name;

        function setName (newName) {
            playerName = newName;
        }

        function getName () {
            return playerName;
        }

        function getMarker () {
            return playerMarker;
        }

        function setMarker (num) {
            playerMarker = num;
        }

        return { setName, getName, setMarker, getMarker }
    }


const player1 = createPlayer("Player 1", 1);
const player2 = createPlayer("Player 2", 2);


const gameplay = (() => {
    
    let turnCounter = 1;
    let playSwitch = false;

    function newGame () {

        let p1Name = document.getElementById('player1').value;
        let p2Name = document.getElementById('player2').value;
        player1.setName(p1Name);
        player2.setName(p2Name);

        gameboard.resetBoard();

        playSwitch = true;
        turnCounter = 1;

        return {player1, player2}
    }

    function click (e) {
        if (playSwitch == false) {
            return;
        } else {
            takeTurn(e);
        }
    }

    function takeTurn(e) {

            let markerX = parseInt(e.target.id.slice(1, 2))
            let markerY = parseInt(e.target.id.slice(3))

            if (turnCounter % 2 == 0) {
                gameboard.placeMarker(player2.getMarker(), markerX, markerY);            
            } else {
                gameboard.placeMarker(player1.getMarker(), markerX, markerY);
            }
            gameboard.displayBoard();
            turnCounter = ++turnCounter; 
            if (gameboard.checkBoard() != undefined) {
                    const winner = gameboard.checkBoard() === player1.getMarker() ? player1.getName() : player2.getName();
                    console.log(winner + " WINS!");
                    gameboard.resetBoard();
                    turnCounter = 1;
                    playSwitch = false;
                }
        }

        return { newGame, click };
})();


//Event Listeners

const startButton = document.getElementById('start');
startButton.addEventListener('click', gameplay.newGame);

let cells = document.getElementsByClassName('cell')
Array.from(cells).forEach(element => {
    element.addEventListener('click', gameplay.click)
    });