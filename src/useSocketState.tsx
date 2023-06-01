import { useEffect, useMemo, useState } from "preact/hooks";
import { Socket, io } from "socket.io-client";

const useSocketState = <T,>(initialState: T, serverUrl?: string): [T, (newState: T) => void] => {
    interface ServerToClientEvents {
        'state-update': (newState: T) => void
    }

    interface ClientToServerEvents {
        'update-state': (newState: T) => void
    }

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => io(serverUrl), [serverUrl]);

    const [state, setState] = useState(initialState);

    useEffect(() => {
        // Event listener for state updates from the server
        socket.on('state-update', newState => {
            setState(newState);
        });

        // Clean up socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const updateState = (newState: T) => {
        // Emit the state update to the server
        socket.emit('update-state', newState);
        setState(newState);
    };

    return [state, updateState];
};

export default useSocketState;
