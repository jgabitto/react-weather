import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const INITIAL_STATE = {
    show: false, 
    newSite: null
}

const EditWebsiteModal = (props) => {
    const [value, setValue] = useState(INITIAL_STATE);
    const { show, newSite } = value;

    const onChange = (event) => {
        setValue({show: true, newSite: event.target.value})
    }

    const handleSave = () => {
        props.editSite(newSite, props.index)
        setValue({show: false, newSite });
    }

    const handleShow = () => setValue({show: true, value: null});
    const handleClose = () => setValue({show: false, value: null});
  
    return (
      <>
        <button className="btn btn-warning mx-1" type="button" onClick={handleShow}><FontAwesomeIcon icon={faEdit} /></button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Website</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onChange={onChange}>
                <Form.Group>
                    <Form.Label>Enter new website</Form.Label>
                    <input name="website" className="form-control" type="text" placeholder="Website" />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default EditWebsiteModal;