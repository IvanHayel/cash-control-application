import AccountBalanceWalletIcon                    from '@mui/icons-material/AccountBalanceWallet';
import RemoveCircleOutlineIcon
                                                   from '@mui/icons-material/RemoveCircleOutline';
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
}                                                  from '@mui/material';
import {
  AdapterDateFns,
}                                                  from '@mui/x-date-pickers/AdapterDateFns';
import {
  DateTimePicker,
}                                                  from '@mui/x-date-pickers/DateTimePicker';
import {
  LocalizationProvider,
}                                                  from '@mui/x-date-pickers/LocalizationProvider';
import {Form, Formik}                              from 'formik';
import {observer}                                  from 'mobx-react';
import React, {useState}                           from 'react';
import * as Yup                                    from 'yup';
import {DATE_TIME_INPUT_FORMAT, EXPENSE_TYPE_LIST} from '../../Constants';
import {useStore}                                  from '../../Hooks';
import {createExpense}                             from '../../Services';
import './Styles/Modal.scss';

const validationSchema = Yup.object({
  amount: Yup
      .number('Enter expense amount')
      .min(0.01, 'Value must be greater or equal to 0.01!')
      .required('Amount is required!'),
  timestamp: Yup
      .date('Enter expense timestamp')
      .required('Timestamp is required!'),
  type: Yup
      .string('Enter expense type')
      .required('Expense type is required!'),
  wallet: Yup
      .string('Select wallet')
      .required('Wallet is required!'),
});

export const CreateExpenseModal = observer(() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const walletStore = useStore('walletStore');
  const wallets = walletStore.getWallets();
  const initialValues = {
    amount: 0.00,
    timestamp: new Date(),
    type: '',
    wallet: '',
  };
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleCreate = async (values) => {
    values.timestamp = new Date(values.timestamp).toISOString();
    await createExpense(values);
    handleModalClose();
  };
  return (
      <>
        <Button
            className="create-expense-button"
            variant="outlined"
            onClick={handleModalOpen}
        >
          <RemoveCircleOutlineIcon fontSize="large" />
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
              NEW EXPENSE
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
                        type="number" name="amount" label="Expense value"
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
                      <InputLabel id="type-label">Type</InputLabel>
                      <Select
                          labelId="type-label"
                          label="Type"
                          required={true}
                          value={values.type}
                          onBlur={handleBlur('type')}
                          onChange={handleChange('type')}
                      >
                        {
                          EXPENSE_TYPE_LIST.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                    {
                        errors.type &&
                        touched.type &&
                        <Typography
                            variant="caption"
                            className="modal-error-message"
                        >
                          {errors.type.toString()}
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
                    <Button
                        type="submit" variant="outlined"
                        endIcon={<RemoveCircleOutlineIcon />}
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
