// Styles
import './App.css';

// React Components
import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

// Custom Components
import UnderConstruction from "./components/UnderConstruction";
import NavBar from "./components/Navbar";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Questions from "./components/qna/Questions";
import Question from "./components/qna/Question";

// Refer to examples at https://getbootstrap.com/docs/4.1/examples/ for best practices
class App extends Component {
    render() {
        return (
            <div className="App w-100 h-100">
                <BrowserRouter>
                    <div className="d-flex flex-column w-100 h-100 mx-auto">
                        <header className="mb-auto">
                            <NavBar/>
                        </header>
                        <main role="main" className="cover">
                            <Route path="/questions" component={Questions}/>
                            <Route path="/question/:questionId" component={Question}/>
                            <Route path="/" exact component={UnderConstruction}/>
                        </main>
                        <footer className="mt-auto">
                        </footer>
                    </div>
                    <Switch>
                        <Route path="/" exact/>
                        <Route path="/profile" component={Profile}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
