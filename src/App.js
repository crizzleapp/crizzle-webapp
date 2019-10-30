// Styles
import './App.css';

// React Components
import React, {Component} from "react";
import {Route, withRouter} from "react-router-dom";

// Custom Components
import UnderConstruction from "./components/UnderConstruction";
import Navigation from "./components/Navigation";
import Questions from "./components/qna/Questions";
import Question from "./components/qna/Question";

// Auth Components
import LoginCallback from "./components/LoginCallback";
import SecuredRoute from "./components/SecuredRoute";
import auth0Client from "./components/Auth";
import Profile from "./components/profile/Profile";
import About from "./components/About";

// Refer to examples at https://getbootstrap.com/docs/4.1/examples/ for best practices
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkingSession: true,
        }
    }

    async componentDidMount() {
        if (this.props.location.pathname === '/logincallback') {
            this.setState({checkingSession: false});
            return
        }
        try {
            await auth0Client.silentAuth();
            this.forceUpdate();
        } catch (err) {
            if (err.error !== 'login_required') console.log(err.error);
        }
        this.setState({checkingSession: false});
    }

    render() {
        return (
            <div className="App w-100 h-100">
                <div className="d-flex flex-column w-100 h-100 mx-auto">
                    <header className="mb-auto">
                        <Navigation/>
                    </header>
                    <main role="main" className="cover">
                        <SecuredRoute path="/questions" checkingSession={this.state.checkingSession}
                                      component={Questions}/>
                        <SecuredRoute path="/question/:questionId" checkingSession={this.state.checkingSession}
                                      component={Question}/>
                        <SecuredRoute path="/profile" checkingSession={this.state.checkingSession} component={Profile}/>
                        <Route path="/" exact component={UnderConstruction}/>
                        <Route path="/logincallback" exact component={LoginCallback}/>
                        <Route path="/about" component={About}/>
                    </main>
                    <footer className="mt-auto">
                    </footer>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
