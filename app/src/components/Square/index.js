import React from 'react';
import './style.css';

const activeColor = '#c3e6cb';
const inactiveColor = '#CCC';
const defatulBorderColor = '#CCC';
const winBorderColor = '#c3e6cb';
const defaultBGColor = '#FFF';
const winBGColor = '#4ab062';
const looseBGColor = '#f8d7da';
const defaultTextColor = '#000';
const winTextColor = '#FFF';

const TicTacToe = (props) => {
    const { value, action, winningSquare, index, disabled, hasEnded, playerWin } = props;
    const color = hasEnded ? inactiveColor : defaultTextColor;
    const cursor = !disabled ? 'pointer' : 'default';
    const disabledBorderColor = !disabled ? activeColor : defatulBorderColor;
    const borderColor = playerWin && winningSquare ? winBorderColor : disabledBorderColor;
    const backgroundColor = playerWin && winningSquare ? winBGColor : defaultBGColor;
    return (
        <div
            index={index}
            className="ttt-square disable-select"
            style={{ 
                backgroundColor: !playerWin && winningSquare ? looseBGColor: backgroundColor,
                color: playerWin && winningSquare ? winTextColor : color,
                cursor,
                borderColor,
            }}
            onClick={!disabled? action : () => null}
        >
            {value}
        </div>
    )
}

export default TicTacToe;