export function debouncedDelay<A extends any[]>(callback: (...args: A) => void, delay: number): ((...args: A) => void) & {cancel: () => void} {
    let timeout: number | undefined = undefined;

    const trigger = (...args: A) => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay, ...args);
    }
    
    trigger.cancel = () => clearTimeout(timeout);
    
    return trigger;
}
