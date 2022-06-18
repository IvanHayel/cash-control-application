import './Styles/Modal.scss';
import React, {useState} from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
}                        from '@mui/material';
import {Form, Formik}    from 'formik';
import * as Yup          from 'yup';
import {AccountCircle}   from '@mui/icons-material';
import KeyIcon           from '@mui/icons-material/Key';
import HowToRegIcon      from '@mui/icons-material/HowToReg';
import EmailIcon         from '@mui/icons-material/Email';
import CheckIcon         from '@mui/icons-material/Check';
import {Copyright}       from '../Components';
import {signUp}          from '../Services';
import {observer}        from 'mobx-react';

const validationSchema = Yup.object({
  username: Yup
      .string('Enter your username')
      .min(3, 'Username must be at least 3 characters!')
      .required('Username is required!'),
  email: Yup
      .string('Enter your email')
      .email('Invalid email!')
      .required('Email is required!'),
  password: Yup
      .string('Enter your password')
      .min(6, 'Password must be at least 6 characters!')
      .required('Password is required!'),
  confirmPassword: Yup
      .string('Confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match!')
      .required('Password confirmation required!'),
});

export const SignUpModal = observer(() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleLogin = async (values) => {
    await signUp(values);
    handleModalClose();
  };
  return (
      <>
        <IconButton
            onClick={handleModalOpen}
            size="medium"
            color="inherit"
        >
          <HowToRegIcon fontSize="large" />
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
              SIGN UP
            </Typography>
            <Formik
                initialValues={{
                  username: '',
                  password: '',
                  email: '',
                  confirmPassword: '',
                }}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
            >
              {({
                  values, errors,
                  touched, handleChange,
                  handleBlur, handleSubmit, isSubmitting,
                }) => (
                  <Form className="modal-form">
                    <TextField
                        type="username" name="username" label="Username"
                        variant="outlined" required={true}
                        onChange={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username} className="input-text-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {
                        errors.username &&
                        touched.username &&
                        <Typography
                            variant="caption"
                            className="error-message"
                        >
                          {errors.username.toString()}
                        </Typography>
                    }
                    <TextField
                        type="email" name="email" label="Email"
                        variant="outlined" required={true}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email} className="input-text-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {
                        errors.email &&
                        touched.email &&
                        <Typography
                            variant="caption"
                            className="error-message"
                        >
                          {errors.email.toString()}
                        </Typography>
                    }
                    <TextField
                        type="password" name="password" label="Password"
                        variant="outlined" required={true}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password} className="input-text-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <KeyIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {
                        errors.password &&
                        touched.password &&
                        <Typography
                            variant="caption"
                            className="error-message"
                        >
                          {errors.password.toString()}
                        </Typography>
                    }
                    <TextField
                        type="password" name="confirmPassword"
                        label="Confirm password"
                        variant="outlined" required={true}
                        onChange={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        className="input-text-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <CheckIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        <Typography
                            variant="caption"
                            className="error-message"
                        >
                          {errors.confirmPassword.toString()}
                        </Typography>
                    }
                    <Button
                        type="submit" variant="outlined"
                        endIcon={<HowToRegIcon />}
                        disabled={isSubmitting} onClick={handleSubmit}
                        className="confirm-button"
                    >
                      SIGN UP
                    </Button>
                  </Form>
              )}
            </Formik>
            <Copyright />
          </Box>
        </Modal>
      </>
  );
});