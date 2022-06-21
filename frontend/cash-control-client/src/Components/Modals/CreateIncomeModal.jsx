import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCircleOutlineOutlinedIcon
                                from '@mui/icons-material/AddCircleOutlineOutlined';
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
import {
  LocalizationProvider,
}                               from '@mui/x-date-pickers/LocalizationProvider';
import {Form, Formik}           from 'formik';
import {observer}               from 'mobx-react';
import React, {useState}        from 'react';
import * as Yup                 from 'yup';
import {DATE_TIME_INPUT_FORMAT} from '../../Constants';
import {useStore}               from '../../Hooks';
import {createIncome}           from '../../Services';
import './Styles/Modal.scss';

const validationSchema = Yup.object({
  amount: Yup
      .number('Enter income amount')
      .min(0, 'Value must be greater than 0!')
      .required('Amount is required!'),
  timestamp: Yup
      .date('Enter income timestamp')
      .required('Timestamp is required!'),
  wallet: Yup
      .string('Select wallet')
      .required('Wallet is required!'),
});

export const CreateIncomeModal = observer(() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const walletStore = useStore('walletStore');
  const wallets = walletStore.getWallets();
  const initialValues = {
    amount: 0.00,
    timestamp: new Date(),
    wallet: '',
  };
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleCreate = async (values) => {
    values.timestamp = new Date(values.timestamp).toISOString();
    console.log('values', values);
    await createIncome(values);
    handleModalClose();
  };
  return (
      <>
        <Button
            className="create-income-button"
            variant="outlined"
            onClick={handleModalOpen}
        >
          <AddCircleOutlineOutlinedIcon fontSize="large" />
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
              NEW INCOME
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
                        type="number" name="amount" label="Income value"
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
                                {userWallet.name} ({userWallet.currency})
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
                        endIcon={<AddCircleOutlineOutlinedIcon />}
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
