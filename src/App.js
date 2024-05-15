import React, {useState} from 'react';
import QuestionController from './Controllers/QuestionController';
import {BrowserRouter as Router, Route, Routes, Link, useParams,}
    from "react-router-dom";
import ConfiguratorObjectView from "./Views/ConfiguratorObjectView";
import DesignView from "./Views/DesignView";
import ConfiguratorObjectModel from "./classes/ConfiguratorObjectModel";
import ColeccionView from "./Views/ColeccionView";
import SizesView from "./Views/SizesView";
import Index from "./Views/index"
import OpcionesPrimariasView from "./Views/opcionesPrimariasView";

import {MyContext} from "./MyContext";
import {createTheme, ThemeProvider} from "@mui/material";
import CompositionView from "./Views/CompositionView";
import CountryPopup from "./Components/CountryPopup";

const theme = createTheme({
    palette: {
        primary: {
            main: '#574b46', // Set your primary color
        },
        secondary: {
            main: '#a8838f', // Set your secondary color
        },
        error: {
            main: '#f44336', // Set error color
        },
        accent: {
            main: '#332d28', // Set custom color
        },
        background: {
            main: '#e6e6e6', // Set custom color
        },
        // You can define additional colors as needed
    },
});
function App() {
    const [objData, setObjData] = useState({
        current_obj: null,
        current_opt: null,
        mueble: {}, // State for mueble object
        encimera: {}, // State for encimera object
        encimera_p : {},
        lavabo: {},
        espejo: {}
    });
    const { id } = useParams();

    return (
      <div className="App">

          <ThemeProvider theme={theme}>

              <MyContext.Provider value={{ objData, setObjData }}>
                    <CountryPopup />
                    <Routes>
                        <Route exact path="/" element={<h1>Home Page</h1>} />
                        <Route exact path="/index" element={<Index />} />
                        <Route exact path="/opciones-primarias" element={<OpcionesPrimariasView />} />
                        <Route exact path="/colecciones" element={<ColeccionView />} />
                        <Route path="/configuratorObject/:id" element={<ConfiguratorObjectView id={id}/>} />
                        <Route path="/composition/:id" element={<CompositionView id={id}/>} />
                        <Route exact path="/design" element={<DesignView />} />
                        <Route exact path="/size" element={<SizesView />} />
                    </Routes>
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
