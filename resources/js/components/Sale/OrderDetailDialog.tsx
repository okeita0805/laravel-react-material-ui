import {
  createStyles,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  styled,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Detail,
  getInitialOrderHistoryDetail,
  OrderHistoryDetail,
} from "../../api/orderHistory";
import { ConvertToStrng } from "../../utils/price";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

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

const DetailTitle = styled("span")(() => ({
  fontWeight: "bold",
  float: "right",
}));

const DetailTitleBody = styled("span")(() => ({
  marginLeft: "8px",
}));

interface Props {
  orderHistory: OrderHistoryDetail;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export const OrderDetailDialog: FC<Props> = ({
  orderHistory,
  setOpen,
  open,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        ????????????: {orderHistory.orderNumber}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container style={{ marginBottom: "12px", fontSize: "16px" }}>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>????????????:</DetailTitle>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitleBody>{orderHistory.expeditionType}</DetailTitleBody>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>???????????????:</DetailTitle>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitleBody>{orderHistory.serviceType}</DetailTitleBody>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>??????:</DetailTitle>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitleBody>{orderHistory.name}</DetailTitleBody>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>??????????????????:</DetailTitle>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitleBody>{orderHistory.address}</DetailTitleBody>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>????????????:</DetailTitle>
              </Grid>
              <Grid item xs={6}>
                <DetailTitleBody>{orderHistory.phone}</DetailTitleBody>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>???????????????:</DetailTitle>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitleBody>{orderHistory.paymentMethod}</DetailTitleBody>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>????????????:</DetailTitle>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitleBody> {orderHistory.orderedAt}</DetailTitleBody>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>???????????????????????????:</DetailTitle>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitleBody>{orderHistory.deliveredAt}</DetailTitleBody>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: "12px" }}>
                <DetailTitle>??????????????????:</DetailTitle>
              </Grid>
              <Grid item xs={6}>
                <DetailTitleBody>
                  {orderHistory.isDisposable ? "????????????" : "???????????????"}
                </DetailTitleBody>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="h6">????????????</Typography>
        <Divider style={{ margin: "12px 0" }} />
        {orderHistory.details.map((detail: Detail) => {
          return (
            <div key={detail.id}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    {detail.name} x {detail.quantity}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    fontSize: "22px",
                  }}>
                  {ConvertToStrng(detail.price)}
                </Grid>
                {detail.modifiers.map(
                  (modifier: {
                    id: number;
                    name: string;
                    price: number;
                    quantity: number;
                  }) => {
                    return (
                      <Grid
                        container
                        key={modifier.id}
                        style={{ marginTop: "12px" }}>
                        <Grid item xs={6}>
                          <Typography variant="h6">
                            + {modifier.name} x {modifier.quantity}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row-reverse",
                          }}>
                          {ConvertToStrng(modifier.price)}
                        </Grid>
                      </Grid>
                    );
                  }
                )}
              </Grid>
              <Divider style={{ margin: "12px 0" }} />
            </div>
          );
        })}
        <Grid container>
          <Grid item xs={6}>
            <Grid item>???????????????????????????:</Grid>
            <Grid item style={{ marginTop: "12px" }}>
              {orderHistory.comment}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <Grid container>
                <Grid
                  item
                  xs={9}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}>
                  ?????? (??????)
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}>
                  {ConvertToStrng(orderHistory.total)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: "8px" }}>
              <Grid container>
                <Grid
                  item
                  xs={9}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}>
                  ???????????????
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}>
                  {ConvertToStrng(orderHistory.total)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: "8px" }}>
              <Grid container>
                <Grid
                  item
                  xs={9}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}>
                  ??????????????????
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}>
                  {ConvertToStrng(orderHistory.fee)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
