import { useEffect, useMemo, useState } from "preact/hooks";
import { Socket, io } from "socket.io-client";

const useSocketState = <T,>(initialState: T, serverUrl?: string): [T, (newState: T) => void] => {
    interface ServerToClientEvents {
        'state-update': (newState: T) => void
    }

    interface ClientToServerEvents {
        'update-state': (newState: T) => void
    }

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => serverUrl ? io(serverUrl) : io(), [serverUrl]);

    const [state, setState] = useState(initialState);

    useEffect(() => {
        // Event listener for state updates from the server
        socket.on('state-update', newState => {
            console.log(newState);
            setState(newState);
        });

        // Clean up socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const updateState = (value: T | ((prevState: T) => T)) => {
        if (typeof value === 'function') {
            setState(currentState => {
                const newState = (value as (prevState: T) => T)(currentState);
                socket.emit('update-state', newState);
                return newState;
            })
            return;
        }
        // Emit the state update to the server
        socket.emit('update-state', value);
        setState(value);
    };

    return [state, updateState];
};

export default useSocketState;
