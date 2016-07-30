import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Button,Modal,Input,FormGroup,Checkbox} from 'react-bootstrap';
function post(path, params, method) {
  method = method || "post";
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    if(params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}

var Data = [
  {"username": "tienanh",
  "Question": "First Poll1",
  "Option 1": "choice 1 ",
  "Option 2": "choice 2"}
]
const Poll = React.createClass({
  getInitialState(){
    return { data: Data};
  },
  componentDidMount(){
    $.ajax({
      url: '/api2',
      type: 'GET',
      success: (dat) => {
        console.log('user polls found, data: ');
        console.log(dat);
        this.setState({data: dat})
      },
      error: (err) => {
        console.log(err);
      }
    });
  },

  render(){
    return(
      <div>
      <CreatingPoll/>
      <Content data={this.state.data}/>
      </div>
    );
  }
});
const Content = React.createClass({
  getInitialState(){
    return {};
  },

  render(){
    var nodes = this.props.data.map(function(node){
      return <div><Button href={"/polls/"+node._id}>{node.Question}</Button></div>
    })
  return(
    <div>
    {nodes}
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
    if(this.state.value1&&this.state.value2&&this.state.value3){
      post('/dashboard',{"Question": this.state.value1,"Option 1": this.state.value2,"Option 2":this.state.value3},"post");
      this.close();
    }
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
