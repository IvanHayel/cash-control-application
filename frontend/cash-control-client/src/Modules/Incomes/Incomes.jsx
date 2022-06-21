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
  CreateIncomeModal,
  DeleteIncomeDialog,
  EditIncomeModal,
}                                   from '../../Components';
import {
  useStore,
}                                   from '../../Hooks';
import {
  getUserIncomes,
  getUserWallets,
}                                   from '../../Services';
import './Styles/Incomes.scss';

export const Incomes = observer(() => {
  const [pageSize, setPageSize] = useState(5);
  const incomeStore = useStore('incomeStore');
  const walletStore = useStore('walletStore');
  const rows = incomeStore.getIncomes().map((income) => {
    const wallet = walletStore.getWalletById(income.walletTransportId);
    return {
      ...income,
      timestampFormatted: new Date(income.timestamp).toLocaleString(),
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
    {field: 'wallet', headerName: 'Wallet', type: 'string', flex: 1},
    {
      field: 'action', headerName: 'Action', flex: 1, renderCell: (data) => {
        return (
            <Box className="income-actions">
              <EditIncomeModal data={data.row} />
              <DeleteIncomeDialog data={data.row} />
            </Box>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      await getUserWallets();
      await getUserIncomes();
    };
    fetchData().catch(console.error);
  }, []);
  return (
      <Container className="incomes-box">
        <Typography
            className="incomes-title"
            variant="h4"
        >
          INCOMES
        </Typography>
        <CreateIncomeModal />
        <DataGrid
            className="incomes-grid"
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