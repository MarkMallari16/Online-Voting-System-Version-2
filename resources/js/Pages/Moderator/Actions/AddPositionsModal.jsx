import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const AddPositionsModal = ({ openModal, setOpenModal, handleConfirm, handleCloseModal }) => {
  

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogHeader>Add Position</DialogHeader>
      <DialogBody>
        {/* Your content goes here */}
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleCloseModal} color="red">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="blue">
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddPositionsModal;
