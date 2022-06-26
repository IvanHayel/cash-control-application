import {Box, Container, Typography} from '@mui/material';
import {
  DataGrid,
  GridToolbar,
}                                   from '@mui/x-data-grid';
import {
  observer,
}                                   from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  CreateExpenseModal,
  DeleteDialog,
  EditExpenseModal,
}                                   from '../../Components';
import {useStore}                   from '../../Hooks';
import {
  deleteExpense,
  getUserExpenses,
  getUserWallets,
}                                   from '../../Services';
import './Styles/Expenses.scss';

export const Expenses = observer(() => {
  const [pageSize, setPageSize] = useState(5);
  const expenseStore = useStore('expenseStore');
  const walletStore = useStore('walletStore');
  const rows = expenseStore.getExpenses().map((expense) => {
    const wallet = walletStore.getWalletById(expense.walletTransportId);
    return {
      ...expense,
      timestampFormatted: new Date(expense.timestamp).toLocaleString(),
      currency: wallet.currency,
      wallet: wallet.name,
    };
  });
  const columns = [
    {field: 'id', headerName: 'ID', type: 'number', align: 'right', width: 50},
    {field: 'amount', headerName: 'Amount', type: 'number', flex: 1},
    {field: 'currency', headerName: 'Currency', type: 'string', flex: 1},
    {
      field: 'timestampFormatted',
      headerName: 'Timestamp',
      type: 'date',
      flex: 2,
    },
    {field: 'type', headerName: 'Type', type: 'string', flex: 1},
    {field: 'wallet', headerName: 'Wallet', type: 'string', flex: 1},
    {
      field: 'action', headerName: 'Action', flex: 1, renderCell: (data) => {
        return (
            <Box className="expense-actions">
              <EditExpenseModal data={data.row} />
              <DeleteDialog
                  itemToDelete="expense"
                  onConfirmDelete={() => deleteExpense(data.row.id)}
              />
            </Box>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      await getUserWallets();
      await getUserExpenses();
    };
    fetchData().catch(console.error);
  }, []);
  return (
      <Container className="expenses-box">
        <Typography
            className="expenses-title"
            variant="h4"
        >
          EXPENSES
        </Typography>
        <CreateExpenseModal />
        <DataGrid
            className="expense-grid"
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
      </Container>
  );
});