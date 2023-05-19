import { h } from 'preact';
import { MarkGrid, MarkGridGrid, Player } from 'src/App';
import SubGrid from './SubGrid';

const GameGrid = ({ grids, supergrid, onCellClick, turn }: {
    grids: MarkGridGrid,
    supergrid: MarkGrid,
    onCellClick: (index: number, subindex: number) => void,
    turn: Player
}) => {
    const playerClass = {
        Player_1: 'player-1-turn',
        Player_2: 'player-2-turn'
    }[turn];

    return (<div class={`game-grid ${playerClass}`}>
        {grids.map((subgrid, i) => (
            <SubGrid key={i} grid={subgrid} win={supergrid[i]} onCellClick={(subindex) => onCellClick(i, subindex)} />
        ))}
    </div>);
};

export default GameGrid;
