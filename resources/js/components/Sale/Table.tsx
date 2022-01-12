import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, styled } from "@material-ui/core";
import {
  getInitialOrderHistoryDetail,
  getOrderHistories,
  getOrderHistoryById,
  OrderHistories,
  OrderHistory,
  OrderHistoryDetail,
} from "../../api/orderHistory";
import { OrderDetailDialog } from "./OrderDetailDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const BoldTableCell = styled(TableCell)(() => ({
  fontWeight: "bold",
}));

export default function SaleHistoryTable() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [orderHistories, setOrderHistories] = React.useState<OrderHistories>(
    []
  );

  const [orderHistory, setOrderHistory] = React.useState(
    getInitialOrderHistoryDetail()
  );

  const handleClickOpen = (id: number) => {
    getOrderHistoryById(id).then((orderHistoryDetail: OrderHistoryDetail) => {
      setOrderHistory(orderHistoryDetail);
      setOpen(true);
    });
  };

  useEffect(() => {
    getOrderHistories().then((orderHistories: OrderHistories) => {
      setOrderHistories(orderHistories);
    });
  }, [setOrderHistories]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <BoldTableCell>ステータス</BoldTableCell>
              <BoldTableCell>注文日時</BoldTableCell>
              <BoldTableCell>注文番号</BoldTableCell>
              <BoldTableCell>金額</BoldTableCell>
              <BoldTableCell>店舗名</BoldTableCell>
              <BoldTableCell></BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderHistories.map((row: OrderHistory) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.status}
                </TableCell>
                <TableCell>{row.orderedAt}</TableCell>
                <TableCell>{row.orderNumber}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.brandName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleClickOpen(row.id)}
                    variant="contained"
                    color="primary">
                    詳細確認
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderDetailDialog
        orderHistory={orderHistory}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
}
