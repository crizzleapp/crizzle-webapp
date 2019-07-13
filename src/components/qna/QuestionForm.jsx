import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
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
        axios.post('http://localhost:9000/api/v1/questions/', this.state).then(response => {
            console.log(response);
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Question Title
                    <input name="title" value={this.state.title} onChange={this.handleChange}/>
                </label>
                <label>
                    Details
                    <textarea name="description" value={this.state.description} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Ask"/>
            </form>
        )
    }
}

export default QuestionForm;
