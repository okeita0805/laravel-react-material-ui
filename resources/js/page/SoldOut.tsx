import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  styled,
} from "@material-ui/core";
import SaleHistoryTable from "../components/Sale/Table";
import SaleCalculate from "../components/Sale/Calculate";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      minWidth: "100%",
    },
  })
);

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
  "&.selected": {
    color: "white",
    backgroundColor: "black",
  },
}));

export default function Top() {
  const classes = useStyles();

  const [isHistory, setIsHistory] = useState(true);
  const [brand, setBrand] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBrand(event.target.value as string);
  };

  return (
    <Grid container spacing={2}>
      <Grid container>
        <Grid item xs={6}>
          ブランドを選択してください
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              onChange={handleChange}>
              <MenuItem value={10}>Brand 1</MenuItem>
              <MenuItem value={20}>Brand 2</MenuItem>
              <MenuItem value={30}>Brand 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary">
            メニューの同期
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Item
          className={isHistory ? "selected" : ""}
          onClick={() => setIsHistory(true)}>
          UberEats
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item
          className={isHistory ? "" : "selected"}
          onClick={() => setIsHistory(false)}>
          foodpanda
        </Item>
      </Grid>
      <Grid item xs={12}>
        検索結果: 12件
      </Grid>
      <Grid item xs={12}>
        {isHistory ? <SaleHistoryTable /> : <SaleCalculate />}
      </Grid>
    </Grid>
  );
}
