import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const AddPositionsModal = ({ openModal, setOpenModal }) => {
  

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>Add Position</DialogTitle>
      <DialogContent>
        {/* Your content goes here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="red">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPositionsModal;