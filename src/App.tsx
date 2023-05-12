import { h } from 'preact';
import { useState } from 'preact/hooks';
import GameGrid from './components/GameGrid';
import './style/game.css';

type Grid<T> = [T, T, T, T, T, T, T, T, T];

type Player = 'Player_1' | 'Player_2';
type Mark = Player | null;
type SubGridData = Grid<Mark>;
type GameGridData = Grid<SubGridData>;

const App = () => {
	const [game, setGame] = useState<GameGridData>(Array(9).fill(Array(9).fill(null) as SubGridData) as GameGridData);
	const [turn, setTurn] = useState<Player>('Player_1');
	
	const setCell = (index: number, subindex: number, mark: Mark) => {
		setGame(game.map(
			(subgrid,i) => i == index ? 
			subgrid.map((cell, i) => i == subindex ? mark : cell)
		    : subgrid) as GameGridData
		);
	}
	
	const toggleTurn = () => {
		setTurn(turn == 'Player_1' ? 'Player_2' : 'Player_1');
	}
	
	const handleCellClick = (index: number, subindex: number) => {
		if (game[index][subindex] === null) {
			setCell(index, subindex, turn);
			toggleTurn();
		}
	}

	return (
		<main>
			<GameGrid grid={game} onCellClick={handleCellClick} turn={turn} />
		</main>
	);
};

export default App;
export type { Player, Mark, SubGridData, GameGridData };
