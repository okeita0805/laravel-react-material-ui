import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  createStyles,
  Dialog,
  Divider,
  Grid,
  IconButton,
  styled,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import {
  getInitialOrderHistoryDetail,
  getOrderHistories,
  getOrderHistoryById,
  OrderHistories,
  OrderHistory,
  OrderHistoryDetail,
} from "../../api/orderHistory";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const BoldTableCell = styled(TableCell)(() => ({
  fontWeight: "bold",
}));

const DetailTitle = styled("span")(() => ({
  fontWeight: "bold",
  float: "right",
}));

const DetailTitleBody = styled("span")(() => ({
  marginLeft: "8px",
}));

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

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
  const handleClose = () => {
    setOpen(false);
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
      <Dialog
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          注文番号: {orderHistory.orderNumber}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container style={{ marginBottom: "12px", fontSize: "16px" }}>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>提供方法:</DetailTitle>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitleBody>
                    {orderHistory.expeditionType}
                  </DetailTitleBody>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>サービス名:</DetailTitle>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitleBody>{orderHistory.serviceType}</DetailTitleBody>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>氏名:</DetailTitle>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitleBody>{orderHistory.name}</DetailTitleBody>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>お届け先住所:</DetailTitle>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitleBody>{orderHistory.address}</DetailTitleBody>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>電話番号:</DetailTitle>
                </Grid>
                <Grid item xs={6}>
                  <DetailTitleBody>{orderHistory.phone}</DetailTitleBody>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>支払い方式:</DetailTitle>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitleBody>
                    {orderHistory.paymentMethod}
                  </DetailTitleBody>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>注文日時:</DetailTitle>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitleBody> {orderHistory.orderedAt}</DetailTitleBody>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>お渡し・お届け時間:</DetailTitle>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitleBody>{orderHistory.deliveredAt}</DetailTitleBody>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "12px" }}>
                  <DetailTitle>使い捨て容器:</DetailTitle>
                </Grid>
                <Grid item xs={6}>
                  <DetailTitleBody>
                    {orderHistory.isDisposable ? "使用する" : "使用しない"}
                  </DetailTitleBody>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          注文一覧
          <Divider />
          <Divider />
          <Grid container>
            <Grid item xs={6}>
              注文に関するご要望:
            </Grid>
            <Grid item xs={6}>
              <Grid item>小計 (内税)</Grid>
              <Grid item>注文割引額</Grid>
              <Grid item>合計支払額</Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
