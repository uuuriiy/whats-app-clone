import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { initialState, reducer } from "./stateProvider/reducer";
import { StateProvider } from "./stateProvider/StateProvider";
import {ChatHeaderContext, SidebarHeaderContext} from "./context";
import {chatHeader, sidebarHeader} from "./constants";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
        <SidebarHeaderContext.Provider value={sidebarHeader}>
            <ChatHeaderContext.Provider value={chatHeader}>
                <App />
            </ChatHeaderContext.Provider>
        </SidebarHeaderContext.Provider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
