import React from 'react';

const Home = (props) => {
    const { action } = props;
    return (
        <div className="full-center">
            <div className="alert alert-primary" role="alert" style={{ fontSize: '5vh', fontWeight: 'bold' }}>
                Play a game of Tic Tac Toe?
            </div>
            <button type="button" className="btn btn-primary" onClick={action}>Connect to game</button>
        </div>        
    )
}

export default Home;
