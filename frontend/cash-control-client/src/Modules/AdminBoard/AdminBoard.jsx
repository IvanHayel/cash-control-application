import './Styles/AdminBoard.scss';
import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbar}      from '@mui/x-data-grid';
import SecurityIcon                 from '@mui/icons-material/Security';
import {Box, Button, Typography}    from '@mui/material';
import {observer}                   from 'mobx-react-lite';
import {deleteUser, getAllUsers}    from '../../Services';
import {useStore}                   from '../../Hooks';
import {EditUserModal}              from '../../Modals';

export const AdminBoard = observer(() => {
  const [pageSize, setPageSize] = useState(5);
  const userStore = useStore('userStore');

  const rows = userStore.getUsers();
  const columns = [
    {field: 'id', headerName: 'ID', type: 'number', align: 'right', width: 50},
    {field: 'username', headerName: 'Username', flex: 1},
    {field: 'email', headerName: 'Email', flex: 2},
    {field: 'roles', headerName: 'Roles', flex: 2},
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (data) => {
        const handleDelete = (row, event) => {
          event.stopPropagation();
          deleteUser(row.id);
        };
        return (
            <Box className="action-buttons">
              <Button
                  className="action-button"
                  variant="outlined"
                  size="small"
                  color="error"
                  disabled={
                      data.row.roles.includes('ROOT') ||
                      data.row.roles.includes('ADMIN')
                  }
                  onClick={event => handleDelete(data.row, event)}
              >
                Delete
              </Button>
              <EditUserModal data={data.row} />
            </Box>
        );
      },
    },
  ];

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
      <Box className="board">
        <Typography
            className="board-title"
            variant="h4"
        >
          ADMIN BOARD <SecurityIcon size="large" />
        </Typography>
        <DataGrid
            className={'board-grid'}
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            scrollbarSize={20}
            scrollArea
            autoHeight
            onPageSizeChange={(size) => setPageSize(size)}
            rowsPerPageOptions={[1, 5, 10, 15, 30, 50, 100]}
            isRowSelectable={() => false}
            components={{
              Toolbar: GridToolbar,
            }}
        />
      </Box>
  );
});