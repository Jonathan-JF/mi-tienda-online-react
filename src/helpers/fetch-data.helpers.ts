import { getProducts } from "../actions";

export async function fetchData() {
  try {
    // En este proyecto usamos `getProducts` para obtener los productos locales
    const products = await Promise.resolve(getProducts());
    return products;
  } catch(error) {
    console.log(`Error en fetching data: ${error}`);
    return {};
  }
}