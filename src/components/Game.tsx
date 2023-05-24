import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import GameGrid from './GameGrid';
import '../style/game.css';

type Grid<T> = [T, T, T, T, T, T, T, T, T];

type Player = 'Player_1' | 'Player_2';
type Mark = Player | null;
type MarkGrid = Grid<Mark>;
type MarkGridGrid = Grid<MarkGrid>;
type GridIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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

const Game = () => {
    const [grids, setGrids] = useState<MarkGridGrid>(Array(9).fill(Array(9).fill(null) as MarkGrid) as MarkGridGrid);
    const [turn, setTurn] = useState<Player>('Player_1');
    const [nextGrid, setNextGrid] = useState<null | GridIndex>(null);

    const winner = useMemo(() => (
        checkWinner(grids.map(checkWinner) as MarkGrid)
    ), [grids]);

    const getGridsWithSetCell = (index: number, subindex: number, mark: Mark) => {
        return grids.map(
            (subgrid, i) => i == index ?
                subgrid.map((cell, i) => i == subindex ? mark : cell)
                : subgrid) as MarkGridGrid;
    }

    const toggleTurn = () => {
        setTurn(turn == 'Player_1' ? 'Player_2' : 'Player_1');
    }

    const handleCellClick = (index: GridIndex, subindex: GridIndex) => {
        if (grids[index][subindex] === null) {
            const newGrids = getGridsWithSetCell(index, subindex, turn);
            setGrids(newGrids);
            console.log(newGrids);
            setNextGrid(checkWinner(newGrids[subindex]) === null ? subindex : null);
            toggleTurn();
        }
    }

    return (
        <GameGrid grids={grids} onCellClick={handleCellClick} turn={turn} nextGrid={nextGrid} winner={winner} />
    );
};

export type { Player, Mark, MarkGrid, MarkGridGrid, GridIndex };
export { checkWinner };
export default Game;
