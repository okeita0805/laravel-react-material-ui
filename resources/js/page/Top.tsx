import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Paper, styled } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import CakeIcon from "@material-ui/icons/Cake";
import LocalMallIcon from "@material-ui/icons/LocalMall";

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

const NewOrder = () => (
  <Grid item>
    <Grid item xs={12}>
      <NotificationsNoneIcon style={{ fontSize: "72px" }} />
    </Grid>
    <Grid item xs={12} style={{ fontSize: "22px", marginTop: "8px" }}>
      新規注文
    </Grid>
  </Grid>
);

const CookingOrder = () => (
  <Grid item>
    <Grid item xs={12}>
      <CakeIcon style={{ fontSize: "72px" }} />
    </Grid>
    <Grid item xs={12} style={{ fontSize: "22px", marginTop: "8px" }}>
      調理中
    </Grid>
  </Grid>
);

const PreparedOrder = () => (
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
  const classes = useStyles();

  type Status = "新規注文" | "調理中" | "準備完了";

  const [status, setStatus] = useState<Status>("新規注文");

  const handlerStatus = (status: Status) => {
    setStatus(status);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Item>サービス名</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>注文番号</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>店舗名</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>お渡し方法</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>受け渡し時間</Item>
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
          <Grid item xs={10}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
