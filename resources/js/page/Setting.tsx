import { Button, createStyles, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Shop } from "../api/shop";
import { Information } from "../components/Setting/Information";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

export const Setting: React.FC<{
  shop: Shop;
}> = ({ shop }) => {
  const classes = useStyles();

  const [isFirstTab, setIsFirstTab] = React.useState<boolean>(true);

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12}>
        <Grid item xs={6} style={{ paddingLeft: "12px", paddingRight: "12px" }}>
          <Button
            onClick={() => setIsFirstTab(true)}
            variant="contained"
            style={{ width: "100%" }}
            color={isFirstTab ? "primary" : "inherit"}>
            店舗基本情報
          </Button>
        </Grid>
        <Grid item xs={6} style={{ paddingLeft: "12px", paddingRight: "12px" }}>
          <Button
            onClick={() => setIsFirstTab(false)}
            variant="contained"
            style={{ width: "100%" }}
            color={isFirstTab ? "inherit" : "primary"}>
            プリンター設定
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        {isFirstTab ? <Information shop={shop} /> : null}
      </Grid>
    </Grid>
  );
};
