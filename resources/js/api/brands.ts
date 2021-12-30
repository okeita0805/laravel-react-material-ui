import axios from "./base";

export type Brand = {
  id: number;
  name: string;
  isUberEatsUsage: boolean;
  isFoodpandaUsage: boolean;
  isDidiUsage: boolean;
  isUberEatsOrderAccepted: boolean;
  isFoodpandaOrderAccepted: boolean;
  isDidiOrderAccepted: boolean;
};

export type Brands = Brand[];

export async function getBrands(): Promise<Brands> {
  try {
    const response = await axios.get<{
      brands: Brands;
    }>("api/brands");
    return response.data.brands;
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function putBrand(brand: Brand): Promise<void> {
  try {
    await axios.put<{
      brands: Brands;
    }>("api/brands", brand);
  } catch (e) {
    console.error(e);
  }
}
