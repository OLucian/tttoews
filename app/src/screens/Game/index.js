import React from 'react';
import SockJS from 'sockjs-client';
import uuidv1 from 'uuid';

import Lounge from '../Lounge';
import TicTacToe from '../TicTacToe';

const connectionInfoMessage = `Welcome, connecting ...`;
const connectionStatusMessage = 'Waiting for server to accept the connection ...';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.clientId = uuidv1();
        this.sock = new SockJS('http://localhost:8080/sockjs');
        this.player = 1;
        this.names = ['Player One', 'Player Two'];
    }

    state = {
        ready: false,
        data: {
            gameState: [ ['', '', ''], ['', '', ''], ['', '', ''] ],
            turn: 1,
            winner: null,
            hasEnded: false,
            winningLine: [],
            playerWin: null,
        },
        connectionInfoMessage,
        connectionStatusMessage,
    }

    componentDidMount() {
        this.initializeWSConnection();
    }

    componentWillUnmount() {
      this.sock.close()
    };

    initializeWSConnection = () => {
        this.sock.onopen = () => {
            console.log('The connection is open');
            const request = { getPlayerNumber: true };
            const data = JSON.stringify(request);
            this.sock.send(data);
        };
        
        this.sock.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log('WS_MESSAGE: ', data);
            if (data.changeGameState) {
                this.setState({
                    connectionInfoMessage: 'Game already in progress',
                    connectionStatusMessage: 'Please try again later!',
                })                
            }

            if (data.reset) {
                this.resetState();              
            }

            if (data.playerNumber) {
                this.player = data.playerNumber;
                this.setState({
                    connectionInfoMessage: `Welcome ${this.names[this.player - 1]}, you are now connected to the game.`,
                    connectionStatusMessage: 'Waiting for another player to join ...',
                })
            }

            if (data.startTheGame) {
                this.setState({ ready: true })
            }

            if (data.changeGameState) {
                const newData = {
                    gameState: data.gameState,
                    turn: data.turn,
                    winner: data.winner,
                    hasEnded: data.hasEnded,
                    winningLine: data.winningLine,
                    playerWin: data.playerWin,
                }
                this.setState({ data: newData })
            }
        };
        
        this.sock.onclose = () => {
          console.log('The connection has closed');
        };
    }

    resetState = () => {
        this.setState({
            ready: false,
            data: {
                gameState: [ ['', '', ''], ['', '', ''], ['', '', ''] ],
                turn: 1,
                winner: null,
                hasEnded: false,
                winningLine: [],
                playerWin: null,
            },
            connectionInfoMessage,
            connectionStatusMessage,
        });
    }

    sendGameChange = async (e) => {

        e.preventDefault();
        const div = e.target;
        const index = div.getAttribute('index').split('');
        const { data } = this.state;

        const i = Number(index[0]);
        const j = Number(index[1]);

        data.gameState[i][j] = data.turn === 1 ? 'x' : 'o';

        await this.setState({data});

        data.changeGameState = true;
        const json = JSON.stringify(data);
        this.sock.send(json);
    }

    leaveGame = () => {
        const { disconnect } = this.props;
        this.sock.close();
        disconnect();
    }

    render() {
        const {
            ready,
            data,
            connectionInfoMessage,
            connectionStatusMessage,
        } = this.state;

        if (!ready)
            return (
                <Lounge
                    info={connectionInfoMessage}
                    status={connectionStatusMessage}
                    leaveGame={this.leaveGame}
                />
            )
        
        return (
            <TicTacToe
                data={data}
                changeGame={this.sendGameChange}
                leaveGame={this.leaveGame}
                player={this.player}
            />
        );
    }
}

export default Game;
