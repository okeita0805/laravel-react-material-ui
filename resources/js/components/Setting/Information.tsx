import * as React from "react";
import { Grid, Paper, styled, Typography } from "@material-ui/core";
import { Shop } from "../../api/shop";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  textAlign: "left",
  fontSize: "large",
  color: theme.palette.text.secondary,
  "&.selected": {
    color: "white",
    backgroundColor: "black",
  },
}));

export const Information: React.FC<{
  shop: Shop;
}> = ({ shop }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2">
          店舗情報
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Grid container>
            <Grid item xs={2}>
              店舗名:
            </Grid>
            <Grid item xs={10}>
              {shop.name}
            </Grid>
            <Grid item xs={2}>
              店舗所在地:
            </Grid>
            <Grid item xs={10}>
              {shop.address}
            </Grid>
            <Grid item xs={2}>
              メール:
            </Grid>
            <Grid item xs={10}>
              {shop.email}
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
};
