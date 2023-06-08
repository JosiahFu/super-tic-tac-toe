import { Server, Socket } from 'socket.io';
import { GameState, Grid, Player, Winner, checkWinner, defaultState } from './game';
import { Server as HTTPServer } from 'http';

type Game = {
    Player_1: Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> | null,
    Player_2: Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> | null,
    state: GameState,
    id: string
}

const games = new Map<string, Game>();

type Response<T> = ({ ok: true } & T) | { ok: false, message: string };

interface ServerToClientEvents {
    'state-update': (newState: GameState) => void;
}

interface ClientToServerEvents {
    'update-state': (newState: GameState) => void;
    'start-game': (response: (response: Response<{ id: string, player: Player }>) => void) => void,
    'join-game': (id: string, response: (response: Response<{ player: Player }>) => void) => void;
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
    const io: Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> = new Server(server);

    // Socket.io connection event
    io.on('connection', socket => {
        console.log('A client connected.');

        socket.on('start-game', (response) => {
            const id = generateId();
            const game: Game = { Player_1: socket, Player_2: null, state: defaultState, id };
            games.set(id, game);
            console.log(`Starting game ${id}`);
            socket.data = { player: 'Player_1', game };
            response({ ok: true, id: id, player: 'Player_1' });
            console.log(`Player 1 Joined game ${id}`);
        });

        socket.on('join-game', (id, response) => {

            if (id.length !== 4 || !id.split('').every(value => value in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])) {
                response({ ok: false, message: 'Code is not valid, please double check it' });
                socket.disconnect();
                return;
            }

            const game = games.get(id);

            if (game === undefined) {
                response({ ok: false, message: 'Game does not exist, please double check it' });
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
            // Broadcast the updated state to all connected clients except the sender
            game.Player_1?.emit('state-update', game.state);
            game.Player_2?.emit('state-update', game.state);
            if (checkWinner(game.state.grids.map(checkWinner) as Grid<Winner>)) {
                game.Player_1?.disconnect();
                game.Player_2?.disconnect();
                games.delete(game.id);
                console.log(`Game ${game.id} finished and stopped`);
            }
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
            if (game.Player_1 === null && game.Player_2 === null) {
                games.delete(game.id);
                console.log(`Game ${game.id} stopped due to disconnection`);
            }
        });
    });
};

export { initializeSocket };
