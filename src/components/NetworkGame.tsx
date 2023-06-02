import { useSubState } from "../Util";
import { GameState, Grid, Mark, Player } from "../Data";
import useSocketState from "../useSocketState";
import Game from "./Game";
import { h, Fragment } from "preact";
import { useEffect, useMemo, useState } from 'preact/hooks';
import { Socket, io } from 'socket.io-client';

function NetworkGame() {
    const [gameState, setGameState] = useState<GameState>({
        grids: Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>,
        turn: 'Player_1',
        nextGrid: null
    });

    const [player, setPlayer] = useState<Player | null>(null)

    interface ServerToClientEvents {
        'state-update': (newState: GameState) => void;
        'set-player': (player: Player) => void;
        'game-full': () => void;
    }

    interface ClientToServerEvents {
        'update-state': (newState: GameState) => void;
    }

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => io(), []);

    useEffect(() => {
        // Event listener for state updates from the server
        socket.on('state-update', newState => {
            console.log(newState);
            setGameState(newState);
        });

        socket.on('set-player', player => {
            setPlayer(player);
        })

        // Clean up socket connection on unmount
        return () => {
            socket.disconnect();
            setPlayer(null);
        };
    }, [socket]);

    const updateState = (value: GameState | ((prevState: GameState) => GameState)) => {
        if (typeof value === 'function') {
            setGameState(currentState => {
                const newState = (value as (prevState: GameState) => GameState)(currentState);
                socket.emit('update-state', newState);
                return newState;
            })
            return;
        }
        // Emit the state update to the server
        socket.emit('update-state', value);
        setGameState(value);
    };

    const {
        grids: [grids, setGrids],
        turn: [turn, setTurn],
        nextGrid: [nextGrid, setNextGrid]
    } = useSubState([gameState, updateState]);

    return (<>
        {player === null && <p>You are disconnected</p>}
        <Game {...{
            grids, setGrids,
            turn, setTurn,
            nextGrid, setNextGrid,
            player
        }} />
    </>);
}

export default NetworkGame;
