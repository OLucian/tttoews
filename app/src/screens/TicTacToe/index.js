import React from 'react';
import Square from '../../components/Square';
import './styles.css';

const yourTurnText = 'It\'s your turn, click on one of the empty squares!';
const notYourTurnText = 'Please wait for the other player to make a move ...';
const activeColor = '#c3e6cb';
const inactiveColor = '#e2e3e5';
const otherPlayerColor = '#fff3cd';
const infoBoxClassActive = 'alert alert-success disable-select';
const infoBoxClassInactive = 'alert alert-secondary disable-select';
const hasEndedClassInfoBox = 'alert alert-info disable-select';
const hasEndedText = 'Game has ended! press below to play again!';
const playAgainText = 'Play Again?';
const winMessage = 'YOU HAVE WON!';
const loostMessage = 'YOU LOST!';
const drawMessage = 'IT\'S A DRAW!';


const TicTacToe = (props) => {
    const { data, changeGame, player, leaveGame } = props;
    const { gameState, hasEnded, playerWin, winner } = data;
    const otherPlayer = data.turn !== player ? otherPlayerColor : activeColor;
    const bgColorP1 =  data.turn === 1 ? otherPlayer : inactiveColor;
    const bgColorP2 =  data.turn === 2 ? otherPlayer : inactiveColor;
    const yourTurn = data.turn === player;
    const infoBoxTurn = yourTurn ?  infoBoxClassActive : infoBoxClassInactive;
    const turnText = yourTurn ? yourTurnText : notYourTurnText;
    const infoText = hasEnded ? hasEndedText : turnText;
    const infoBoxType = hasEnded ? hasEndedClassInfoBox : infoBoxTurn;

    return (
        <div className="full-space-around">
            <div style={{ alignSelf: 'center', textAlign: 'center', height: '10vh' }}>
                { 
                    hasEnded 
                        ? <button type="button" className="btn btn-primary" onClick={leaveGame}>{playAgainText}</button>
                        : (
                            <div className={infoBoxType} role="alert">
                                {infoText}
                            </div>
                        )
                }
                {
                    winner && (playerWin === player)
                        ? (
                            <div className={infoBoxClassActive} style={{ backgroundColor: '#4ab062', color: '#FFF', fontSize: '3vh', marginTop: '2vh' }} role="alert">
                                {winMessage}
                            </div>
                        )
                        : null
                }
                {
                    winner && !(playerWin === player)
                        ? (
                            <div className="alert alert-danger disable-select" style={{ backgroundColor: '#dc3545', color: '#FFF', fontSize: '3vh', marginTop: '2vh'}} role="alert">
                                {loostMessage}
                            </div>
                        )
                        : null
                }
                {
                    !winner && hasEnded
                        ? (
                            <div className="alert alert-info disable-select" style={{ backgroundColor: '#17a9e8', color: '#FFF', fontSize: '3vh', marginTop: '2vh'}} role="alert">
                                {drawMessage}
                            </div>
                        )
                        : null
                }
            </div>
            
            <div className="row-center">

                <div style={{ backgroundColor: hasEnded ? inactiveColor: bgColorP1, padding: '5vh',  marginRight: '1vh', borderRadius: '2vh' }}>
                    <div className="player-text disable-select" style={{ textAlign: 'right' }}>PLAYER ONE</div>
                </div>

                <div className="ttt-wrapper">
                    <div>
                        { 
                            gameState.map((squares, i) => {
                                return (
                                    <div key={i} className="ttt-line-wrapper">
                                        {   
                                            gameState[i].map((square, j) => {
                                                const hasData = gameState[i][j] !== '';
                                                const key = `${i}${j}`;
                                                const disabled = data.turn !== player || hasData || hasEnded;
                                                let winningSquare = false;
                                                if (playerWin && data.winningLine.length > 0) {
                                                    const { winningLine } = data;
                                                    const sq1 = winningLine[0].join('');
                                                    const sq2 = winningLine[1].join('');
                                                    const sq3 = winningLine[2].join('');
                                                    winningSquare = sq1 === key || sq2 === key || sq3 === key;
                                                }                                                
                                                return (
                                                    <Square
                                                        action={changeGame}
                                                        value={gameState[i][j]}
                                                        key={key}
                                                        index={key}
                                                        disabled={disabled}
                                                        hasEnded={hasEnded}
                                                        playerWin={playerWin === player}
                                                        winningSquare={winningSquare}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div style={{ backgroundColor: hasEnded ? inactiveColor : bgColorP2, padding: '5vh', marginLeft: '1vh', borderRadius: '2vh' }}>
                    <div className="player-text disable-select" style={{ textAlign: 'left' }}>PLAYER TWO</div>
                </div>

            </div>

            {
                !winner
                    ? (
                        <div style={{ alignSelf: 'center', height: '2vh' }}>
                            <button type="button" className="btn btn-outline-danger" style={{ width: '15vh', margin: 20 }} onClick={leaveGame}>Leave Game</button>
                        </div>
                    )
                    : <div style={{ alignSelf: 'center', height: '2vh' }}></div>
            }

        </div>
    )
}

export default TicTacToe;
