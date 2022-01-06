import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, styled } from "@material-ui/core";
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
      <Grid item xs={6}>
        <Button
          style={{ width: "100%" }}
          variant="contained"
          color={isHistory ? "primary" : "inherit"}
          onClick={() => setIsHistory(true)}>
          注文履歴
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          style={{ width: "100%" }}
          variant="contained"
          color={isHistory ? "inherit" : "primary"}
          onClick={() => setIsHistory(false)}>
          売上修正
        </Button>
      </Grid>
      <Grid item xs={12}>
        <SaleCalculate />
        {/* {isHistory ? <SaleHistoryTable /> : <SaleCalculate />} */}
      </Grid>
    </Grid>
  );
}
