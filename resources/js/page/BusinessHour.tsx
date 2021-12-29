import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Paper, styled } from "@material-ui/core";
import SaleHistoryTable from "../components/Sale/Table";
import SaleCalculate from "../components/Sale/Calculate";

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
}));

export default function Top() {
  const classes = useStyles();

  const [isHistory, setIsHistory] = useState(true);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Item style={{ backgroundColor: "black", color: "white" }}>
          UberEats
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2}>
            ブランドを選択してください
          </Grid>
          <Grid item xs={10}>
            <Item onClick={() => setIsHistory(true)}>注文履歴</Item>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Item onClick={() => setIsHistory(false)}>売上修正</Item>
      </Grid>
      <Grid item xs={12}>
        {isHistory ? <SaleHistoryTable /> : <SaleCalculate />}
      </Grid>
    </Grid>
  );
}
