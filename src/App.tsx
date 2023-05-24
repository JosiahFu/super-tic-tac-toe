import { h } from "preact";
import Router, { Route } from "preact-router";
import Game from "./components/Game";
import basename from "./baseroute";

function App() {
    return (
        <main>
            <Game />
        </main>
    )
}

export default App;
