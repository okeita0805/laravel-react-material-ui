import axios from "./base";

export type OrderHistory = {
  id: number;
  status: string;
  orderNumber: string;
  total: number;
  brandName: string;
  orderedAt: string;
};

export type ServiceType = "UberEats" | "foodpanda" | "didi";

export type OrderHistoryDetail = {
  orderNumber: string;
  expeditionType: string;
  serviceType: ServiceType;
  name: string;
  address: string;
  phone: string;
  paymentMethod: string;
  orderedAt: string;
  deliveredAt: string;
  isDisposable: boolean;
  deliveryNumber: number;
  comment: string;
  total: number;
  fee: number;
  details: Detail[];
};

export type Detail = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  modifiers: Detail[];
};

export type OrderHistories = OrderHistory[];

export const getInitialOrderHistoryDetail = (): OrderHistoryDetail => {
  return {
    orderNumber: "",
    expeditionType: "",
    serviceType: "UberEats",
    name: "",
    address: "",
    phone: "",
    paymentMethod: "",
    orderedAt: "",
    deliveredAt: "",
    isDisposable: true,
    deliveryNumber: 0,
    comment: "",
    total: 0,
    fee: 0,
    details: [],
  };
};

export async function getOrderHistories(): Promise<OrderHistories> {
  try {
    const response = await axios.get<{
      orderHistories: OrderHistories;
    }>("api/order_histories");
    return response.data.orderHistories;
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function getOrderHistoryById(
  id: number
): Promise<OrderHistoryDetail> {
  try {
    const response = await axios.get<{
      orderHistoryDetail: OrderHistoryDetail;
    }>(`api/order_histories/${id}`);
    return response.data.orderHistoryDetail;
  } catch (e) {
    console.error(e);
  }
  return getInitialOrderHistoryDetail();
}
