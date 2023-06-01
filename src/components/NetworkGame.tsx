import { Grid, GridIndex, Mark, Player } from "../Data";
import useSocketState from "../Socket";
import Game from "./Game";
import { h } from "preact";

function NetworkGame() {
    const [grids, setGrids] = useSocketState(Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>, 'grids');
    const [turn, setTurn] = useSocketState<Player>('Player_1', 'turn');
    const [nextGrid, setNextGrid] = useSocketState<null | GridIndex>(null, 'nextGrid');

    return <Game {...{
        grids, setGrids,
        turn, setTurn,
        nextGrid, setNextGrid
    }} />
}

export default NetworkGame;
