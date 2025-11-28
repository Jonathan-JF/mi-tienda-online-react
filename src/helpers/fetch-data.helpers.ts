import { getProducts } from "../actions";

export async function fetchData() {
  try {
    // En este proyecto usamos `getProducts` (ahora asíncrona) para obtener productos desde el backend
    const products = await getProducts();
    return products;
  } catch(error) {
    console.log(`Error en fetching data: ${error}`);
    return {};
  }
}