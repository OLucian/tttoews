import React from 'react';

const Lounge = (props) => {
    const { info, status, leaveGame } = props;
    return (
        <div className="full-center">
            <div className="alert alert-success" role="alert">
                {info}
            </div>
            <div className="alert alert-primary" role="alert">
                {status}
            </div>
            <button type="button" className="btn btn-outline-danger" style={{ width: '15vh', margin: 20 }} onClick={leaveGame}>Leave Game</button>
        </div>
    )
}

export default Lounge;