import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./routes";
import store from "./Redux/store";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const libraries = ["places"];

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </div>
  );
}

export default App;
