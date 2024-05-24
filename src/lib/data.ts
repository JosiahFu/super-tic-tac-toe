export type Mark = 'X' | 'O'

export type Nine<T> = [T, T, T, T, T, T, T, T, T]

export type SubGrid = Nine<Mark | undefined>

export type SuperGrid = Nine<SubGrid>

function nineOf<T>(create: () => T): Nine<T> {
    return [...new Array(9).keys()].map(create) as Nine<T>
}

export function defaultState(): GameData {
    return {
        grid: nineOf(() => nineOf(() => undefined)),
        turn: 'X',
        nextGrid: undefined,
    }
}

export interface GameData {
   grid: SuperGrid,
   turn: Mark,
   nextGrid: number | undefined 
}

function equals(...values: unknown[]) {
    return values.every((e, i) => i === 0 || e === values[i-1]);
}

export function winnerOf(grid: SubGrid): Mark | undefined {
    for (let i = 0; i < 3; i++) {
        if (equals(grid[i], grid[i + 3], grid[i + 6])) return grid[i]
        if (equals(grid[3*i], grid[3*i + 1], grid[3*i + 2])) return grid[3*i]
    }
    if (equals(grid[0], grid[4], grid[8])) return grid[0]
    if (equals(grid[2], grid[4], grid[6])) return grid[2]
        
    return undefined;
}

export interface MarkEventData {
    setMark(mark: Mark): void,
    markIndex: number
}
