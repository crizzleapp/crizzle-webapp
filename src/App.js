// Styles
import "./App.css";

// React Components
import React, {Component} from "react";
import {Route, BrowserRouter, Switch} from "react-router-dom";

// Custom Components
import UnderConstruction from "./components/UnderConstruction";
import Navigation from "./components/Navigation";
import Questions from "./components/qna/Questions";
import Question from "./components/qna/Question";
import Profile from "./components/settings/Profile";
import About from "./components/About";

// Auth Components
import LoginCallback from "./components/auth/LoginCallback";
import SecuredRoute from "./components/auth/SecuredRoute";

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         checkingSession: true,
    //     }
    // }
    //
    // async componentDidMount() {
    //     if (this.props.location.pathname === "/logincallback") {
    //         this.setState({checkingSession: false});
    //         return
    //     }
    //     try {
    //         await auth0Client.silentAuth();
    //         this.forceUpdate();
    //     } catch (err) {
    //         if (err.error !== "login_required") console.log(err.error);
    //     }
    //     this.setState({checkingSession: false});
    // }

    render() {
        return (
            <div className="App w-100 h-100">
                <div className="d-flex flex-column w-100 h-100 mx-auto">
                    <BrowserRouter>
                        <header className="mb-auto">
                            <Navigation/>
                        </header>
                        <main role="main" className="cover">
                            <Switch>
                                <SecuredRoute path="/questions" component={Questions}/>
                                <SecuredRoute path="/question/:questionId" component={Question}/>
                                <SecuredRoute path="/profile" component={Profile}/>
                                <Route path="/" exact component={UnderConstruction}/>
                                <Route path="/logincallback" component={LoginCallback}/>
                                <Route path="/about" component={About}/>
                            </Switch>
                        </main>
                        <footer className="mt-auto">
                        </footer>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
