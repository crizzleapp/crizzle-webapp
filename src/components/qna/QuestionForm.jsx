import React, {useState} from 'react';
import axios from 'axios';
import {useAuth0} from "../auth/Auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function QuestionForm(props) {
    const {getTokenSilently} = useAuth0();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        getTokenSilently().then(token => {
            axios.post(`${process.env.REACT_APP_API_URL}/api/v1/questions/`,
                {title, description},
                {headers: {"Authorization": `Bearer ${token}`}})
                .then(response => {
                    console.log(response);
                })
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formQuestion">
                <Form.Label>Question Title</Form.Label>
                <Form.Control name="title" value={title} type="text" placeholder="Title"
                              onChange={e => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Label>Question Details</Form.Label>
                <Form.Control name="description" value={description} type="text" placeholder="Details"
                              onChange={e => setDescription(e.target.value)} as="textarea" rows="5"/>
            </Form.Group>
            <Button type="submit">Post</Button>
        </Form>
    );
}

// class QuestionForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             title: "",
//             description: "",
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
//         axios.post(`${process.env.REACT_APP_API_URL}/api/v1/questions/`,
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
//                 <Form.Group controlId="formQuestion">
//                     <Form.Label>Question Title</Form.Label>
//                     <Form.Control name="title" value={this.state.title} type="text" placeholder="Title"
//                                   onChange={this.handleChange}/>
//                 </Form.Group>
//                 <Form.Group controlId="formDescription">
//                     <Form.Label>Question Details</Form.Label>
//                     <Form.Control name="description" value={this.state.description} type="text" placeholder="Details"
//                                   onChange={this.handleChange} as="textarea" rows="5"/>
//                 </Form.Group>
//                 <Button type="submit">Post</Button>
//             </Form>
//         )
//     }
// }

export default QuestionForm;
