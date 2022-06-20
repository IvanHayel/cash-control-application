import './Styles/AdminBoard.scss';
import React, {useEffect, useState}      from 'react';
import {DataGrid, GridToolbar}           from '@mui/x-data-grid';
import SecurityIcon                      from '@mui/icons-material/Security';
import {Box, Typography}                 from '@mui/material';
import {observer}                        from 'mobx-react-lite';
import {getAllUsers}                     from '../../Services';
import {useStore}                        from '../../Hooks';
import {DeleteUserDialog, EditUserModal} from '../../Components';

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
        return (
            <Box className="action-buttons">
              <EditUserModal data={data.row} />
              <DeleteUserDialog data={data.row} />
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