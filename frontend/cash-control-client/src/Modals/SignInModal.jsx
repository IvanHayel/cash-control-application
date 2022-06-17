import './Styles/AuthenticationModal.scss';
import React, {useState} from 'react';
import {useNavigate}     from 'react-router-dom';
import {observer}        from 'mobx-react-lite';
import {Form, Formik}    from 'formik';
import * as Yup          from 'yup';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
}                        from '@mui/material';
import LoginIcon         from '@mui/icons-material/Login';
import KeyIcon           from '@mui/icons-material/Key';
import {AccountCircle}   from '@mui/icons-material';
import {signIn}          from '../Services';
import {PROFILE}         from '../Constants';
import {Copyright}       from '../Components';

const validationSchema = Yup.object({
  username: Yup
      .string('Enter your username')
      .min(3, 'Username must be at least 3 characters!')
      .required('Username is required!'),
  password: Yup
      .string('Enter your password')
      .min(6, 'Password must be at least 6 characters!')
      .required('Password is required!'),
});

export const SignInModal = observer(() => {
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleLogin = async (values) => {
    await signIn(values);
    handleModalClose();
    navigate(PROFILE);
  };
  return (
      <>
        <IconButton
            onClick={handleModalOpen}
            size="medium"
            color="inherit"
        >
          <LoginIcon fontSize="large" />
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
              SIGN IN
            </Typography>
            <Formik
                initialValues={{username: '', password: ''}}
                onSubmit={handleLogin} validationSchema={validationSchema}
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
                    <Button
                        type="submit" variant="outlined" endIcon={<LoginIcon />}
                        disabled={isSubmitting} onClick={handleSubmit}
                        className="sign-button"
                    >
                      SIGN IN
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