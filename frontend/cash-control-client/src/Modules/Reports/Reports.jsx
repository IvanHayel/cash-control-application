import {Box, Container, Typography}                          from "@mui/material";
import {
  observer
}                                                            from "mobx-react-lite";
import React, {useEffect}                                    from "react";
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {useStore}                                            from "../../Hooks";
import {
  getUserExpenses,
  getUserWallets
}                                                            from "../../Services";
import "./Styles/Reports.scss";

export const Reports = observer(() => {
  const walletStore = useStore("walletStore");
  const expenseStore = useStore("expenseStore");
  const wallets = walletStore.getWallets();
  const expensesReport = expenseStore.getExpensesReport();
  useEffect(() => {
    const fetchData = async () => {
      await getUserWallets();
      await getUserExpenses();
    };
    fetchData().catch(console.error);
  }, [expenseStore]);
  return (
      <Container className="reports-container">
        <Typography variant="h3" className="reports-title-expenses">
          EXPENSES
        </Typography>
        <Box className="expenses-report">
          <BarChart width={700} height={250} data={expensesReport}>
            <CartesianGrid />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            {wallets.map((wallet) => {
              return (
                  <Bar
                      key={wallet.id}
                      name={`Amount from ${wallet.name}`}
                      dataKey={wallet.id}
                      fill="lightcoral"
                      opacity={0.6}
                  />
              );
            })}
          </BarChart>
        </Box>
      </Container>
  );
});
