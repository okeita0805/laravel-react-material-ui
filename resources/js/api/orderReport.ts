import axios from "./base";
import { ServiceType } from "./orderHistory";

export type OrderReport = {
  summary: OrderSummary[];
  eachReport: OrderEachReport[];
};

export type OrderSummary = {
  brandName: string;
  serviceType: ServiceType | "全て";
  orderQuantity: number;
  total: number;
};

export type OrderEachReport = {
  id: number;
  status: string;
  orderedAt: string;
  orderNumber: string;
  total: number;
  brandName: string;
};

export async function getOrderHistory(
  startDate: string | null,
  serviceType: ServiceType | "全て"
): Promise<OrderReport> {
  try {
    const response = await axios.get<{
      orderReport: OrderReport;
    }>("api/order_reports", {
      params: {
        startDate: startDate,
        serviceType: serviceType,
      },
    });
    return response.data.orderReport;
  } catch (e) {
    console.error(e);
  }
  return {
    summary: [],
    eachReport: [],
  };
}
