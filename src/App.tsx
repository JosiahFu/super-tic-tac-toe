import { h } from 'preact';
import 'preact/debug'; // TODO DISABLE IN BUILD
import LocalGame from './components/LocalGame';

function App() {
    return (
        <main>
            <LocalGame />
        </main>
    );
}

export default App;
