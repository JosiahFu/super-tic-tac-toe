import { h } from 'preact';
import Cell from './Cell';
import { SubGridData } from 'src/App';

const SubGrid = ({grid,onCellClick} : {
    grid: SubGridData,
    onCellClick: (index: number) => void
}) => (<div class="subgrid">
    {grid.map((mark, i) => (
        <Cell key={i} mark={mark} onClick={() => onCellClick(i)} />
    ))}
</div>);

export default SubGrid;
