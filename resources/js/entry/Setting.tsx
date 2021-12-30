import React, { useEffect } from "react";
import { getShop, Shop } from "../api/shop";
import Layout from "../components/Layout";
import { Setting as SettingPage } from "../page/Setting";

export default function Setting() {
  const [shop, setShop] = React.useState<Shop>({
    name: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    getShop().then((shop: Shop) => {
      setShop(shop);
    });
  }, [setShop]);

  return (
    <Layout title={"設定"}>
      <SettingPage shop={shop} />
    </Layout>
  );
}
