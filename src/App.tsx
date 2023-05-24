import { h } from 'preact';
import { useState } from 'preact/hooks';
import GameGrid from './components/GameGrid';
import './style/game.css';
import { GridIndex, Mark, MarkGrid, MarkGridGrid, Player, checkWinner } from './Game';

const App = () => {
	const [grids, setGrids] = useState<MarkGridGrid>(Array(9).fill(Array(9).fill(null) as MarkGrid) as MarkGridGrid);
	const [turn, setTurn] = useState<Player>('Player_1');
	const [nextGrid, setNextGrid] = useState<null | GridIndex>(null);
	
	const getGridsWithSetCell = (index: number, subindex: number, mark: Mark) => {
		return grids.map(
			(subgrid,i) => i == index ? 
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
		<main>
			<GameGrid grids={grids} onCellClick={handleCellClick} turn={turn} nextGrid={nextGrid} />
		</main>
	);
};

export default App;
