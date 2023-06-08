import { Server, Socket } from 'socket.io';
import { GameState, Grid, Player, Winner, checkWinner, defaultState } from './game';
import { Server as HTTPServer } from 'http';

/*
 * Spaghettification:
 *
 * The cosmic phenomenon that occurs when a piece of code becomes so entangled and
 * convoluted that it transforms into a plate of tangled spaghetti, leaving
 * programmers wondering if they accidentally stumbled into an Italian restaurant
 * instead of the office.
 * 
 * --ChatGPT
 */

class Game {
    Player_1: Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> | null = null;
    Player_2: Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> | null = null;
    state: GameState = defaultState;
    id: string;
    timeout?: NodeJS.Timeout;
    stop: () => void;

    constructor(id: string, onStop: () => void) {
        this.id = id;
        this.stop = onStop;
        this.updateTime();
    }

    updateTime() {
        if (this.timeout) clearTimeout(this.timeout);

        const playerCount = [this.Player_1, this.Player_2].filter(e => e !== null).length;
        const time = {
            0: 60 * 1000, // 1 minute if neither player is online
            1: 10 * 60 * 1000, // 10 minutes if one player is online
            2: 60 * 60 * 1000, // 1 hour if both players are online
        }[playerCount];

        this.timeout = setTimeout(this.stop, time);
    }
}

const games = new Map<string, Game>();

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

interface SocketData {
    game: Game,
    player: Player
}

const generateId = () => {
    let id;
    do {
        id = '';
        for (let i = 0; i < 4; i++) {
            id += Math.floor(10 * Math.random());
        }
    } while (games.has(id));

    return id;
};

const initializeSocket = (server: HTTPServer) => {
    const io: Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> = new Server(server, {
        connectionStateRecovery: {
            // the backup duration of the sessions and the packets
            maxDisconnectionDuration: 2 * 60 * 1000,
            // whether to skip middlewares upon successful recovery
            skipMiddlewares: true,
        }
    });

    // Socket.io connection event
    io.on('connection', socket => {
        if (socket.recovered &&
            socket.data.game && socket.data.player &&
            socket.data.game.id in games &&
            socket.data.game[socket.data.player] === null
        ) {
            console.log('A client reconnected');
            socket.data.game[socket.data.player] = socket;
            socket.data.game.updateTime();
            return;
        }

        console.log('A client connected.');

        socket.on('start-game', (response) => {
            const id = generateId();
            const game = new Game(id, () => {
                games.delete(id);
                game.Player_1?.disconnect();
                game.Player_2?.disconnect();
            });
            game.Player_1 = socket;
            games.set(id, game);
            console.log(`Starting game ${id}`);
            socket.data = { player: 'Player_1', game };
            response({ ok: true, id: id, player: 'Player_1' });
            console.log(`Player 1 Joined game ${id}`);
        });

        socket.on('join-game', (id, response) => {

            if (id.length !== 4 || !id.split('').every(value => value in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])) {
                response({ ok: false, message: 'Code is not valid, please double check the id' });
                socket.disconnect();
                return;
            }

            const game = games.get(id);

            if (game === undefined) {
                response({ ok: false, message: 'Game does not exist, please double check the id' });
                socket.disconnect();
                return;
            }

            if (game.Player_1 !== null && game.Player_2 !== null) {
                response({ ok: false, message: 'Game is full' });
                socket.disconnect();
                return;
            }

            socket.data.game = game;

            // Send all the states to the newly connected client
            socket.emit('state-update', game.state);
            game.updateTime();

            if (game.Player_1 === null) {
                game.Player_1 = socket;
                socket.data.player = 'Player_1';
                response({ ok: true, player: 'Player_1' });
                console.log(`Player 1 joined game ${id}`);
                return;
            }

            game.Player_2 = socket;
            socket.data.player = 'Player_2';
            response({ ok: true, player: 'Player_2' });
            console.log(`Player 2 joined game ${id}`);

        });


        // Event listener for state updates from clients
        socket.on('update-state', data => {
            const game = socket.data.game;
            if (game === undefined) return;

            game.state = data;
            game.updateTime();
            // Broadcast the updated state to all connected clients except the sender
            if (socket.data.player !== 'Player_1') game.Player_1?.emit('state-update', game.state);
            if (socket.data.player !== 'Player_2') game.Player_2?.emit('state-update', game.state);
            const winner = checkWinner(game.state.grids.map(checkWinner) as Grid<Winner>);
            if (winner !== null) {
                game.Player_1?.emit('game-end', winner, false);
                game.Player_2?.emit('game-end', winner, false);
                game.stop();
                console.log(`Game ${game.id} finished and stopped`);
            }
        });

        socket.on('quit-game', () => {
            const game = socket.data.game;
            if (game === undefined || socket.data.player === undefined) return;
            if (game.Player_1 !== null) {
                game.Player_1.emit('game-end', 'Player_1', true);
                game.Player_1.disconnect();
            }
            if (game.Player_2 !== null) {
                game.Player_2.emit('game-end', 'Player_1', true);
                game.Player_2.disconnect();
            }
            games.delete(game.id);
            console.log(`Game ${game.id} stopped due to quit`);
        });

        // Socket.io disconnection event
        socket.on('disconnect', () => {
            console.log('A client disconnected.');
            const game = socket.data.game;
            if (game === undefined || socket.data.player === undefined) return;
            game[socket.data.player] = null;
            if (socket.data.player === 'Player_1') {
                console.log(`Player 1 left game ${game.id}`);
            } else {
                console.log(`Player 2 left game ${game.id}`);
            }
        });
    });
};

export { initializeSocket };
