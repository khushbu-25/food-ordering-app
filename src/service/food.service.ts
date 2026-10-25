export interface Food {
  id?: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
}

export async function getFoods() {
  const response = await fetch("/api/getfoods");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(" no foods");
  }

  return data;
}

export async function createFood(info: Food) {
  const response = await fetch("/api/createfood", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Food not created");
  }

  return data;
}

export async function deleteFood(id: number) {
  const response = await fetch(`/api/deletefood?id=${id}`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Food not deleted");
  }

  return data;
}
export async function updateFood(info: Food) {
  const response = await fetch("/api/updatefood", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Food not updated");
  }

  return data;
}
