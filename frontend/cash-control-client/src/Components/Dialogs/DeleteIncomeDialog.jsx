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
import {deleteIncome}          from '../../Services';
import './Styles/Dialog.scss';

export const DeleteIncomeDialog = observer((props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {data} = props;
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmDelete = async () => {
    await deleteIncome(data.id);
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className="dialog-action-button remove-button"
            color="error"
            size="small"
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
            Are you sure you want to delete this income?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action permanently deletes income from the database.<br />
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
