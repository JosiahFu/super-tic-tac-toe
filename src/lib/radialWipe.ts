import { type TransitionConfig } from 'svelte/transition'

function dsin(x: number) {
    if (x < 1)
        return x
    if (x >= 3)
        return x-4
    return -x+2
}

function dcos(x: number) {
    return Math.abs(x-2)-1
}

function diamondPathCw(progress: number) {
    return `${percent(dsin(progress) + 0.5)} ${percent(-dcos(progress) + 0.5)}`
}

function diamondPathCcw(progress: number) {
    return `${percent(-dsin(progress) + 0.5)} ${percent(-dcos(progress) + 0.5)}`
}

function percent(decimal: number) {
    return `${Math.round(decimal * 100)}%`
}

export function radialWipeCw(_node: HTMLElement, {duration = 400, delay = 0} = {}): TransitionConfig {
    return {
        duration,
        delay,
        css(t) {
            const step = Math.floor(4*t)
            return `clip-path: polygon(50% 50%, ${diamondPathCw(0)}, ${diamondPathCw(Math.min(1, step))}, ${diamondPathCw(Math.min(2, step))}, ${diamondPathCw(Math.min(3, step))}, ${diamondPathCw(4*t)}, 50% 50%);`
        }
    }
}


export function radialWipeCcw(_node: HTMLElement, {duration = 400, delay = 0} = {}): TransitionConfig {
    return {
        duration,
        delay,
        css(t) {
            const step = Math.floor(4*t)
            return `clip-path: polygon(50% 50%, ${diamondPathCcw(0)}, ${diamondPathCcw(Math.min(1, step))}, ${diamondPathCcw(Math.min(2, step))}, ${diamondPathCcw(Math.min(3, step))}, ${diamondPathCcw(4*t)}, 50% 50%);`
        }
    }
}
