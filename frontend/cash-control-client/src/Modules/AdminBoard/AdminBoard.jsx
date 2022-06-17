import './Styles/AdminBoard.scss';
import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbar}      from '@mui/x-data-grid';
import {Box, Button, Typography}    from '@mui/material';
import {observer}                   from 'mobx-react-lite';
import {deleteUser, getAllUsers}    from '../../Services';
import {useStore}                   from '../../Hooks';

export const AdminBoard = observer(() => {
      const [pageSize, setPageSize] = useState(5);
      const userStore = useStore('userStore');

      const rows = userStore.getUsers();
      const columns = [
        {field: 'id', headerName: 'ID', type: 'number', align: 'right', width: 50},
        {field: 'username', headerName: 'Username', width: 150},
        {field: 'email', headerName: 'Email', width: 250},
        {field: 'roles', headerName: 'Roles', width: 200},
        {
          field: 'actions',
          headerName: 'Actions',
          width: 300,
          renderCell: (data) => {
            const handleDelete = (row, event) => {
              event.stopPropagation();
              deleteUser(row.id);
              console.log('DELETE', row);
            };
            return (
                <Button
                    variant="outlined"
                    color="error"
                    disabled={
                        data.row.roles.includes('ROOT') ||
                        data.row.roles.includes('ADMIN')
                    }
                    onClick={event => handleDelete(data.row, event)}
                >
                  Delete
                </Button>
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
              ADMIN BOARD
            </Typography>
            <DataGrid
                className={'board-grid'}
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                scrollbarSize={20}
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
    })
;
;
;