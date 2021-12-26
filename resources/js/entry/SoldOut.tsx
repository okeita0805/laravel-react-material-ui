import React from "react";
import Layout from "../components/Layout";
import SoldOutPage from "../page/SoldOut";

export default function SoldOut() {
  return (
    <Layout title={"商品売切れ設定"}>
      <SoldOutPage />
    </Layout>
  );
}
