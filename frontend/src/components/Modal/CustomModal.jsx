import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, title, message, onConfirm, onCancel, onHide = null, showAbortButton }) => {
    return (
        <Modal show={show} onHide={onHide} keyboard={false}> 
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                {showAbortButton && <Button variant="secondary" onClick={onCancel}>
                    Annulla
                </Button>}
                <Button variant="primary" onClick={onConfirm}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
