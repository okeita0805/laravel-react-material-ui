import React, { useMemo, useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import {
  getInitialOrderHistoryDetail,
  getOrderHistoryById,
  OrderHistoryDetail,
  ServiceType,
} from "../../api/orderHistory";
import {
  getOrderHistory,
  OrderEachReport,
  OrderReport,
  OrderSummary,
} from "../../api/orderReport";
import { OrderDetailDialog } from "./OrderDetailDialog";

const formatDate = (date: Date | null): string => {
  if (date === null) {
    return "";
  }
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SaleCalculate() {
  const [search, setSearch] = useState<{
    startDate: Date;
    serviceType: ServiceType | "全て";
  }>({
    startDate: new Date(),
    serviceType: "全て",
  });

  const [summary, setSummary] = useState<OrderSummary[]>([]);

  const [orderEachReports, setOrderEachReports] = useState<OrderEachReport[]>(
    []
  );

  const [open, setOpen] = React.useState(false);

  const [orderHistory, setOrderHistory] = React.useState(
    getInitialOrderHistoryDetail()
  );

  const handleClickOpen = (id: number) => {
    getOrderHistoryById(id).then((orderHistoryDetail: OrderHistoryDetail) => {
      setOrderHistory(orderHistoryDetail);
      setOpen(true);
    });
  };

  const quantity: number | "-" = useMemo(() => {
    const values = summary.map((value: OrderSummary) => {
      return value.orderQuantity;
    });
    if (values.length === 0) {
      return "-";
    }
    return values.reduce(
      (previousValue: number, currentValue: number) =>
        previousValue + currentValue
    );
  }, [summary]);

  const total: number | "-" = useMemo(() => {
    const values = summary.map((value: OrderSummary) => {
      return value.total;
    });
    if (values.length === 0) {
      return "-";
    }
    return values.reduce(
      (previousValue: number, currentValue: number) =>
        previousValue + currentValue
    );
  }, [summary]);

  const classes = useStyles();

  const handlerChangeDateSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch({
      ...search,
      startDate: new Date(event.target.value),
    });
    getOrderHistory(event.target.value, search.serviceType).then(
      (orderReport: OrderReport) => {
        setSummary(orderReport.summary);
        setOrderEachReports(orderReport.eachReport);
      }
    );
  };

  const handlerChangeServiceSearch = (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => {
    const date =
      search.startDate.getFullYear() +
      "-" +
      (search.startDate.getMonth() + 1) +
      "-" +
      search.startDate.getDate();

    const serviceType = event.target.value as ServiceType;
    setSearch({
      ...search,
      serviceType,
    });
    getOrderHistory(date, serviceType).then((orderReport: OrderReport) => {
      setSummary(orderReport.summary);
      setOrderEachReports(orderReport.eachReport);
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              style={{ height: "100%", paddingRight: "24px" }}>
              日付を選択
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container alignItems="center">
              <TextField
                type="date"
                onChange={handlerChangeDateSearch}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={formatDate(search.startDate)}
              />
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container alignItems="center">
              ※ 当日AM6時〜翌日AM6時までの集計になります
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              style={{ height: "100%", paddingRight: "24px" }}>
              サービスを選択
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container alignItems="center">
              <Select
                style={{ width: "155px" }}
                value={search.serviceType}
                onChange={handlerChangeServiceSearch}>
                <MenuItem value="全て">全て</MenuItem>
                <MenuItem value="UberEats">UberEats</MenuItem>
                <MenuItem value="Foodpanda">Foodpanda</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              style={{ height: "100%", paddingRight: "24px" }}>
              注文数
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container alignItems="center">
              {quantity}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              style={{ height: "100%", paddingRight: "24px" }}>
              売上金額
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container alignItems="center">
              {total}
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container alignItems="center">
              ※ 自社配達の場合、配送手数料を含みます
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {summary.length !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "24px" }}>
          <Grid container>
            <Grid item xs={10}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#3f51b5" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }}>店舗名</TableCell>
                      <TableCell style={{ color: "white" }}>
                        サービス名
                      </TableCell>
                      <TableCell style={{ color: "white" }}>注文数</TableCell>
                      <TableCell style={{ color: "white" }}>売上金額</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {summary.map((row: OrderSummary) => (
                      <TableRow key={row.brandName}>
                        <TableCell component="th" scope="row">
                          {row.brandName}
                        </TableCell>
                        <TableCell>{row.serviceType}</TableCell>
                        <TableCell>{row.orderQuantity}</TableCell>
                        <TableCell>{row.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {orderEachReports.length !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "24px" }}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ステータス</TableCell>
                  <TableCell>注文日時</TableCell>
                  <TableCell>注文番号</TableCell>
                  <TableCell>金額</TableCell>
                  <TableCell>店舗名</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderEachReports.map((row: OrderEachReport) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.status}
                    </TableCell>
                    <TableCell>{row.orderedAt}</TableCell>
                    <TableCell>{row.orderNumber}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.brandName}</TableCell>
                    <TableCell align="right">
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
        </Grid>
      ) : null}
      <OrderDetailDialog
        orderHistory={orderHistory}
        setOpen={setOpen}
        open={open}
      />
    </Grid>
  );
}
