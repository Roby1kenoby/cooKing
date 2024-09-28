import { Toast, ToastContainer } from "react-bootstrap";

function CustomToast({showToast, toastMessage, toastVariant}) {
    
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={showToast} onClose={() => showToast=!showToast} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{toastVariant === 'success' ? 'Successo' : 'Errore'}</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default CustomToast;