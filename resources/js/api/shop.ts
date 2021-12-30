import axios from "./base";

export type Shop = {
  name: string;
  address: string;
  email: string;
};

export async function getShop(): Promise<Shop> {
  try {
    const response = await axios.get<{
      shop: Shop;
    }>("api/shops");
    return response.data.shop;
  } catch (e) {
    console.error(e);
  }
  return {
    name: "",
    address: "",
    email: "",
  };
}
