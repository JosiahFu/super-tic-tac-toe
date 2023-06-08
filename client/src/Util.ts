import { StateUpdater } from "preact/hooks";

// Every time I have a new project I rewrite this implementation because I'm too lazy to find the old one
/**
 * A utility that makes composing class names easier.
 * 
 * @param classNames A list of class names or `false` values, where `false`
 * values will be omitted. Recommended conditional usage:
 * ```
 * classList('class-a', condition && 'class-b')
 * ```
 * @returns The final list of classes processed into one string.
 */
function classList(...classNames: (string | false)[]): string {
    return (
        classNames
            .filter(e => e !== false)
            .join(' ')
    );
}

// Thank you https://blog.logrocket.com/typescript-mapped-types/#why-use-mapped-types-typescript
/**
 * A utility that lets you split an object into multiple substates that can be
 * recieved and set independently and concurrently
 * 
 * @param stateHook The state and setState from a `useState` hook
 * @returns An object with a state and setState for every property of the initial object
 */
const useSubState = <T extends object>([state, setState]: [T, StateUpdater<T>]): { [Key in keyof T]: [T[Key], StateUpdater<T[Key]>] } => {

    const entries = Object.entries(state);

    const convertedEntries = entries.map(([key, value]) => [key, [
        value,
        (updatedState: typeof value) => {
            setState(currentState => {
                const newState = structuredClone(currentState);
                newState[key as keyof T] = updatedState;
                return newState;
            });
        }
    ]]);

    return Object.fromEntries(convertedEntries);
};

export { classList, useSubState };
