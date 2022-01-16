import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Paper, styled } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import CakeIcon from "@material-ui/icons/Cake";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { getOrders, getOrderStops, Order, Orders } from "../api/order";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  background: "none",
  margin: "0 12px",
}));

const ItemOrder = styled(Item)(() => ({
  background: "white",
  marginTop: "12px",
}));

const LeftButton = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: theme.palette.text.secondary,
  boxShadow: "none",
  width: "100%",
  height: "190px",
  cursor: "pointer",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "12px",
}));

const LeftPrimaryButton = styled(LeftButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const NewOrder = (): JSX.Element => (
  <Grid item>
    <Grid item xs={12}>
      <NotificationsNoneIcon style={{ fontSize: "72px" }} />
    </Grid>
    <Grid item xs={12} style={{ fontSize: "22px", marginTop: "8px" }}>
      新規注文
    </Grid>
  </Grid>
);

const CookingOrder = (): JSX.Element => (
  <Grid item>
    <Grid item xs={12}>
      <CakeIcon style={{ fontSize: "72px" }} />
    </Grid>
    <Grid item xs={12} style={{ fontSize: "22px", marginTop: "8px" }}>
      調理中
    </Grid>
  </Grid>
);

const PreparedOrder = (): JSX.Element => (
  <Grid item>
    <Grid item xs={12}>
      <LocalMallIcon style={{ fontSize: "72px" }} />
    </Grid>
    <Grid item xs={12} style={{ fontSize: "22px", marginTop: "8px" }}>
      準備完了
    </Grid>
  </Grid>
);

export default function Top() {
  type Status = "新規注文" | "調理中" | "準備完了";

  const [status, setStatus] = useState<Status>("新規注文");

  const [orders, setOrders] = React.useState<Orders>([]);

  const [isOrderStops, setIsOrderStops] = React.useState<boolean>(false);

  useEffect(() => {
    // ポーリング処理
    const timer = setInterval(() => {
      getOrders().then((orders: Orders) => {
        setOrders(orders);
      });
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    getOrderStops().then((res) => {
      setIsOrderStops(res.isOrderStops);
    });
  }, [setIsOrderStops]);

  const NewOrders = (): Orders =>
    orders.filter((order: Order) => order.status === "新規注文");

  const CookingOrders = (): Orders =>
    orders.filter((order: Order) => order.status === "調理中");

  const PreparedOrders = (): Orders =>
    orders.filter((order: Order) => order.status === "準備完了");

  const OrderList = (orders: Orders) => {
    return (
      <>
        {orders.map((order: Order) => {
          return (
            <ItemOrder key={order.id}>
              <Grid container>
                <Grid item xs>
                  {order.serviceType}
                </Grid>
                <Grid item xs>
                  {order.orderNumber}
                </Grid>
                <Grid item xs>
                  {order.brandName}
                </Grid>
                <Grid item xs>
                  {order.expeditionType}
                </Grid>
                <Grid item xs>
                  {order.deliveredAt}
                </Grid>
              </Grid>
            </ItemOrder>
          );
        })}
      </>
    );
  };

  const handlerStatus = (status: Status) => {
    setStatus(status);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {isOrderStops && (
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={10}>
              <Grid container>
                <Alert severity="error" style={{ width: "100%" }}>
                  現在、注文受付停止中のブランドがあります&nbsp;-&nbsp;
                  <Link to={"/order_stop"}>
                    <strong>確認</strong>
                  </Link>
                </Alert>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={10}>
            <Item>
              <Grid container>
                <Grid item xs>
                  サービス名
                </Grid>
                <Grid item xs>
                  注文番号
                </Grid>
                <Grid item xs>
                  店舗名
                </Grid>
                <Grid item xs>
                  お渡し方法
                </Grid>
                <Grid item xs>
                  受け渡し時間
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2}>
            {status === "新規注文" ? (
              <LeftPrimaryButton onClick={() => handlerStatus("新規注文")}>
                {NewOrder()}
              </LeftPrimaryButton>
            ) : (
              <LeftButton onClick={() => handlerStatus("新規注文")}>
                {NewOrder()}
              </LeftButton>
            )}
            {status === "調理中" ? (
              <LeftPrimaryButton onClick={() => handlerStatus("調理中")}>
                {CookingOrder()}
              </LeftPrimaryButton>
            ) : (
              <LeftButton onClick={() => handlerStatus("調理中")}>
                {CookingOrder()}
              </LeftButton>
            )}
            {status === "準備完了" ? (
              <LeftPrimaryButton onClick={() => handlerStatus("準備完了")}>
                {PreparedOrder()}
              </LeftPrimaryButton>
            ) : (
              <LeftButton onClick={() => handlerStatus("準備完了")}>
                {PreparedOrder()}
              </LeftButton>
            )}
          </Grid>
          <Grid item xs={10}>
            {status === "新規注文" ? OrderList(NewOrders()) : null}
            {status === "調理中" ? OrderList(CookingOrders()) : null}
            {status === "準備完了" ? OrderList(PreparedOrders()) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
