import { h } from "preact";
import { useMemo } from "preact/hooks";
import { GridIndex, Mark, Grid, Player, checkWinner } from "../Data";
import { classList as cl } from "../Util";
import markerStyles from '../style/game/markers.module.css';
import gridStyles from '../style/game/grid.module.css';
import SubGrid from "./SubGrid";

function Game({ grids, setGrids, turn, setTurn, nextGrid, setNextGrid, onCellClick, player }: {
    grids: Grid<Grid<Mark>>,
    setGrids: (grids: Grid<Grid<Mark>>) => void,
    turn: Player,
    setTurn: (turn: Player) => void,
    nextGrid: GridIndex,
    setNextGrid: (nextGrid: GridIndex) => void,
    onCellClick?: () => void,
    player?: Player
}) {
    const winner = useMemo(() => (
        checkWinner(grids.map(checkWinner) as Grid<Mark>)
    ), [grids]);

    const getGridsWithSetCell = (index: number, subindex: number, mark: Mark) => {
        return grids.map(
            (subgrid, i) => i == index ?
                subgrid.map((cell, i) => i == subindex ? mark : cell)
                : subgrid) as Grid<Grid<Mark>>;
    }

    const toggleTurn = () => {
        setTurn(turn == 'Player_1' ? 'Player_2' : 'Player_1');
    }

    const handleCellClick = (index: GridIndex, subindex: GridIndex) => {
        if (grids[index][subindex] === null) {
            if (onCellClick) onCellClick();
            const newGrids = getGridsWithSetCell(index, subindex, turn);
            setGrids(newGrids);
            setNextGrid(checkWinner(newGrids[subindex]) === null ? subindex : null);
            toggleTurn();
        }
    }

    return (<div class={cl(
        gridStyles.grid,
        gridStyles.game,
        turn === 'Player_1' && markerStyles.player1Turn,
        turn === 'Player_2' && markerStyles.player2Turn,
        markerStyles.nextable,
        nextGrid === null && winner === null && markerStyles.next,
        (turn === player || player === undefined) && nextGrid === null && winner === null && markerStyles.allowed
    )}>
        {grids.map((subgrid, i: GridIndex) => (
            <div key={i} class={gridStyles.cell}>
                <SubGrid
                    grid={subgrid}
                    onCellClick={(subindex: GridIndex) => handleCellClick(i, subindex)}
                    allowed={(turn === player || player === undefined) && (nextGrid === i || nextGrid === null) && winner === null}
                    next={(nextGrid === i || nextGrid === null) && winner === null}
                />
            </div>
        ))}
    </div>);
}

export default Game;
