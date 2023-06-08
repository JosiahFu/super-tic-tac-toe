import { useSubState, classList as cl } from "../Util";
import { GameState, Grid, Mark, Player, Winner } from "../Data";
import Game from "./Game";
import { h, Fragment } from "preact";
import { useEffect, useMemo, useState } from 'preact/hooks';
import { Socket, io } from 'socket.io-client';
import buttonStyles from '../style/button.module.css';

function NetworkGame({ gameId, onExit, onError }: {
    gameId?: string,
    onExit: () => void,
    onError: (message: string) => void
}) {
    const [gameState, setGameState] = useState<GameState>({
        grids: Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>,
        turn: 'Player_1',
        nextGrid: null
    });
    const [winner, setWinner] = useState<Winner>();

    const [id, setId] = useState(gameId);
    const [connected, setConnected] = useState(false);
    const [player, setPlayer] = useState<Player>()
    // const [tooltipShown, setTooltipShown] = useState(false);

    type Response<T> = ({ ok: true } & T) | { ok: false, message: string };

    interface ServerToClientEvents {
        'state-update': (newState: GameState) => void;
        'game-end': (winner: Winner, forfeit: boolean) => void;
    }

    interface ClientToServerEvents {
        'update-state': (newState: GameState) => void;
        'start-game': (response: (response: Response<{ id: string, player: Player }>) => void) => void;
        'join-game': (id: string, response: (response: Response<{ player: Player }>) => void) => void;
        'quit-game': () => void;
    }


    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => io(), []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.recovered);
        });

        if (id === undefined) {
            socket.emit('start-game', response => {
                if (!response.ok) {
                    onError(response.message);
                    onExit();
                    return;
                }

                setPlayer(response.player);
                setConnected(true);
                setId(response.id);
            });
        } else {
            socket.emit('join-game', id, response => {
                if (!response.ok) {
                    onError(response.message);
                    onExit();
                    return;
                }

                setPlayer(response.player)
                setConnected(true);
            });
        }

        // Event listener for state updates from the server
        socket.on('state-update', newState => {
            setGameState(newState);
        });

        socket.on('game-end', (winner) => {
            setWinner(winner);
        })

        socket.on('disconnect', () => {
            setConnected(false);
        });

        // Clean up socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, [socket, onError, onExit]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const handleExit = () => {
        socket.emit('quit-game');
        onExit();
    }

    const {
        grids: [grids, setGrids],
        turn: [turn, setTurn],
        nextGrid: [nextGrid, setNextGrid]
    } = useSubState([gameState, updateState]);

    const link = useMemo(() => `${window.location.href.split('?')[0]}?join=${id}`, [id]);

    return (<>
        {connected === false && winner === undefined && <p>You are disconnected</p>}
        {winner === player && <p>You won</p>}
        {winner !== undefined && winner !== player && <p>You lost</p>}
        {winner === 'tie' && <p>You tied</p>}
        <Game {...{
            grids, setGrids,
            turn, setTurn,
            nextGrid, setNextGrid,
            player
        }} />
        <div class={buttonStyles.buttonPanel}>
            <button onClick={handleExit} className={cl(buttonStyles.iconButton)}>&#8592;</button>
            <span>
                Game code: {id}
                <br />
                Game link: <a href={link}>{link}</a>
            </span>
            {/* <button onClick={() => setTooltipShown(!tooltipShown)} className={cl(buttonStyles.iconButton)}>&#128279;</button> */}
        </div>
    </>);
}

export default NetworkGame;
