import React from "react";
import { WithStore } from "./components/ReactHooks/useStore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import './App.css';
import './antd.css';

function App() {
  return (
    <WithStore>
    <div className="App">
      <AppLayout>
        <Router>
          <Switch>
              <Route exact path="/">
                <Home />
              </Route>
          </Switch>
        </Router>
      </AppLayout>
    </div>
    </WithStore>
  )
}

export default App;
