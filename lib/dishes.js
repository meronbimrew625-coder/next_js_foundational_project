const dishes = [
  {
    id: "1",
    name: "Doro Wot",
    category: "Main Dishes",
    description: "Spicy Ethiopian chicken stew.",
  },
  {
    id: "2",
    name: "Tibs",
    category: "Main Dishes",
    description: "Sauteed meat with vegetables and spices.",
  },
  {
    id: "3",
    name: "Buna",
    category: "Drinks",
    description: "Traditional Ethiopian coffee.",
  },
];

export async function getDishes() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return dishes;
}

export async function getDishById(id) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return dishes.find((dish) => dish.id === id) ?? null;
}
