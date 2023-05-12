import { h } from 'preact';
import { GameGridData } from 'src/App';
import SubGrid from './SubGrid';

const GameGrid = ({grid, onCellClick: onSubGridClick} : {
    grid: GameGridData,
    onCellClick: (index: number, subindex: number) => void
}) => (<div class='game-grid'>
    {grid.map((subgrid, i) => (
        <SubGrid key={i} grid={subgrid} onCellClick={(subindex) => onSubGridClick(i, subindex)} />
    ))}
</div>);

export default GameGrid;
