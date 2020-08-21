"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var mintbean_png_1 = __importDefault(require("./mintbean.png"));
require("./styles/index.css");
function App() {
    return (<div className="App">
        <img src={mintbean_png_1.default} className="App-logo" alt="logo"/>
        <p>
          <code>App.js</code> is the entrypoint to your app.
        </p>
        <h2>HAPPY HACKING!</h2>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
    </div>);
}
exports.default = App;
