import React from 'react';
import logo from './mintbean.png';
import './styles/index.css';

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>App.js</code> is the entrypoint to your app.
        </p>
        <h2>HAPPY HACKING!</h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;
