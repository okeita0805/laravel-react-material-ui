import axios from "./base";

export type ReceiptWidth = "58mm" | "80mm";

export type Quantity = 1 | 2 | 3;

export type Printer = {
  id: number;
  receiptWidth: ReceiptWidth;
  quantity: Quantity;
};

export async function getPrinter(): Promise<Printer> {
  try {
    const response = await axios.get<{
      printer: Printer;
    }>("api/printers");
    return response.data.printer;
  } catch (e) {
    console.error(e);
  }
  return {
    id: 0,
    receiptWidth: "58mm",
    quantity: 1,
  };
}

export async function putPrinter(printer: Printer): Promise<void> {
  try {
    await axios.put<{
      printer: Printer;
    }>("api/printers", printer);
  } catch (e) {
    console.error(e);
  }
}
