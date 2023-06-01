import { useEffect, useMemo, useState } from "preact/hooks";
import { io } from "socket.io-client";

const useSocketState = <T,>(initialState: T, identifier: string, serverUrl?: string): [T, (newState: T) => void] => {
    const [state, setState] = useState(initialState);

    const socket = useMemo(() => io(serverUrl), [serverUrl]);

    useEffect(() => {
        // Event listener for state updates from the server
        socket.on('state-update', ({ identifier: updatedIdentifier, state: updatedState }) => {
            if (updatedIdentifier === identifier) {
                setState(updatedState);
            }
        });

        // Clean up socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, [socket, identifier]);

    const updateState = (newState: T) => {
        // Emit the state update to the server
        socket.emit('update-state', { identifier, state: newState });
        setState(newState);
    };

    return [state, updateState];
};

export default useSocketState;
