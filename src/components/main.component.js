import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { Card, Button, Img } from "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap/dist/css/bootstrap.min.css";



const Topic = props =>{
  let groups = props.topic.categories;
  let listGroup = "";
  if (typeof(groups)!=="undefined" && groups.length > 0) {
    listGroup = (
      <ListGroup variant="flush">
        {groups.map(v => <ListGroup.Item key={v} onClick={()=>props.setCurrent(props.current + props.topic.id+ "/"+ v + "/" )}>
          {props.topics[v].title}
          </ListGroup.Item>)}
      </ListGroup>
    )
  }

//<Button  onClick={()=>props.setCurrent(props.current + props.topic.id+ "/")}>Explore</Button>
 return (
  <Card name={props.topic.title}>
    <Card.Body >
      <Card.Title onClick={()=>props.setCurrent(props.current + props.topic.id+ "/")}>{props.topic.title}</Card.Title>
      

      <Card.Text>
      {props.topic.text}
      </Card.Text>
      {listGroup}
    </Card.Body>
  </Card>
  )
}

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    //this.deleteChord = this.deleteChord.bind(this);
    this.getCategoryTopics = this.getCategoryTopics.bind(this);
    this.setCurrent = this.setCurrent.bind(this);
    this.upCurrent = this.upCurrent.bind(this);



    this.topic = {
      "id": "security-checks-in-developement",
      "title": "Security Checks in Development",
      "text": "Security hardening during the development phase forms a critical component in the deployment of applications. This means that security requirements must be introduced early in software development and treated in the same manner as any other requirement. These requirements are typically based on business needs around risk and compliance. Addressing these needs in the early phases prevents redoing work later in the lifecycle which slows down the DevOps pipeline, and increases overall costs."
    };
    
    this.state = {
      title: "Default Title",
      text:"Default Text",
      current: "",
      topics: [],
    };

    this.topics = {
      "root": {
        "id":"root",
        "title": "Cloud Native Security Map",
        "text": "Welcome to the Cloud Native Security Map",
        "categories":  [
          "develop",
          "distribute"
        ]
      },
      // First level
      "develop": {
        "id": "develop",
        "title": "Develop",
        "text": "Cloud native tools are meant to introduce security early in the application lifecycle. Security testing needs to identify compliance violations and misconfigurations early in order to create short and actionable feedback cycles for continuous improvement....",
        "categories": [
          "security-checks-in-developement",
          "development-of-tests",
          "code-review"
        ]
      },

      "distribute": {
        "id": "distribute",
        "title": "Distribute",
        "text": "Software supply chain safety is especially critical in models that enable faster software iteration. Cloud native application lifecycles need to include methods for verifying not only the integrity of the workload itself but also the process for workload creation and means of operation. This challenge is amplified by the necessary, practical, and consistent use of open source software and third party runtime images, including layers of upstream dependencies...",
        "categories": []
      },
      "security-checks-in-developement": {
        "id": "security-checks-in-developement",
        "title": "Security Checks in Development",
        "text": "Security hardening during the development phase forms a critical component in the deployment of applications. This means that security requirements must be introduced early in software development and treated in the same manner as any other requirement. These requirements are typically based on business needs around risk and compliance. Addressing these needs in the early phases prevents redoing work later in the lifecycle which slows down the DevOps pipeline, and increases overall costs."
      },
      "development-of-tests": {
        "id": "development-of-tests",
        "title": "Development of Tests",
        "text": "Developers, operators, and security personnel should build tests for code and infrastructure that is business-critical, has a high threat-profile, is subject to frequent change, or has/is a historical source of bugs. Threat modeling can identify high-risk and high-impact code hotspots that provide a high return on investment (ROI) for developing tests."
      },
      "code-review": {
        "id": "code-review",
        "title": "Code Review",
        "text": "Minor changes to a workload, or the infrastructure where the workload has been deployed, may have far-reaching security consequences. To mitigate the risk of unintended consequences, teams are encouraged to use the \"four eyes\" principle when conducting code review before prior changes are merged into the codebase (e.g. implementing a pull request in git workflow)."
      }
    }
  }

  componentDidMount() {
    this.setCurrent("/root/");
  }


  setCurrent(path) {
    console.log(path);

    var sps = path.split('/').filter(x => x!=="");
    let node = this.topics[sps[sps.length-1]];
    let topics  = [];

    if (typeof(node.categories) !== "undefined") {
      topics = node.categories;
    }

    this.setState({
      title: node.title,
      text: node.text,
      topics: topics,
      current: path,
    })
  }

  
  upCurrent() {
    if ( this.state.current === "/root/") {
      return
    }
    var sps = this.state.current.split('/');
    let upPath = sps.slice(0, sps.length-2).join('/') + "/";
    this.setCurrent (upPath);
  }

  getCategoryTopics() {

    return this.state.topics.map(name => 
      <Topic key={name}
             topic={this.topics[name]} 
             setCurrent={this.setCurrent}
             current={this.state.current}
             topics={this.topics}
      />)
  }


  render() {
    return (
      <div>
        <div className="header">
        <h1>Cloud Native Security Map</h1>

        <br/>
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick={this.upCurrent}>Back</Button>
          <Button variant="primary" onClick={()=>this.setCurrent("/root/")}>Top</Button>
        </ButtonGroup>
        <br/><br/>
        </div>

        <h3>{this.state.title}</h3>
        <p>{this.state.text}</p>
        <CardDeck>
        {this.getCategoryTopics()}

        </CardDeck>

      </div>
    )
  }
}