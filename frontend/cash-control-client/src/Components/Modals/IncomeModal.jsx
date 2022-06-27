import AccountBalanceWalletIcon   from "@mui/icons-material/AccountBalanceWallet";
import ArrowUpwardIcon            from "@mui/icons-material/ArrowUpward";
import CheckIcon                  from "@mui/icons-material/Check";
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
}                                 from "@mui/material";
import {AdapterDateFns}           from "@mui/x-date-pickers/AdapterDateFns";
import {DateTimePicker}           from "@mui/x-date-pickers/DateTimePicker";
import {
  LocalizationProvider
}                                 from "@mui/x-date-pickers/LocalizationProvider";
import {Form, Formik}             from "formik";
import {observer}                 from "mobx-react";
import React, {useState}          from "react";
import * as Yup                   from "yup";
import {DATE_TIME_INPUT_FORMAT}   from "../../Constants";
import {useStore}                 from "../../Hooks";
import {createIncome, editIncome} from "../../Services";
import "./Styles/Modal.scss";

const validationSchema = Yup.object({
  amount: Yup.number("Enter income amount")
  .min(0, "Value must be greater than 0!")
  .required("Amount is required!"),
  timestamp: Yup.date("Enter income timestamp").required(
      "Timestamp is required!"
  ),
  wallet: Yup.string("Select wallet").required("Wallet is required!"),
});

export const IncomeModal = observer((props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const wallets = useStore("walletStore").getWallets();
  const {data, action, buttonClassName, buttonSize, buttonIcon} = props;
  const initialValues = {
    amount: data ? data.amount : 0.0,
    timestamp: data ? new Date(data.timestamp) : new Date(),
    wallet: data ? data.walletTransportId : "",
  };
  const handleModalOpen = (event) => {
    event.stopPropagation();
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);
  const handleConfirmAction = async (values) => {
    values.timestamp = new Date(values.timestamp).toISOString();
    switch (action) {
      case "create":
        await createIncome(values);
        break;
      case "edit":
        await editIncome(data.id, values);
        break;
      default:
        break;
    }
    handleModalClose();
  };
  return (
      <>
        <IconButton
            className={buttonClassName}
            size={buttonSize || "small"}
            onClick={handleModalOpen}
            variant="outlined"
        >
          {buttonIcon}
        </IconButton>
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
        >
          <Box className="modal-main-box">
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="center"
                fontWeight="bold"
            >
              {action.toUpperCase()} INCOME
            </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={handleConfirmAction}
                validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                  <Form className="modal-form">
                    <TextField
                        type="number"
                        name="amount"
                        label="Income value"
                        variant="outlined"
                        required={true}
                        onChange={handleChange("amount")}
                        onBlur={handleBlur("amount")}
                        value={values.amount}
                        className="modal-input-field"
                        inputProps={{step: 0.01, min: 0}}
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <AccountBalanceWalletIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {errors.amount && touched.amount && (
                        <Typography variant="caption"
                                    className="modal-error-message">
                          {errors.amount.toString()}
                        </Typography>
                    )}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                          value={values.timestamp}
                          onBlur={handleBlur("timestamp")}
                          inputFormat={DATE_TIME_INPUT_FORMAT}
                          onChange={(date) =>
                              date && handleChange("timestamp")(date.toString())
                          }
                          renderInput={(params) => (
                              <TextField
                                  className="modal-input-field"
                                  name="timestamp"
                                  label="Timestamp"
                                  {...params}
                              />
                          )}
                      />
                    </LocalizationProvider>
                    {errors.timestamp && touched.timestamp && (
                        <Typography variant="caption"
                                    className="modal-error-message">
                          {errors.timestamp.toString()}
                        </Typography>
                    )}
                    <FormControl className="modal-input-field">
                      <InputLabel id="wallet-label">Wallet</InputLabel>
                      <Select
                          labelId="wallet-label"
                          label="Wallet"
                          required={true}
                          value={values.wallet}
                          onBlur={handleBlur("wallet")}
                          onChange={handleChange("wallet")}
                      >
                        {wallets.map((userWallet) => (
                            <MenuItem key={userWallet.id} value={userWallet.id}>
                              {userWallet.name} ({userWallet.currency})
                            </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.wallet && touched.wallet && (
                        <Typography variant="caption"
                                    className="modal-error-message">
                          {errors.wallet.toString()}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="outlined"
                        color="success"
                        endIcon={
                          action === "create" ? (
                              <ArrowUpwardIcon color="success" />
                          ) : (
                              <CheckIcon color="success" />
                          )
                        }
                        disabled={isSubmitting}
                        onClick={handleSubmit}
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
