import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import GameGrid from './components/GameGrid';
import './style/game.css';

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

const App = () => {
	const [grids, setGrids] = useState<MarkGridGrid>(Array(9).fill(Array(9).fill(null) as MarkGrid) as MarkGridGrid);
	const [supergrid, setSupergrid] = useState<MarkGrid>(Array(9).fill(null) as MarkGrid);
	const [turn, setTurn] = useState<Player>('Player_1');
	
	const setCell = (index: number, subindex: number, mark: Mark) => {
		setGrids(grids.map(
			(subgrid,i) => i == index ? 
			subgrid.map((cell, i) => i == subindex ? mark : cell)
				: subgrid) as MarkGridGrid
		);
	}
	
	useEffect(() => {
		setSupergrid(grids.map(checkWinner) as MarkGrid);
	}, [grids])

	const toggleTurn = () => {
		setTurn(turn == 'Player_1' ? 'Player_2' : 'Player_1');
	}
	
	const handleCellClick = (index: number, subindex: number) => {
		if (grids[index][subindex] === null) {
			setCell(index, subindex, turn);
			toggleTurn();
		}
	}

	return (
		<main>
			<GameGrid grids={grids} supergrid={supergrid} onCellClick={handleCellClick} turn={turn} />
		</main>
	);
};

export default App;
export type { Player, Mark, MarkGrid, MarkGridGrid };
