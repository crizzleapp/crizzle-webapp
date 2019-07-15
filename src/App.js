// Styles
import './App.css';

// React Components
import React, {Component} from "react";
import {Route, withRouter} from "react-router-dom";

// Custom Components
import UnderConstruction from "./components/UnderConstruction";
import NavBar from "./components/Navbar";
import Questions from "./components/qna/Questions";
import Question from "./components/qna/Question";

// Auth Components
import LoginCallback from "./components/LoginCallback";
import SecuredRoute from "./components/SecuredRoute";
import auth0Client from "./components/Auth";

// Refer to examples at https://getbootstrap.com/docs/4.1/examples/ for best practices
class App extends Component {
    async componentDidMount() {
        if (this.props.location.pathname === '/logincallback') return;
        try {
            await auth0Client.silentAuth();
            this.forceUpdate();
        } catch (err) {
            if (err.error !== 'login_required') console.log(err.error());
        }
    }

    render() {
        return (
            <div className="App w-100 h-100">
                <div className="d-flex flex-column w-100 h-100 mx-auto">
                    <header className="mb-auto">
                        <NavBar/>
                    </header>
                    <main role="main" className="cover">
                        <SecuredRoute path="/questions" component={Questions}/>
                        <SecuredRoute path="/question/:questionId" component={Question}/>
                        <Route path="/" exact component={UnderConstruction}/>
                        <Route path="/logincallback" exact component={LoginCallback}/>
                    </main>
                    <footer className="mt-auto">
                    </footer>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
