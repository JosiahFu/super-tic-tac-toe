import { h } from "preact";
import Router, { Route } from "preact-router";
import Game from "./components/Game";
import basename from "./baseroute";

function App() {
	return (
		<main>
			<Router>
				<Route path={`${basename}/`} component={Game} />
			</Router>
		</main>
	)
}

export default App;
