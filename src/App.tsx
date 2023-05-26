import { h } from "preact";
import { useMemo, useRef, useState } from "preact/hooks";
import { GridIndex, Mark, MarkGrid, MarkGridGrid, Player, checkWinner } from "./Game";
import GameGrid from "./components/GameGrid";
import './style/game/layout.css';
import './style/game/grid.css';
import './style/game/markers.css';
import './style/game/button.css';

function App() {
    const [grids, setGrids] = useState<MarkGridGrid>(Array(9).fill(Array(9).fill(null) as MarkGrid) as MarkGridGrid);
    const [turn, setTurn] = useState<Player>('Player_1');
    const [nextGrid, setNextGrid] = useState<null | GridIndex>(null);
    const history = useRef<{ grids: typeof grids, turn: typeof turn, nextGrid: typeof nextGrid }[]>([]);

    const undo = () => {
        const historyItem = history.current.pop();
        setGrids(historyItem.grids);
        setTurn(historyItem.turn);
        setNextGrid(historyItem.nextGrid);
    }

    const winner = useMemo(() => (
        checkWinner(grids.map(checkWinner) as MarkGrid)
    ), [grids]);

    const getGridsWithSetCell = (index: number, subindex: number, mark: Mark) => {
        return grids.map(
            (subgrid, i) => i == index ?
                subgrid.map((cell, i) => i == subindex ? mark : cell)
                : subgrid) as MarkGridGrid;
    }

    const toggleTurn = () => {
        setTurn(turn == 'Player_1' ? 'Player_2' : 'Player_1');
    }

    const handleCellClick = (index: GridIndex, subindex: GridIndex) => {
        if (grids[index][subindex] === null) {
            const newGrids = getGridsWithSetCell(index, subindex, turn);
            setGrids(newGrids);
            console.log(newGrids);
            setNextGrid(checkWinner(newGrids[subindex]) === null ? subindex : null);
            history.current.push({ grids, turn, nextGrid });
            toggleTurn();
        }
    }

    return (
        <main>
            <GameGrid grids={grids} onCellClick={handleCellClick} turn={turn} nextGrid={nextGrid} winner={winner} />
            <button onClick={undo} className={`undo ${history.current.length === 0 ? 'hidden' : ''}`}>&#8630;</button>
        </main>
    );
}

export default App;
