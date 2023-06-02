import { Server, Socket } from 'socket.io';
import { GameState, Grid, Player, Winner, checkWinner, defaultState } from './game';
import { Server as HTTPServer } from 'http';

type Game = {
    Player_1: Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> | null,
    Player_2: Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> | null,
    state: GameState,
    // id: string
}

const game: Game = {
    Player_1: null,
    Player_2: null,
    state: defaultState
};

interface ServerToClientEvents {
    'state-update': (newState: GameState) => void;
    'set-player': (player: Player) => void;
    'game-full': () => void;
}

interface ClientToServerEvents {
    'update-state': (newState: GameState) => void;
}

interface SocketData {
    game: Game,
    player: Player
}

const initializeSocket = (server: HTTPServer) => {
    const io: Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> = new Server(server);

    // Socket.io connection event
    io.on('connection', socket => {
        console.log('A client connected.');

        socket.data.game = game;

        if (game.Player_1 === null) {
            socket.data.player = 'Player_1';
            game.Player_1 = socket;
            socket.emit('set-player', 'Player_1');
        } else if (game.Player_2 === null) {
            socket.data.player = 'Player_2';
            game.Player_2 = socket;
            socket.emit('set-player', 'Player_2');
        } else {
            socket.emit('game-full');
            socket.disconnect();
            return;
        }

        // Send all the states to the newly connected client
        socket.emit('state-update', game.state);

        // Event listener for state updates from clients
        socket.on('update-state', data => {
            game.state = data;
            // Broadcast the updated state to all connected clients except the sender
            socket.broadcast.emit('state-update', game.state);
            if (checkWinner(game.state.grids.map(checkWinner) as Grid<Winner>)) {
                io.disconnectSockets();
                game.Player_1 = null;
                game.Player_2 = null;
                game.state = defaultState;
            }
        });

        // Socket.io disconnection event
        socket.on('disconnect', () => {
            console.log('A client disconnected.');
            if (socket.data.player !== undefined) game[socket.data.player] = null;
        });
    });
};

export { initializeSocket };
