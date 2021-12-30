import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  styled,
} from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { Brand, Brands, putBrand } from "../api/brands";

type Service = "UberEats" | "foodpanda" | "didi";

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

const OrderButton = (
  orderAccepted: boolean,
  handlerClick: React.MouseEventHandler<HTMLButtonElement>
): JSX.Element => {
  return orderAccepted ? (
    <Button onClick={handlerClick} variant="contained">
      注文受付中
    </Button>
  ) : (
    <Button onClick={handlerClick} variant="contained" color="secondary">
      受付停止中
    </Button>
  );
};

export const OrderStop: React.FC<{
  brands: Brands;
  setBrands: Dispatch<SetStateAction<Brands>>;
}> = ({ brands, setBrands }) => {
  const classes = useStyles();

  const updateBrands = (updatedBrand: Brand): void => {
    const updatedBrands = brands.map((brand) => {
      if (updatedBrand.id === brand.id) {
        putBrand(updatedBrand);
        return { ...updatedBrand };
      }
      return { ...brand };
    });
    setBrands(updatedBrands);
  };

  const OrderButtonUberEats = (brand: Brand): JSX.Element => {
    const handlerClick = () => {
      updateBrands({
        ...brand,
        isUberEatsOrderAccepted: !brand.isUberEatsOrderAccepted,
      });
    };
    return OrderButton(brand.isUberEatsOrderAccepted, handlerClick);
  };

  const OrderButtonFoodpanda = (brand: Brand): JSX.Element => {
    const handlerClick = () => {
      updateBrands({
        ...brand,
        isFoodpandaOrderAccepted: !brand.isFoodpandaOrderAccepted,
      });
    };
    return OrderButton(brand.isFoodpandaOrderAccepted, handlerClick);
  };

  const OrderButtonDidi = (brand: Brand): JSX.Element => {
    const handlerClick = () => {
      updateBrands({
        ...brand,
        isDidiOrderAccepted: !brand.isDidiOrderAccepted,
      });
    };
    return OrderButton(brand.isDidiOrderAccepted, handlerClick);
  };

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12}>
        <Grid item xs={6}>
          <Item>店舗一覧</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Button variant="contained" color="primary">
              注文受け付け状況の同期
            </Button>
          </Item>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            borderBottom: "1px solid #dadada",
            paddingBottom: "24px",
            paddingTop: "24px",
          }}>
          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              UberEats
            </Grid>
            <Grid item xs={3}>
              foodpada
            </Grid>
            <Grid item xs={3}>
              didi
            </Grid>
          </Grid>
        </Grid>
        {brands.map((brand) => {
          return (
            <Grid
              item
              key={brand.id}
              xs={12}
              style={{
                borderBottom: "1px solid #dadada",
                paddingBottom: "24px",
                paddingTop: "24px",
              }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {brand.name}
                </Grid>
                <Grid item xs={3}>
                  {brand.isUberEatsUsage ? OrderButtonUberEats(brand) : null}
                </Grid>
                <Grid item xs={3}>
                  {brand.isFoodpandaUsage ? OrderButtonFoodpanda(brand) : null}
                </Grid>
                <Grid item xs={3}>
                  {brand.isDidiUsage ? OrderButtonDidi(brand) : null}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
