import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Button,Modal,Input,FormGroup,Checkbox} from 'react-bootstrap';
import {Pie} from "react-chartjs-2"
import Chart from "chart.js"
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
var Data = {
  "Question": "The Polls",
  "Option 1": "Option 1",
  "Option 2": "Option 2",
  "No1": 1,
  "No2": 2,
};
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
      <MyPie data={this.state.data}/>
      </div>
    );
  }
});
const Content = React.createClass({
  getInitialState(){
    return {};
  },

  handleSubmit1(e){
    e.preventDefault();
    post('/apiVote',{"option": "1","_id": this.props.data._id,"Question":this.props.data.Question},'post');
  },

  handleSubmit2(e){
    e.preventDefault();
    post('/apiVote',{"option": "2","_id": this.props.data._id},'post');
  },

  render(){
    if(this.props.data.haveVoted){
      return(
        <div>
        <h4>{this.props.data.Question}</h4>
        <FormGroup>
        <Button disabled>
        {this.props.data["Option 1"]}
        </Button>
        <Button disabled>
        {this.props.data["Option 2"]}
        </Button>
        </FormGroup>
        </div>
      );
    }
    else{
      return(
        <div>
        <h4>{this.props.data.Question}</h4>
        <FormGroup>
        <Button onClick={this.handleSubmit1}>
        {this.props.data["Option 1"]}
        </Button>
        <Button onClick={this.handleSubmit2}>
        {this.props.data["Option 2"]}
        </Button>
        </FormGroup>
        </div>
      );
    }
  }
});

var MyPie = React.createClass({
  getInitialState(){
    return {};
  },

  displayName: 'PieExample',

  render() {
    const pieData = {
    	labels: [
    		this.props.data["Option 1"],
    		this.props.data["Option 2"]
    	],
    	datasets: [{
    		data: [this.props.data.No1, this.props.data.No2],
    		backgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		],
    		hoverBackgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		]
    	}]
    }
    return (
      <div>
        <Pie data={pieData} />
      </div>
    );
  }
});
ReactDOM.render(
  <Poll/>,
  document.getElementById('root')
);
