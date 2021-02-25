import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { Card, Button, Img } from "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap/dist/css/bootstrap.min.css";



const Topic = props =>{
  let groups = props.topic.categories;
  let listGroup = "";
  if (typeof(groups)!=="undefined" && groups.length > 0) {
    listGroup = (
      <ListGroup variant="flush">
        {groups.map(v => <ListGroup.Item key={v} onClick={()=>props.setCurrent(props.current + props.topic.id+ "/"+ v + "/" )}><Link to="#">
          {props.topics[v].title}
          </Link></ListGroup.Item>)}
      </ListGroup>
    )
  }

//<Button  onClick={()=>props.setCurrent(props.current + props.topic.id+ "/")}>Explore</Button>
 return (
  <Card name={props.topic.title}>
    <Card.Body >
      <Link to="#">
        <Card.Title onClick={()=>props.setCurrent(props.current + props.topic.id+ "/")}>{props.topic.title}</Card.Title>
      </Link>

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
          "distribute",
          "deploy",
          "runtime"
        ]
      },

      // root
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
        "categories": ["build-pipeline", "image-scanning", "container-manifest-scanning", "testing", "artifacts-and-images"]
      },
      "deploy": {
        "id": "deploy",
        "title": "Deploy",
        "text": "The \"Deploy\" phase is responsible for incorporating a sequence of 'pre-flight' checks in order to ensure that the applications that are going to be deployed in the runtime environment conform and comply with organization wide security and compliance policies.",
      },
      "runtime": {
        "id": "runtime",
        "title": "Runtime",
        "text": "The Runtime phase comprises three critical areas: compute, access, and storage. While the runtime environment is dependent on the successful completion of the develop, distribute, and deploy phases, the security of the runtime is dependent on the efficacy of the security practices of the prior phases. The following paragraphs detail the security requirements and implications for each of these critical components.",
      },

      // /develop
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
      },
      // /distribute
      "build-pipeline": {
        "id": "build-pipeline",
        "title": "Build Pipeline",
        "text": "Continuous Integration (CI) servers should be isolated and restricted to projects of a similar security classification or sensitivity. Infrastructure builds which require elevated privileges should run on separate dedicated CI servers. Build policies should be enforced in the CI pipeline and by the orchestrator's admission controllers. ",
        "categories": []
      },
      "image-scanning": {
        "id": "image-scanning",
        "title": "Image Scanning (Image Scanning + Image hardening)",
        "text": "Scanning container images is a critical component of securing container applications throughout the lifecycle. It is vital to do the scanning in the CI pipeline before deploying the image to production. Incorporating this capability ensures that developers, operators, and security professionals have detailed information on all known vulnerabilities and details such as the severity, the Common Vulnerability Scoring System (CVSS) score, and availability of mitigation/fixes. ",
        "categories": []
      },
      "container-manifest-scanning": {
        "id": "container-manifest-scanning",
        "title": "Container Application Manifest Scanning",
        "text": "Application manifests describe the configurations required for the deployment of containerized applications. As mentioned in the Security Benchmarks section, guides such as the NIST 800-190 publication offer recommended security practices and configurations for application containers. It is vital to scan application manifests in the CI/CD pipeline in order to identify configurations that could potentially result in an insecure deployment posture.",
        "categories": []
      },
      "testing": {
        "id": "testing",
        "title": "Testing",
        "text": "Cloud native applications should be subjected to the same suite and standard of quality testing as traditional applications. These include the concepts of clean code, adherence to the Test Pyramid, application security scanning and linting through static application security testing (SAST), dependency analysis and scanning, dynamic application security testing (DAST) (e.g. mocking), application instrumentation, and full infrastructure with tests available to developers in local workflows. Automated test results should map back to requirements for dual attestation (developer and tool) for real-time security assurance to security and compliance teams.",
        // TODO: Add categories here
        "categories": []
      },
      "artifacts-and-images": {
        "id": "artifacts-and-images",
        "title": "Artifacts & Images",
        "text": "",
        "categories": ["registry-staging","signing-trust-integrity","artifact-encryption"]
      },

      // /distribute/artifacts-and-images
      "registry-staging": {
        "id": "registry-staging",
        "title": "registry-staging",
        "text": "Due to the use of open source components that are often pulled from public sources, organizations should create several stages of registries in their pipelines. Only authorized developers should be able to access public registries and pull base images, which are then stored in an internal registry for wide consumption within the organization. It is also advised to have separate private registries for keeping development artifacts per team or group, and finally a staging or pre-production registry for images ready for production. This enables tighter control over the provenance and security of open source components, while enabling different types of testing for stages in the CI/CD chain.",
      },
      "signing-trust-integrity": {
        "id": "signing-trust-integrity",
        "title": "Signing, Trust, and Integrity",
        "text": "Digital signing of image content at build time and validation of the signed data before use protects that image data from tampering between build and runtime, thus ensuring the integrity and provenance of an artifact. Confirmation starts with a process to indicate that an artifact was vetted and approved. The trust confirmation also includes verifying that the artifact has a valid signature. In the simplest case, each artifact can be signed by one signer to indicate a single testing and validation process that the artifact has gone through. However, the software supply chain is more complex in most cases, and creating a single artifact relies on multiple validation steps, thus depending on a conglomerate of entities' trust.",
      },
      "artifact-encryption": {
        "id": "artifact-encryption",
        "title": "Artifact Encryption",
        "text": "Container Image Encryption encrypts a container image so that its contents are confidential. The container image contents are encrypted to ensure that they remain confidential for promotion from build time through runtime. In the event of a compromised distribution, the image's registry contents remain secret, which can help for use cases such as protecting trade secrets or other confidential material.",
      },
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
        <ButtonGroup>
          <Button variant="primary" onClick={this.upCurrent}>Back</Button>
          <Button variant="primary" onClick={()=>this.setCurrent("/root/")}>Top</Button>
        </ButtonGroup>
        <br/>
        <br/>
        <div>Current Path: {this.state.current.slice("/root".length)}</div>
        <br/>
        <br/>
        </div>

        <h3>{this.state.title}</h3>
        <p>{this.state.text}</p>
        <CardColumns>
        {this.getCategoryTopics()}
        </CardColumns>

      </div>
    )
  }
}