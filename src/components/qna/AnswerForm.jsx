import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import axios from "axios";
import {useAuth0} from "../auth/Auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function AnswerForm(props) {
    const {getTokenSilently} = useAuth0();
    const [answer, setAnswer] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        getTokenSilently().then(token => {
            axios.post(`${process.env.REACT_APP_API_URL}/api/v1/questions/${props.questionId}/answer`,
                {answer},
                {headers: {"Authorization": `Bearer ${token}`}})
                .then(response => {
                    console.log(response);
                })
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAnswer">
                <Form.Label>Add your answer</Form.Label>
                <Form.Control name="answer" value={answer} type="text" placeholder="Details"
                              onChange={e => setAnswer(e.target.value)} as="textarea" rows="5"/>
            </Form.Group>
            <Button type="submit">Post</Button>
        </Form>
    )
}

// class AnswerForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             answer: "",
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(event) {
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value
//         });
//     }
//
//     handleSubmit(event) {
//         axios.post(`${process.env.REACT_APP_API_URL}/api/v1/questions/${this.props.questionId}/answer`,
//             this.state,
//             {headers: {"Authorization": `Bearer ${auth0Client.getIdToken()}`}})
//             .then(response => {
//                 console.log(response);
//             });
//         event.preventDefault();
//     }
//
//     render() {
//         return (
//             <Form onSubmit={this.handleSubmit}>
//                 <Form.Group controlId="formAnswer">
//                     <Form.Label>Add your answer</Form.Label>
//                     <Form.Control name="answer" value={this.state.answer} type="text" placeholder="Details"
//                                   onChange={this.handleChange} as="textarea" rows="5"/>
//                 </Form.Group>
//                 <Button type="submit">Post</Button>
//             </Form>
//         )
//     }
// }

export default withRouter(AnswerForm);
