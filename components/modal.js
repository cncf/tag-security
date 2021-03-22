import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ReactMarkdown from 'react-markdown'

function Posts({ data, content }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button class="btn btn-link" onClick={handleShow}>
        {data.title}
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false} size="lg">
          <Modal.Header
            closeButton><h2>{data.title}</h2>
          </Modal.Header>
          <Modal.Body >
            <ReactMarkdown source={content} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
export default Posts