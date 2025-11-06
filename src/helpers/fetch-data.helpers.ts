import { getRobots } from "../actions";

export async function fetchData() {
  try {
    const data = await getRobots();
    const robots = data.robots;
    return robots;
  } catch(error) {
    console.log(`Error en fetching data: ${error}`);
    return {};
  }
}