import React from "react";
import Layout from "../components/Layout";
import BusinessHourPage from "../page/BusinessHour";

export default function BusinessHour() {
  return (
    <Layout title={"営業時間設定"}>
      <BusinessHourPage />
    </Layout>
  );
}
