// Every time I have a new project I rewrite this implementation because I'm too lazy to find the old one

import { useRef, useState } from "preact/hooks";

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
const useSubState = <T>(stateHook: ReturnType<typeof useState<T>>): { [Key in keyof T]: ReturnType<typeof useState<T[Key]>> } => {
    const [state, setState] = stateHook;

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
