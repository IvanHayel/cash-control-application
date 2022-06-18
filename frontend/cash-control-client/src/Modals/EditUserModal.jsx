import './Styles/Modal.scss';
import React, {useState}      from 'react';
import * as Yup               from 'yup';
import {observer}             from 'mobx-react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
}                             from '@mui/material';
import {Form, Formik}         from 'formik';
import {AccountCircle}        from '@mui/icons-material';
import EditIcon               from '@mui/icons-material/Edit';
import EmailIcon              from '@mui/icons-material/Email';
import {Copyright}            from '../Components';
import {ROLE, ROLE_ALIAS}     from '../Constants';
import {editUser, parseRoles} from '../Services';

const validationSchema = Yup.object({
  username: Yup
      .string('Edit username')
      .min(3, 'Username must be at least 3 characters!')
      .required('Username is required!'),
  email: Yup
      .string('Edit email')
      .email('Invalid email!')
      .required('Email is required!'),
  roles: Yup
      .array('Edit roles')
      .of(Yup.string())
      .required('Exactly one role is required!'),
});

export const EditUserModal = observer((props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    username: '',
    email: '',
    roles: [],
  });
  const handleModalOpen = (event) => {
    event.stopPropagation();
    setInitialValues({
      username: props.data.username,
      email: props.data.email,
      roles: parseRoles(props.data.roles),
    });
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);
  const handleConfirm = async (values) => {
    editUser(props.data.id, values);
    handleModalClose();
  };
  return (
      <Box className="edit-modal">
        <Button
            className="action-button"
            onClick={(event) => handleModalOpen(event)}
            size="small"
            variant="outlined"
            color="warning"
            disabled={
                props.data.roles.includes('ADMIN') ||
                props.data.roles.includes('ROOT')
            }
        >
          EDIT
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
              EDIT USER
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
                        type="username" name="username" label="Username"
                        variant="outlined"
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
                        variant="outlined"
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
                    <FormControl className="input-text-field">
                      <InputLabel id="roles-label">Roles</InputLabel>
                      <Select
                          labelId="roles-label"
                          multiple
                          value={values.roles}
                          onChange={handleChange('roles')}
                          input={<OutlinedInput label="Chip" />}
                          renderValue={(selected) => (
                              <Box className="chip-value">
                                {
                                  selected.map((value) => (
                                      <Chip key={value} label={value} />
                                  ))
                                }
                              </Box>
                          )}
                      >
                        <MenuItem key={ROLE.USER} value="user">
                          {ROLE_ALIAS.USER}
                        </MenuItem>
                        <MenuItem key={ROLE.MODERATOR} value="moderator">
                          {ROLE_ALIAS.MODERATOR}
                        </MenuItem>
                        <MenuItem key={ROLE.ADMIN} value="admin">
                          {ROLE_ALIAS.ADMIN}
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {
                        errors.roles &&
                        touched.roles &&
                        <Typography
                            variant="caption"
                            className="error-message"
                        >
                          {errors.roles.toString()}
                        </Typography>
                    }
                    <Button
                        type="submit" variant="outlined"
                        endIcon={<EditIcon />}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="confirm-button"
                    >
                      CONFIRM
                    </Button>
                  </Form>
              )}
            </Formik>
            <Copyright />
          </Box>
        </Modal>
      </Box>
  );
});