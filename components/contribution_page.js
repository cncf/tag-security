import { useState } from 'react';
import { Button, Container, Modal, Col, Row } from 'react-bootstrap';
import styles from '../styles/Sidemenu.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import contribution_guide from '../content/contribution_guide.md'
import contributors_list from '../content/contributors.md'

function Posts({ data, content }) {
    const contributors= matter(contributors_list)
    const contribute = matter(contribution_guide)
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button class="btn btn-link" onClick={handleShow}>
        contribute
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false} size="lg">
          <Modal.Header closeButton>
            <Modal.Title><h2>Contribute</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Container>
                  <Row>
                  <Col sm={4}>
                    <div style={{borderRight:'1px solid grey'}}>
                    <h4>{contributors.data.title}</h4>
                    <ReactMarkdown
                        escapeHtml={false}
                        source={contributors.content}
                    />
                    </div>
                  </Col>
                  
                  <Col sm={8}>
                  <h4>{contribute.data.title}</h4>
                  <ReactMarkdown
                    escapeHtml={false}
                    source={contribute.content}
                    />
                  </Col>
                  </Row>
              </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
export default Posts
