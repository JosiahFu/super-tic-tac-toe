import { h } from 'preact';
import { useState } from 'preact/hooks';
import GameGrid from './components/GameGrid';
import './style/game.css';
import { Mark, MarkGrid, MarkGridGrid, Player } from './Game';

const App = () => {
	const [grids, setGrids] = useState<MarkGridGrid>(Array(9).fill(Array(9).fill(null) as MarkGrid) as MarkGridGrid);
	const [turn, setTurn] = useState<Player>('Player_1');
	
	const setCell = (index: number, subindex: number, mark: Mark) => {
		setGrids(grids.map(
			(subgrid,i) => i == index ? 
			subgrid.map((cell, i) => i == subindex ? mark : cell)
				: subgrid) as MarkGridGrid
		);
	}

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
			<GameGrid grids={grids} onCellClick={handleCellClick} turn={turn} />
		</main>
	);
};

export default App;
