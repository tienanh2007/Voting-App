import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Modal,Input,FormGroup,Checkbox} from 'react-bootstrap';
var Data = {
  "Question": "The Poll",
  "Option 1": "Option 1",
  "Option 2": "Option 2"
}
class Asd extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <div>
      1
      </div>
    );
  }
}
const Poll = React.createClass({
  getInitialState(){
    return { data: Data};
  },

  formSubmit(question,option1,option2){
    Data.Question = question;
    Data["Option 1"] = option1;
    Data["Option 2"] = option2;
    console.log(Data);
    this.setState(Data);
  },

  render(){
    return(
      <div>
      <CreatingPoll onSubmit = {this.formSubmit}/>
      <Content data={this.state.data}/>
      <Asd/>
      </div>
    );
  }
});
const Content = React.createClass({
  getInitialState(){
    return {};
  },

  render(){
    return(
      <div>
      <h4>{this.props.data.Question}</h4>
      <FormGroup>
      <Checkbox>
      {this.props.data["Option 1"]}
      </Checkbox>
      <Checkbox>
      {this.props.data["Option 2"]}
      </Checkbox>
      </FormGroup>
      </div>
    );
  }
});
const CreatingPoll = React.createClass({
  getInitialState(){
    return {
      showModal:false,
      value1: "",
      value2: "",
      value3: ""
    };
  },

  close(){
    this.setState({showModal: false});
  },

  open(){
    this.setState({showModal: true});
  },

  handleChange1(event) {
    this.setState({
      value1: event.target.value
    });
  },

  handleChange2(event) {
    this.setState({
      value2: event.target.value
    });
  },

  handleChange3(event) {
    this.setState({
      value3: event.target.value
    });
  },

  handleSubmit(e){
    e.preventDefault();
    this.props.onSubmit(this.state.value1,this.state.value2,this.state.value3);
    this.close();
  },

  render(){
    return(
      <div>
      <Button
      bsStyle="primary"
      bsSize="large"
      onClick={this.open}
      >
      Launch demo modal
      </Button>
      <Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
      <Modal.Title>Pick a poll</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
      <h4>Question</h4>
      <Input
      type="text"
      value={this.state.value1}
      onChange={this.handleChange1}
      placeholder="Poll"
      />
      <h4>Choice 1</h4>
      <Input
      type="text"
      value={this.state.value2}
      onChange={this.handleChange2}
      placeholder="Option 1"
      />
      <h4>Choice 2</h4>
      <Input
      type="text"
      value={this.state.value3}
      onChange={this.handleChange3}
      placeholder="Option 2"
      />
      </form>
      </Modal.Body>
      <Modal.Footer>
      <Button bsStyle="primary" onClick={this.handleSubmit}> Submit </Button>
      <Button onClick={this.close}>Close</Button>
      </Modal.Footer>
      </Modal>
      </div>
    );
  }
});

ReactDOM.render(
  <Poll/>,
  document.getElementById('root')
);
