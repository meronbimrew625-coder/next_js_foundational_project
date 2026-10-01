import FilterShell from "./FilterShell";
import DishList from "./DishList";
import { getDishes } from "../../lib/dishes";

export const revalidate = 60;

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main>
      <h2>Menu</h2>
      <p>The menu is statically rendered and revalidated every 60 seconds.</p>
      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}
