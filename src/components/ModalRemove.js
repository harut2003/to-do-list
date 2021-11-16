import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
export default function ModalRemove({ show, hideFunction, removeFunction, count }) {
    return (
        <Modal show={show} onHide={hideFunction} centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure to remove {count} task{count > 1 ? "s" : ""}?</Modal.Title>
            </Modal.Header>
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
ModalRemove.propTypes = {
    show: PropTypes.bool.isRequired,
    hideFunction: PropTypes.func.isRequired,
    removeFunction: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
};