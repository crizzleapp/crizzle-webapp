import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AnswerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        axios.post(`http://localhost:9000/api/v1/questions/${this.props.questionId}/answer`, this.state).then(response => {
            console.log(response);
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Add your own answer
                    <textarea name="answer" value={this.state.description} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default AnswerForm;
