import React from "react";
import TopBar from "./components/TopBar/TopBar";

import Routes from './routes'
import {BrowserRouter} from "react-router-dom";
import CurrentUserChecker from "./components/currentUserChecker";


function App() {
  return (
    <div className="App">
        <CurrentUserChecker>
            <BrowserRouter>
                <TopBar />
                <Routes />
            </BrowserRouter>
        </CurrentUserChecker>
    </div>
  );
}

export default App;
