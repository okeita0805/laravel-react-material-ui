import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Paper, styled } from "@material-ui/core";

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
  color: theme.palette.text.secondary,
  boxShadow: "none",
  width: "100%",
  height: "100px",
}));

export default function Top() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid container item xs={2}>
        <Grid container>
          <LeftButton>新規注文</LeftButton>
        </Grid>
        <Grid container>
          <LeftButton>調理中</LeftButton>
        </Grid>
        <Grid container>
          <LeftButton>準備完了</LeftButton>
        </Grid>
      </Grid>
      <Grid container item xs={10}>
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
  );
}
