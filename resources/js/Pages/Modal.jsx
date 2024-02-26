// Modal.js
import { Dialog } from '@headlessui/react';

const Modal = ({ isOpen, closeModal }) => {
    console.log('Modal isOpen:', isOpen);

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>

                <p>
                    Are you sure you want to deactivate your account? All of your data
                    will be permanently removed. This action cannot be undone.
                </p>

                <button onClick={() => { console.log('Deactivate button clicked'); closeModal(); }}>Deactivate</button>
                <button onClick={() => { console.log('Cancel button clicked'); closeModal(); }}>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    );
};

export default Modal;
