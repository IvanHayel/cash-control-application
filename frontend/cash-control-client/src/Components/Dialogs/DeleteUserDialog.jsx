import './Styles/Dialog.scss';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
}                        from '@mui/material';
import {deleteUser}      from '../../Services';
import {observer}        from 'mobx-react-lite';

export const DeleteUserDialog = observer((props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {data} = props;
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmDelete = async () => {
    await deleteUser(data.id);
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <Button
            className="dialog-action-button"
            variant="outlined"
            size="small"
            color="error"
            onClick={handleDeleteClick}
            disabled={
                data.roles.includes('ADMIN') ||
                data.roles.includes('ROOT')
            }
        >
          Delete
        </Button>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="darkred">
            Are you sure you want to delete this user?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action permanently deletes the user from the database.<br />
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
                className="dialog-action-button"
                onClick={handleDialogClose}
                autoFocus
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
