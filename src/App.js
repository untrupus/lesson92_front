import React from 'react';
import {Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import MainPage from "./containers/MainPage/MainPage";

function App() {
  return (
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/signin" exact component={SignIn}/>
          <Route render={() => <h1>404</h1>}/>
        </Switch>
      </div>
  );
}

export default App;