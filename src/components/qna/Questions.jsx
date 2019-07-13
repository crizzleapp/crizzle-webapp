import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import QuestionForm from "./QuestionForm";

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null
        };
    }

    fetchQuestions() {
        axios.get('http://localhost:9000/api/v1/questions/').then(response => {
            this.setState({questions: response.data});
        });
    }

    async componentDidMount() {
        this.fetchQuestions();
        this.timer = setInterval(() => {
            this.fetchQuestions()
        }, 1000);
    }

    async componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.questions === null && <p className="lead">Loading questions...</p>}
                    {this.state.questions && this.state.questions.map(question => (
                        <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                            <Link to={`/question/${question.id}`}>
                                <div className="card bg-light mb-3 text-white">
                                    <div className="card-body">
                                        <h4 className="card-title">{question.title}</h4>
                                        <p className="card-text">{question.description}</p>
                                    </div>
                                    <div className="card-footer text-light">{question.answers} answers</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <QuestionForm/>
            </div>
        );
    }
}

export default Questions;
