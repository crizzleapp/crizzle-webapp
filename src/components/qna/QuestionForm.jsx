import React, {Component} from 'react';
import axios from 'axios';
import auth0Client from "../Auth";

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
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/questions/`,
            this.state,
            {headers: {"Authorization": `Bearer ${auth0Client.getIdToken()}`}})
            .then(response => {
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
