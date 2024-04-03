import React from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, InputError } from "@material-tailwind/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const AddPositionsModal = ({ open, onClose, onSubmit, data, errors, handleChange }) => {

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>Add Position</DialogHeader>
      <DialogBody>
        <form onSubmit={handleAddSubmit}>
          <div>
            <InputLabel htmlFor="positionName" value="Enter Position Name" />
            <TextInput
              id="positionName"
              className="mt-1 block w-full"
              name="name"
              value={data.name || ''}
              onChange={handleChange}
              required
              autoFocus
            />
            <InputError>{errors.name}</InputError>
          </div>
          <DialogFooter>
            <Button variant="text" color="red" onClick={onClose} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="blue" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default AddPositionsModal;
