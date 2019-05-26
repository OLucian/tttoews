import React from 'react';

import Game from './screens/Game';
import Home from './screens/Home';

import './app.css';

class App extends React.Component {
    state = {
        connect: false,
    }

    connectToGame = () => {
        this.setState({ connect: true });
    }

    disconnect = () => {
        this.setState({ connect: false });
    }

    render() {
        const { connect } = this.state;
        if (connect) {
            return <Game disconnect={this.disconnect} />
        }

        return <Home action={this.connectToGame} />
    }
}

export default App;
