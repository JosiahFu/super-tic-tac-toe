type Grid<T> = [T, T, T, T, T, T, T, T, T];

type Player = 'Player_1' | 'Player_2';
type Mark = Player | null;
type Winner = Player | 'tie' | null;
type GridIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type GameState = {
    grids: Grid<Grid<Mark>>,
    turn: Player,
    nextGrid: null | GridIndex
};

function checkWinner(grid: Grid<Mark> | Grid<Winner>): Winner {
    for (const player of ['Player_1', 'Player_2'] as const) {
        const checkIndices = (indices: number[]) => (
            indices.map(e => grid[e]).every(e => e === player)
        );

        for (const i of [0, 1, 2]) {
            if (checkIndices([3 * i, 3 * i + 1, 3 * i + 2])) return player;
            if (checkIndices([i, i + 3, i + 6])) return player;
        }
        if (checkIndices([0, 4, 8])) return player;
        if (checkIndices([2, 4, 6])) return player;
    }

    if (grid.some(e => e === null)) return null;

    return 'tie';
}

const defaultState: GameState = {
    grids: Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>,
    turn: 'Player_1',
    nextGrid: null
};

export type { Player, Mark, Grid, GridIndex, Winner, GameState };
export { checkWinner, defaultState };
