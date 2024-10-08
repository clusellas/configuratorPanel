import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useParams,
} from "react-router-dom";
import Index from "./Views/index";
import OpcionesPrimariasView from "./Views/opcionesPrimariasView";

import { MyContext } from "./MyContext";
import { createTheme, ThemeProvider } from "@mui/material";
import CompositionView from "./Views/CompositionView";
import CountryPopup from "./Components/CountryPopup";
import IntroducionView from "./Views/IntroducionView";

const theme = createTheme({
    palette: {
        primary: {
            main: "#574b46", // Set your primary color
        },
        secondary: {
            main: "#a8838f", // Set your secondary color
        },
        error: {
            main: "#f44336", // Set error color
        },
        accent: {
            main: "#332d28", // Set custom color
        },
        background: {
            main: "#e6e6e6", // Set custom color
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
        encimera_p: {},
        lavabo: {},
        espejo: {},
    });
    const { id } = useParams();

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <MyContext.Provider value={{ objData, setObjData }}>
                    <CountryPopup />
                    <Routes>
                        <Route exact path="/" element={<IntroducionView />} />
                        {}
                        <Route exact path="/index" element={<Index />} />
                        <Route
                            exact
                            path="/opciones-primarias"
                            element={<OpcionesPrimariasView />}
                        />
                        <Route
                            path="/composition/:id"
                            element={<CompositionView id={id} />}
                        />
                    </Routes>
                </MyContext.Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
