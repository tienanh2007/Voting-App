import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Button,Modal,Input,FormGroup,Checkbox} from 'react-bootstrap';
var Data = [{
  "Question": "The Polls",
  "Option 1": "Option 1",
  "Option 2": "Option 2"
}];
const Poll = React.createClass({
  getInitialState(){
    return { data: Data};
  },
  componentDidMount(){
    $.ajax({
      url: '/api',
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
    return(
      <div>
      <h4>{this.props.data[0].Question}</h4>
      <FormGroup>
      <Button>
      {this.props.data[0]["Option 1"]}
      </Button>
      <Button>
      {this.props.data[0]["Option 2"]}
      </Button>
      </FormGroup>
      </div>
    );
  }
});
ReactDOM.render(
  <Poll/>,
  document.getElementById('root')
);
