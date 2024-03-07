import React, {useState} from 'react';
import QuestionController from './Controllers/QuestionController';
import {BrowserRouter as Router, Route, Routes, Link, useParams,}
    from "react-router-dom";
import ConfiguratorObjectView from "./Views/ConfiguratorObjectView";
import DesignView from "./Views/DesignView";
import ConfiguratorObjectModel from "./classes/ConfiguratorObjectModel";
import ColeccionView from "./Views/ColeccionView";
import SizesView from "./Views/SizesView";

import {MyContext} from "./MyContext";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1a73e8', // Set your primary color
        },
        secondary: {
            main: '#7b1fa2', // Set your secondary color
        },
        error: {
            main: '#f44336', // Set error color
        },
        custom: {
            main: '#7b1fa2', // Set custom color
        },
        // You can define additional colors as needed
    },
});
function App() {
    const [configObject, setConfigObject] = useState(new ConfiguratorObjectModel('', '', '', '', ''));
    const [objId, setObjId] = useState({});

    const { id } = useParams();

    return (
      <div className="App">

          <ThemeProvider theme={theme}>

              <MyContext.Provider value={{ objId, setObjId }}>

                    <Routes>
                        <Route exact path="/" element={<h1>Home Page</h1>} />
                        <Route exact path="/colecciones" element={<ColeccionView />} />
                        <Route path="/configuratorObject/:id" element={<ConfiguratorObjectView id={id}/>} />
                        <Route exact path="/design" element={<DesignView />} />
                        <Route exact path="/size" element={<SizesView />} />
                    </Routes>
                    <li><Link to="colecciones">Start Your Configuration</Link></li>
                </MyContext.Provider>
          </ThemeProvider>

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
