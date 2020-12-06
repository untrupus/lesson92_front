import React from 'react';
import {useSelector} from "react-redux";
import {Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header/Header";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import MainPage from "./containers/MainPage/MainPage";
import Welcome from "./components/Welcome/Welcome";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/" />
};

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path="/" exact component={Welcome}/>
                <ProtectedRoute
                    path="/chat"
                    exact
                    component={MainPage}
                    isAllowed={user}
                />
                {/*<Route path="/chat" exact component={MainPage}/>*/}
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/signin" exact component={SignIn}/>
                <Route render={() => <h1>404</h1>}/>
            </Switch>
        </div>
    );
}

export default App;