import { useSubState } from "../Util";
import { GameState, Grid, Mark, Player } from "../Data";
import Game from "./Game";
import { h, Fragment } from "preact";
import { useEffect, useMemo, useState } from 'preact/hooks';
import { Socket, io } from 'socket.io-client';

function NetworkGame({ gameId, onExit }: {
    gameId?: string
    onExit: () => void;
}) {
    const [gameState, setGameState] = useState<GameState>({
        grids: Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>,
        turn: 'Player_1',
        nextGrid: null
    });

    const [id, setId] = useState(gameId);
    const [connected, setConnected] = useState(false);
    const [player, setPlayer] = useState<Player>()

    interface ServerToClientEvents {
        'state-update': (newState: GameState) => void;
    }

    interface ClientToServerEvents {
        'update-state': (newState: GameState) => void;
        'start-game': (response: (id: string, player: Player) => void) => void,
        'join-game': (id: string, response: (player: Player) => void) => void;
    }

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => io(), []);

    useEffect(() => {
        if (id === undefined) {
            socket.emit('start-game', (id, newPlayer) => {
                setPlayer(newPlayer);
                setConnected(true);
                setId(id);
            });
        } else {
            socket.emit('join-game', id, newPlayer => {
                setPlayer(newPlayer)
                setConnected(true);
            });
        }

        // Event listener for state updates from the server
        socket.on('state-update', newState => {
            setGameState(newState);
        });

        socket.on('disconnect', () => {
            setConnected(false);
        });

        // Clean up socket connection on unmount
        return () => {
            socket.disconnect();
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
        {connected === false && <p>You are disconnected</p>}
        <Game {...{
            grids, setGrids,
            turn, setTurn,
            nextGrid, setNextGrid,
            player
        }} />
    </>);
}

export default NetworkGame;
