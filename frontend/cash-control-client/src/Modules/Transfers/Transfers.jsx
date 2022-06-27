import CompareArrowsIcon            from "@mui/icons-material/CompareArrows";
import SettingsIcon                 from "@mui/icons-material/Settings";
import {Box, Container, Typography} from "@mui/material";
import {
  DataGrid,
  GridToolbar
}                                   from "@mui/x-data-grid";
import {
  observer
}                                   from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {
  DeleteDialog,
  TransferModal
}                                   from "../../Components";
import {useStore}                   from "../../Hooks";
import {
  deleteTransfer,
  getUserTransfers,
  getUserWallets,
}                                   from "../../Services";
import "./Styles/Transfers.scss";

export const Transfers = observer(() => {
  const [pageSize, setPageSize] = useState(5);
  const transferStore = useStore("transferStore");
  const walletStore = useStore("walletStore");
  const rows = transferStore.getTransfers().map((transfer) => {
    const wallet = walletStore.getWalletById(transfer.walletTransportId);
    const target = walletStore.getWalletById(transfer.targetTransportId);
    return {
      ...transfer,
      timestampFormatted: new Date(transfer.timestamp).toLocaleString(),
      currency: wallet.currency,
      wallet: wallet.name,
      target: target.name,
    };
  });
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      align: "right",
      width: 50,
    },
    {field: "amount", headerName: "Amount", type: "number", flex: 1},
    {field: "currency", headerName: "Currency", type: "string", flex: 1},
    {
      field: "timestampFormatted",
      headerName: "Timestamp",
      type: "date",
      flex: 2,
    },
    {field: "wallet", headerName: "Wallet", type: "string", flex: 1},
    {field: "target", headerName: "Target", type: "string", flex: 1},
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (data) => {
        return (
            <Box className="transfer-actions">
              <TransferModal
                  data={data.row}
                  action="edit"
                  buttonIcon={<SettingsIcon fontSize="large" />}
              />
              <DeleteDialog
                  itemToDelete="transfer"
                  onConfirmDelete={() => deleteTransfer(data.row.id)}
              />
            </Box>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      await getUserWallets();
      await getUserTransfers();
    };
    fetchData().catch(console.error);
  }, []);
  return (
      <Container className="transfers-box">
        <Typography className="transfers-title" variant="h4">
          TRANSFERS
        </Typography>
        <TransferModal
            action="create"
            buttonClassName="create-transfer-button"
            buttonSize="large"
            buttonIcon={<CompareArrowsIcon fontSize="large" />}
        />
        <DataGrid
            className="transfers-grid"
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
