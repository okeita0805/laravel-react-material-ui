import React, { useEffect } from "react";
import { Brands, getBrands } from "../api/brands";
import Layout from "../components/Layout";
import { OrderStop as OrderStopPage } from "../page/OrderStop";

export default function OrderStop() {
  const [brands, setBrands] = React.useState<Brands>([]);

  useEffect(() => {
    getBrands().then((brands: Brands) => {
      setBrands(brands);
    });
  }, [setBrands]);

  return (
    <Layout title={"注文受け付け停止"}>
      <OrderStopPage brands={brands} setBrands={setBrands} />
    </Layout>
  );
}
