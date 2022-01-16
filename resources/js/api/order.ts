import axios from "./base";

export type Order = {
  id: number;
  status: string;
  serviceType: string;
  orderNumber: string;
  brandName: string;
  expeditionType: string;
  deliveredAt: string;
};

export type Orders = Order[];

export async function getOrders(): Promise<Orders> {
  try {
    const response = await axios.get<{
      orders: Orders;
    }>("api/orders");
    return response.data.orders;
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function getOrderStops(): Promise<{ isOrderStops: boolean }> {
  try {
    const response = await axios.get<{
      isOrderStops: boolean;
    }>("api/orders/order_stops");
    return response.data;
  } catch (e) {
    console.error(e);
  }
  return {
    isOrderStops: false,
  };
}
