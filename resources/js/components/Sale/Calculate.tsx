import React, { useState } from "react";
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
import { ServiceType } from "../../api/orderHistory";

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

const createData = (
  id: number,
  brandName: string,
  serviceType: number,
  orderNumber: number,
  total: number
) => {
  return { id, brandName, serviceType, orderNumber, total };
};

const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24),
  createData(2, "Ice cream sandwich", 237, 9.0, 37),
];

const createData2 = (
  id: number,
  status: string,
  orderedAt: string,
  orderNumber: string,
  total: number,
  brandName: string
) => {
  return { id, status, orderedAt, orderNumber, total, brandName };
};

const rows2 = [
  createData2(1, "完了", "01/06(木) 00:19", "2D04B", 2115, "オルバーガー京都"),
];

export default function SaleCalculate() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [serviceType, setServiceType] = useState<ServiceType | "全て">("全て");

  const classes = useStyles();

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
                onChange={(event) => {
                  setStartDate(new Date(event.target.value));
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={formatDate(startDate)}
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
                value={serviceType}
                onChange={(event) => {
                  setServiceType(event.target.value as ServiceType);
                }}>
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
              2
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
              3845
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container alignItems="center">
              ※ 自社配達の場合、配送手数料を含みます
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "24px" }}>
        <Grid container>
          <Grid item xs={10}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead style={{ backgroundColor: "#3f51b5" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>店舗名</TableCell>
                    <TableCell style={{ color: "white" }}>サービス名</TableCell>
                    <TableCell style={{ color: "white" }}>注文数</TableCell>
                    <TableCell style={{ color: "white" }}>売上金額</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.brandName}
                      </TableCell>
                      <TableCell>{row.serviceType}</TableCell>
                      <TableCell>{row.orderNumber}</TableCell>
                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
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
              {rows2.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.status}
                  </TableCell>
                  <TableCell>{row.orderedAt}</TableCell>
                  <TableCell>{row.orderNumber}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.brandName}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary">
                      詳細確認
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
