import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CompareArrowsIcon        from '@mui/icons-material/CompareArrows';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
}                               from '@mui/material';
import {AdapterDateFns}         from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker}         from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider}   from '@mui/x-date-pickers/LocalizationProvider';
import {Form, Formik}           from 'formik';
import {observer}               from 'mobx-react';
import React, {useState}        from 'react';
import * as Yup                 from 'yup';
import {DATE_TIME_INPUT_FORMAT} from '../../Constants';
import {useStore}               from '../../Hooks';
import {createTransfer}         from '../../Services';
import './Styles/Modal.scss';

const validationSchema = Yup.object({
  amount: Yup
      .number('Enter transfer amount')
      .min(0.01, 'Value must be greater or equal to 0.01!')
      .required('Amount is required!'),
  timestamp: Yup
      .date('Enter transfer timestamp')
      .required('Timestamp is required!'),
  wallet: Yup
      .string('Select wallet')
      .required('Wallet is required!'),
  target: Yup
      .string('Select target wallet')
      .notOneOf([Yup.ref('wallet'), null], 'Please select different wallets!')
      .required('Target wallet is required!'),
});

export const CreateTransferModal = observer(() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const walletStore = useStore('walletStore');
  const wallets = walletStore.getWallets();
  const initialValues = {
    amount: 0.00,
    timestamp: new Date(),
    wallet: '',
    target: '',
  };
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleCreate = async (values) => {
    values.timestamp = new Date(values.timestamp).toISOString();
    await createTransfer(values);
    handleModalClose();
  };
  return (
      <>
        <Button
            className="create-transfer-button"
            variant="outlined"
            onClick={handleModalOpen}
        >
          <CompareArrowsIcon fontSize="large" />
        </Button>
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
              NEW TRANSFER
            </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={handleCreate}
                validationSchema={validationSchema}
            >
              {({
                  values, errors,
                  touched, handleChange,
                  handleBlur, handleSubmit, isSubmitting,
                }) => (
                  <Form className="modal-form">
                    <TextField
                        type="number" name="amount" label="Transfer value"
                        variant="outlined" required={true}
                        onChange={handleChange('amount')}
                        onBlur={handleBlur('amount')}
                        value={values.amount} className="modal-input-field"
                        inputProps={{step: 0.01, min: 0}}
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <AccountBalanceWalletIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {
                        errors.amount &&
                        touched.amount &&
                        <Typography
                            variant="caption"
                            className="modal-error-message"
                        >
                          {errors.amount.toString()}
                        </Typography>
                    }
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                    >
                      <DateTimePicker
                          value={values.timestamp}
                          onBlur={handleBlur('timestamp')}
                          inputFormat={DATE_TIME_INPUT_FORMAT}
                          onChange={(date) =>
                              date &&
                              handleChange('timestamp')(date.toString())
                          }
                          renderInput={(params) =>
                              <TextField
                                  className="modal-input-field"
                                  name="timestamp" label="Timestamp"
                                  {...params}
                              />}
                      />
                    </LocalizationProvider>
                    {
                        errors.timestamp &&
                        touched.timestamp &&
                        <Typography
                            variant="caption"
                            className="modal-error-message"
                        >
                          {errors.timestamp.toString()}
                        </Typography>
                    }
                    <FormControl className="modal-input-field">
                      <InputLabel id="wallet-label">Wallet</InputLabel>
                      <Select
                          labelId="wallet-label"
                          label="Wallet"
                          required={true}
                          value={values.wallet}
                          onBlur={handleBlur('wallet')}
                          onChange={handleChange('wallet')}
                      >
                        {
                          wallets.map((userWallet) => (
                              <MenuItem
                                  key={userWallet.id}
                                  value={userWallet.id}
                              >
                                {userWallet.name}
                              </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                    {
                        errors.wallet &&
                        touched.wallet &&
                        <Typography
                            variant="caption"
                            className="modal-error-message"
                        >
                          {errors.wallet.toString()}
                        </Typography>
                    }
                    <FormControl className="modal-input-field">
                      <InputLabel id="target-label">Target</InputLabel>
                      <Select
                          labelId="target-label"
                          label="Wallet"
                          required={true}
                          value={values.target}
                          onBlur={handleBlur('target')}
                          onChange={handleChange('target')}
                      >
                        {
                          wallets.map((userWallet) => (
                              <MenuItem
                                  key={userWallet.id}
                                  value={userWallet.id}
                              >
                                {userWallet.name}
                              </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                    {
                        errors.target &&
                        touched.target &&
                        <Typography
                            variant="caption"
                            className="modal-error-message"
                        >
                          {errors.target.toString()}
                        </Typography>
                    }
                    <Button
                        type="submit" variant="outlined"
                        endIcon={<CompareArrowsIcon />}
                        disabled={isSubmitting} onClick={handleSubmit}
                        className="modal-confirm-button"
                    >
                      CREATE
                    </Button>
                  </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </>
  );
});
