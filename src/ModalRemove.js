import { Component } from "react";
import { Button, Modal } from 'react-bootstrap'
export default class ModalRemove extends Component {
    render() {
        const { show, hideFunction, removeFunction } = this.props;
        return (
            <Modal show={show} onHide={hideFunction}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item</Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Are you sure to delete tasks?</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideFunction}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={removeFunction}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}