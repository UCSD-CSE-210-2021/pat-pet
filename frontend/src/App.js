import React from "react";
import { WithStore } from "./components/ReactHooks/useStore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import PostPage from "./pages/Post";
import AppLayout from "./components/AppLayout";
import './App.css';
import './antd.css';

function App() {
  return (
    <WithStore>
    <div className="App">
        <Router>
          <Switch>
              <Route exact path="/">
                <AppLayout>
                  <HomePage />
                </AppLayout>
              </Route>
              <Route exact path="/search">
                <AppLayout>
                  <SearchPage />
                </AppLayout>
              </Route>
              <Route exact path="/newpet">
                <AppLayout>
                  <PostPage />
                </AppLayout>
              </Route>
          </Switch>
        </Router>
    </div>
    </WithStore>
  )
}

export default App;
