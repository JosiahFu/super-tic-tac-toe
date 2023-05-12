import { h } from 'preact';
import { GameGridData, Player } from 'src/App';
import SubGrid from './SubGrid';

const GameGrid = ({ grid, onCellClick, turn }: {
    grid: GameGridData,
    onCellClick: (index: number, subindex: number) => void,
    turn: Player
}) => {
    const playerClass = {
        Player_1: 'player-1-turn',
        Player_2: 'player-2-turn'
    }[turn];

    return (<div class={`game-grid ${playerClass}`}>
        {grid.map((subgrid, i) => (
            <SubGrid key={i} grid={subgrid} onCellClick={(subindex) => onCellClick(i, subindex)} />
        ))}
    </div>);
};

export default GameGrid;
