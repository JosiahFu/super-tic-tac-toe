import { h } from 'preact';
import Cell from './Cell';
import { Mark, MarkGrid } from 'src/App';
import { classList } from 'src/Util';

const SubGrid = ({ grid, win, onCellClick }: {
    grid: MarkGrid,
    win: Mark,
    onCellClick: (index: number) => void
}) => {
    const winPlayerClass = {
        null: '',
        Player_1: 'player-1',
        Player_2: 'player-2'
    }[win];

    return (<div class={`subgrid ${winPlayerClass}`}>
    {grid.map((mark, i) => (
        <Cell key={i} mark={mark} onClick={() => onCellClick(i)} />
    ))}
    </div>);
}

export default SubGrid;
