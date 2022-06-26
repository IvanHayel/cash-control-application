import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
}                              from '@mui/material';
import React, {useState}       from 'react';
import './Styles/Dialog.scss';

export const DeleteDialog = (props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    itemToDelete,
    onConfirmDelete,
    disableButton,
    buttonClassName,
    buttonSize,
  } = props;
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmDelete = async () => {
    await onConfirmDelete();
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton className={`dialog-action-button ${buttonClassName}`}
                    color="error" size={buttonSize ? buttonSize : 'small'}
                    onClick={handleDeleteClick} disabled={disableButton}>
          <RemoveCircleOutlineIcon fontSize="large" />
        </IconButton>
        <Dialog className="dialog" open={isDialogOpen}
                onClose={handleDialogClose}>
          <DialogTitle color="darkred">
            Are you sure you want to delete this {itemToDelete}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action permanently deletes {itemToDelete} from the
              database.<br />
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="dialog-action-button" onClick={handleDialogClose}
                    autoFocus={true} variant="outlined">
              Cancel
            </Button>
            <Button className="dialog-action-button"
                    onClick={handleConfirmDelete} color="error"
                    variant="outlined">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};
