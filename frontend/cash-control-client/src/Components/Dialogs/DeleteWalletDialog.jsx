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
import {observer}              from 'mobx-react-lite';
import React, {useState}       from 'react';
import {deleteWallet}          from '../../Services';
import './Styles/Dialog.scss';

export const DeleteWalletDialog = observer((props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleDeleteClick = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmDelete = async () => {
    await deleteWallet(props.id);
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className="dialog-action-button remove-button"
            color="error"
            size="large"
            onClick={handleDeleteClick}
        >
          <RemoveCircleOutlineIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="darkred">
            Are you sure you want to delete this wallet?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action permanently deletes wallet from the database.<br />
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
                className="dialog-action-button"
                onClick={handleDialogClose}
                autoFocus={true}
                variant="outlined"
            >
              Cancel
            </Button>
            <Button
                className="dialog-action-button"
                onClick={handleConfirmDelete}
                color="error"
                variant="outlined"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
});
