export type Mark = 'X' | 'O'

export type Result = Mark | '-' | null

export type Nine<T> = [T, T, T, T, T, T, T, T, T]

export type SubGrid = Nine<Mark | null>

export type SuperGrid = Nine<SubGrid>

function nineOf<T>(create: () => T): Nine<T> {
    return [...new Array(9).keys()].map(create) as Nine<T>
}

export function defaultState(): GameData {
    return {
        grid: nineOf(() => nineOf(() => null)),
        turn: 'X',
        nextGrid: null,
    }
}

export interface GameData {
    grid: SuperGrid
    turn: Mark
    nextGrid: number | null
}

function compare(...values: Result[]) {
    return (
        values[0] !== null &&
        values[0] !== '-' &&
        values.every((e, i) => i === 0 || e === values[i - 1])
    )
}

export function winnerOf(grid: Nine<Result>): Result {
    for (let i = 0; i < 3; i++) {
        if (compare(grid[i], grid[i + 3], grid[i + 6])) return grid[i]
        if (compare(grid[3 * i], grid[3 * i + 1], grid[3 * i + 2]))
            return grid[3 * i]
    }
    if (compare(grid[0], grid[4], grid[8])) return grid[0]
    if (compare(grid[2], grid[4], grid[6])) return grid[2]

    if (grid.every(e => e !== null)) return '-'

    return null
}

export interface MarkEventData {
    setMark(mark: Mark): void
    markIndex: number
}
