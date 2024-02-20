import React, {useState} from 'react';
import QuestionController from './Controllers/QuestionController';
import ColeccionView from "./Views/ColeccionView";
import { BrowserRouter as Router, Route, Routes, Link, }
    from "react-router-dom";
import ConfiguratorObjectView from "./Views/ConfiguratorObjectView";
import DesignView from "./Views/DesignView";
import ConfiguratorObjectModel from "./classes/ConfiguratorObjectModel";
import {MyContext} from "./MyContext";

function App() {
    const [configObject, setConfigObject] = useState(new ConfiguratorObjectModel('', '', '', '', ''));
    const [objId, setObjId] = useState("");

    return (
      <div className="App">

              <Routes>
                  <Route exact path="/" element={<h1>Home Page</h1>} />
                  <Route exact path="colecciones" element={<ColeccionView />} />
                  <Route exact path="configuratorObject" element={<ConfiguratorObjectView />} />
                  <Route exact path="design/:id" element=<DesignView /> />
              </Routes>

              <li><Link to="colecciones">Start Your Configuration</Link></li>
      </div>
    );
}

export default App;




/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
