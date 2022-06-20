import './Styles/Modal.scss';
import React, {useState}        from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
}                               from '@mui/material';
import BadgeOutlinedIcon        from '@mui/icons-material/BadgeOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckIcon                from '@mui/icons-material/Check';
import {observer}               from 'mobx-react';
import {Form, Formik}           from 'formik';
import * as Yup                 from 'yup';
import {CURRENCY}               from '../../Constants';
import {editWallet}             from '../../Services';
import SettingsIcon             from '@mui/icons-material/Settings';

const validationSchema = Yup.object({
  name: Yup
      .string('Enter wallet name')
      .min(3, 'Name must be at least 3 characters!')
      .required('Name is required!'),
  balance: Yup
      .number('Enter wallet balance')
      .required('Balance is required!'),
  currency: Yup
      .string('Enter wallet currency')
      .required('Currency is required!'),
});

export const EditWalletModal = observer((props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {wallet} = props;
  const initialValues = {
    name: wallet.name,
    currency: wallet.currency,
    balance: wallet.balance,
  };
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirm = async (values) => {
    await editWallet(wallet.id, values);
    handleModalClose();
  };
  return (
      <>
        <IconButton
            className="config-button"
            size="large"
            onClick={handleModalOpen}
        >
          <SettingsIcon fontSize="large" />
        </IconButton>
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
        >
          <Box className="modal-main-box">
            <Typography id="modal-modal-title" variant="h6"
                        component="h2" textAlign="center"
                        fontWeight="bold"
            >
              EDIT WALLET
            </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={handleConfirm}
                validationSchema={validationSchema}
            >
              {({
                  values, errors,
                  touched, handleChange,
                  handleBlur, handleSubmit, isSubmitting,
                }) => (
                  <Form className="modal-form">
                    <TextField
                        type="text" name="name" label="Name"
                        variant="outlined" required={true}
                        onChange={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name} className="modal-input-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <BadgeOutlinedIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {
                        errors.name &&
                        touched.name &&
                        <Typography
                            variant="caption"
                            className="modal-error-message"
                        >
                          {errors.name.toString()}
                        </Typography>
                    }
                    <TextField
                        type="number" name="balance" label="Start balance"
                        variant="outlined" required={true}
                        onChange={handleChange('balance')}
                        onBlur={handleBlur('balance')}
                        value={values.balance} className="modal-input-field"
                        inputProps={{step: 0.01}}
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <AccountBalanceWalletIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {
                        errors.balance &&
                        touched.balance &&
                        <Typography
                            variant="caption"
                            className="modal-error-message"
                        >
                          {errors.balance.toString()}
                        </Typography>
                    }
                    <FormControl className="modal-input-field">
                      <InputLabel id="currency-label">Currency</InputLabel>
                      <Select
                          labelId="currency-label"
                          label="Currency"
                          required={true}
                          value={values.currency}
                          onBlur={handleBlur('currency')}
                          onChange={handleChange('currency')}
                      >
                        <MenuItem key={CURRENCY.USD} value={CURRENCY.USD}>
                          {CURRENCY.USD}
                        </MenuItem>
                        <MenuItem key={CURRENCY.EUR} value={CURRENCY.EUR}>
                          {CURRENCY.EUR}
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {
                        errors.currency &&
                        touched.currency &&
                        <Typography
                            variant="caption"
                            className="modal-error-message"
                        >
                          {errors.currency.toString()}
                        </Typography>
                    }
                    <Button
                        type="submit" variant="outlined"
                        endIcon={<CheckIcon />}
                        disabled={isSubmitting} onClick={handleSubmit}
                        className="modal-confirm-button"
                    >
                      CONFIRM
                    </Button>
                  </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </>
  );
});
