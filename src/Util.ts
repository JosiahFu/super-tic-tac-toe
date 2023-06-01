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

const useSubState = <T>(stateHook: ReturnType<typeof useState<T>>) => {

    const [state, setState] = stateHook;

    const stateRef = useRef(state);
    stateRef.current = state;

    return Object.fromEntries(Object.entries(stateRef.current).map(([key, value]) => [key, [value, (updatedState: typeof value) => {
        stateRef.current[key as keyof T] = updatedState;
        setState(stateRef.current);
    }]])) as { [Key in keyof T]: ReturnType<typeof useState<T[Key]>> };
};

export { classList, useSubState };
