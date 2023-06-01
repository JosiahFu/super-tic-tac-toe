import { useSubState } from "../Util";
import { GameState, Grid, Mark } from "../Data";
import useSocketState from "../useSocketState";
import Game from "./Game";
import { h } from "preact";

function NetworkGame() {
    const gameState = useSubState(useSocketState<GameState>({
        grids: Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>,
        turn: 'Player_1',
        nextGrid: null
    }))

    const [grids, setGrids] = gameState.grids;
    const [turn, setTurn] = gameState.turn
    const [nextGrid, setNextGrid] = gameState.nextGrid;

    return <Game {...{
        grids, setGrids,
        turn, setTurn,
        nextGrid, setNextGrid
    }} />
}

export default NetworkGame;
