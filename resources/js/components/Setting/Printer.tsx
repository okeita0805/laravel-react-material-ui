import * as React from "react";
import { Button, Grid, Paper, styled, Typography } from "@material-ui/core";
import {
  Printer as PrinterType,
  putPrinter,
  Quantity,
  ReceiptWidth,
} from "../../api/printer";

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

export const Printer: React.FC<{
  printer: PrinterType;
  setPrinter: React.Dispatch<React.SetStateAction<PrinterType>>;
}> = ({ printer, setPrinter }) => {
  const handlerClickReceiptWidth = (receiptWidth: ReceiptWidth) => {
    setPrinter({
      ...printer,
      receiptWidth,
    });
  };

  const handlerClickQuantity = (quantity: Quantity) => {
    setPrinter({
      ...printer,
      quantity,
    });
  };

  const handlerClickSave = () => {
    putPrinter(printer);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2">
          プリンター設定
        </Typography>
        <Typography variant="body1">
          注文情報をプリンターから出力するためにはプリンターの設定を行ってください。
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "24px" }}>
        <Typography variant="h6" component="h2">
          レシート幅の選択
        </Typography>
        <Grid container>
          <Grid item xs={8}>
            <Grid container style={{ marginTop: "24px" }}>
              <Button
                onClick={() => handlerClickReceiptWidth("58mm")}
                variant="contained"
                color={printer.receiptWidth === "58mm" ? "primary" : "inherit"}>
                58mm
              </Button>
              <span style={{ marginLeft: "24px" }}>
                <Button
                  onClick={() => handlerClickReceiptWidth("80mm")}
                  variant="contained"
                  color={
                    printer.receiptWidth === "80mm" ? "primary" : "inherit"
                  }>
                  80mm
                </Button>
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "24px" }}>
        <Typography variant="h6" component="h2">
          出力枚数の選択(初回注文開封時)
        </Typography>
        <div style={{ marginTop: "24px" }}>
          <Button
            onClick={() => handlerClickQuantity(1)}
            variant="contained"
            color={printer.quantity === 1 ? "primary" : "inherit"}>
            1
          </Button>
          <span style={{ marginLeft: "24px" }}>
            <Button
              onClick={() => handlerClickQuantity(2)}
              variant="contained"
              color={printer.quantity === 2 ? "primary" : "inherit"}>
              2
            </Button>
          </span>
          <span style={{ marginLeft: "24px" }}>
            <Button
              onClick={() => handlerClickQuantity(3)}
              variant="contained"
              color={printer.quantity === 3 ? "primary" : "inherit"}>
              3
            </Button>
          </span>
        </div>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "36px" }}>
        <Button
          onClick={() => handlerClickSave()}
          variant="contained"
          color="primary">
          保存
        </Button>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "36px" }}>
        <Typography variant="h6" component="h2">
          プリンター接続マニュアルはこちら
        </Typography>
      </Grid>
    </Grid>
  );
};
