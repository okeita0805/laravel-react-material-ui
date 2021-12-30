import React, { useEffect } from "react";
import { getPrinter, Printer } from "../api/printer";
import { getShop, Shop } from "../api/shop";
import Layout from "../components/Layout";
import { Setting as SettingPage } from "../page/Setting";
import { SnackbarProvider } from "notistack";

export default function Setting() {
  const [shop, setShop] = React.useState<Shop>({
    name: "",
    address: "",
    email: "",
  });

  const [printer, setPrinter] = React.useState<Printer>({
    id: 0,
    receiptWidth: "58mm",
    quantity: 1,
  });

  useEffect(() => {
    getShop().then((shop: Shop) => {
      setShop(shop);
    });
  }, [setShop]);

  useEffect(() => {
    getPrinter().then((printer: Printer) => {
      setPrinter(printer);
    });
  }, [setPrinter]);

  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}>
      <Layout title={"設定"}>
        <SettingPage shop={shop} printer={printer} setPrinter={setPrinter} />
      </Layout>
    </SnackbarProvider>
  );
}
