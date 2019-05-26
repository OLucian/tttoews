class TicTacToe {
    constructor() {
        this.gameInitialState = [ ['', '', ''], ['', '', ''], ['', '', ''] ];
        this.gameState = [ ['', '', ''], ['', '', ''], ['', '', ''] ];
        this.playerOneId = null;
        this.playerTwoId = null;
        this.playerOneMark = 'x';
        this.playerTwoMark = 'o';
        this.turn = 1;
        this.winner = null;
        this.hasEnded = false;
    }

    newGame(playerOneId, playerTwoId) {
        this.playerOneId = playerOneId;
        this.playerTwoId = playerTwoId;
        this.gameState = this.gameInitialState;
        this.turn = 1;
        this.winner = null;
        this.hasEnded = false;
        console.log('A NEW GAME HAS STARTED!');
        return {
            gameState: this.gameState,
            turn: this.turn,
            winner: this.winner,
            hasEnded: this.hasEnded,
        }
    }

    resetGame() {
        this.playerOneId = null;
        this.playerTwoId = null;
        this.gameState = this.gameInitialState;
        this.turn = 1;
        this.winner = null;
        this.hasEnded = false;
        console.log('THE GAME HAS BEEN RESETED!');
        return {
            gameState: this.gameState,
            turn: this.turn,
            winner: this.winner,
            hasEnded: this.hasEnded,
        }
    }

    getGameStateChange(data) {
        this.gameState = data.gameState;
        const { winner, hasEnded, line, playerWin } = this._checkIfSomeoneHasWon();
        this.turn = this._switchPlayer(data.turn);
        this.winner = winner;
        this.hasEnded = hasEnded;
        return {
            winner: this.winner,
            gameState: this.gameState,
            turn: this.turn,
            hasEnded: this.hasEnded,
            winningLine: line,
            playerWin: playerWin,
        }
    }

    _checkIfSomeoneHasWon() {
        console.log('CHECKING IF SOMEONE WON');
        // Sorry am sa aplic cel mai lame algoritm, ma apasa timpul :(
        const rows = [ [[0,0], [0,1], [0,2]],  [[1,0], [1,1], [1,2]],  [[2,0], [2,1], [2,2]]];
        const cols = [ [[0,0], [1,0], [2,0]],  [[0,1], [1,1], [2,1]],  [[0,2], [1,2], [2,2]]];
        const diags = [ [[0,0], [1,1], [2,2]],  [[0,2], [1,1], [2,0]] ];
        let winningLine = [];

        const winningRow = this._check3x(rows);
        console.log('CHECKING ROWS', winningRow);
        if(winningRow.length > 0) {
            winningLine = winningRow;
        } else {
            const winningCol = this._check3x(cols);
            console.log('CHECKING COLS', winningCol);
            if (winningCol.length > 0) {
                winningLine = winningCol;
            } else {
                const winningDiag = this._check3x(diags);
                console.log('CHECKING DIAGS', winningDiag);
                if (winningDiag.length > 0) {
                    winningLine = winningDiag;
                }
            }
        }
        
        let winner = winningLine.length > 0;
        let hasEnded = winner;
        let playerWin = null;
        if (winner) {
            if (this.gameState[winningLine[0][0]][winningLine[0][1]] === 'x') {
                playerWin = 1;
            } else {
                playerWin = 2;
            }
        }

        // if there is no winner check if the game has ended
        if (!winner) {
            hasEnded = true;
            this.gameState.forEach(squares => squares.forEach(square => {
                if (square === '') {
                    hasEnded = false;
                }
            }));
        }       
        
        return { winner, hasEnded, line: winningLine, playerWin };
    }

    _switchPlayer(playerNumber) {
        if (playerNumber === 1)
            return 2
        return 1;
    }

    _check3x(lines) {
        let winningLine = [];
        for(let i = 0; i < lines.length; i += 1) {
            const checked = this.gameState[lines[i][0][0]][lines[i][0][1]];
            let three = 0;
            if (checked !== '') {
                console.log('CHECKING LINE ...')
                for(let j = 0; j < lines[i].length; j += 1) {
                    console.log('CHECK: ', checked, this.gameState[lines[i][j][0]][lines[i][j][1]]);
                    if (checked !== this.gameState[lines[i][j][0]][lines[i][j][1]]) {
                        winningLine = [];
                        break;       
                    }
                    three += 1;
                }
            }
            console.log('three: ', three)
            if (three === 3) {
                winningLine = lines[i];
                break;
            }
        }
        return winningLine;
    }

}

module.exports = new TicTacToe();