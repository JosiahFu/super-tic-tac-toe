import { h } from 'preact';
import 'preact/debug'; // TODO DISABLE IN BUILD
import LocalGame from './components/LocalGame';
import NetworkGame from './components/NetworkGame';

function App() {
    return (
        <main>
            <NetworkGame />
        </main>
    );
}

export default App;
