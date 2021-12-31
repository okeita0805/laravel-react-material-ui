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
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          注文番号: {orderHistory.orderNumber}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
