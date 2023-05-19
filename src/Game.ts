type Grid<T> = [T, T, T, T, T, T, T, T, T];

type Player = 'Player_1' | 'Player_2';
type Mark = Player | null;
type MarkGrid = Grid<Mark>;
type MarkGridGrid = Grid<MarkGrid>;

function checkWinner(grid: MarkGrid): Mark {
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
    return null;
}

export type { Player, Mark, MarkGrid, MarkGridGrid };
export { checkWinner };
