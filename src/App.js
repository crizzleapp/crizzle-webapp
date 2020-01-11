// Styles
import "./App.css"

// React Components
import React, {Component} from "react"
import {Route, BrowserRouter, Switch} from "react-router-dom"

// Structural
import Navigation from "./components/Navigation"
import Container from "react-bootstrap/Container"

// Site Components
import UnderConstruction from "./components/UnderConstruction"
import Questions from "./components/qna/Questions"
import Question from "./components/qna/Question"
import Settings from "./components/settings/Settings"
import Profile from "./components/settings/Profile"
import ApiKeys from "./components/settings/ApiKeys"
import About from "./components/About"

// Auth Components
import LoginCallback from "./components/auth/LoginCallback"
import SecuredRoute from "./components/auth/SecuredRoute"

class App extends Component {
    render() {
        return (
            <Container fluid className="w-100 h-100 bg-dark text-light text-center">
                <BrowserRouter>
                    <header className="mb-4">
                        <Navigation/>
                    </header>
                    <main role="main" className="mb-auto">
                        <Switch>
                            <SecuredRoute path="/questions" component={Questions}/>
                            <SecuredRoute path="/question/:questionId" component={Question}/>
                            <SecuredRoute path="/settings" component={Settings}/>
                            <SecuredRoute path="/profile" component={Profile}/>
                            <SecuredRoute path="/apikeys" component={ApiKeys}/>
                            <Route path="/" exact component={UnderConstruction}/>
                            <Route path="/logincallback" component={LoginCallback}/>
                            <Route path="/about" component={About}/>
                        </Switch>
                    </main>
                    <footer className="mt-auto">
                    </footer>
                </BrowserRouter>
            </Container>
        )
    }
}

export default App
