import { h } from "preact";
import { Mark } from "src/App";

const Cell = ({mark, onClick}:{
    mark: Mark,
    onClick?: () => void
}) => (
    <div class="cell" onClick={() => onClick ? onClick(/*Potential future arguments*/) : void(0)}>{
        {
            null: '',
            Player_1: 'X',
            Player_2: 'O'
        }[mark]
    }</div>
);

export default Cell;
