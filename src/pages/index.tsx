import { useEffect, useState } from "react";
import {
  getFoods,
  createFood,
  deleteFood,
  Food,
  updateFood,
} from "@/service/food.service";

export default function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [selectcategory, setselectcategory] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    const getFoodData = async () => {
      const data = await getFoods();
      setFoods(data);
    };

    getFoodData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      await updateFood({
        id: editId,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        description: form.description,
        image: form.image,
      });

      const data = await getFoods();
      setFoods(data);

      setEditId(null);
    } else {
      await createFood({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        description: form.description,
        image: form.image,
      });
    }
    const data = await getFoods();
    setFoods(data);
    setForm({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });
  };
  const handleEdit = (food: Food) => {
    setEditId(food.id!);

    setForm({
      name: food.name,
      category: food.category,
      price: String(food.price),
      description: food.description,
      image: String(food.image),
    });
  };
  const handleDelete = async (id: number) => {
    await deleteFood(id);

    const data = await getFoods();
    setFoods(data);
  };
  const allCategory = foods.map((f) => f.category);
  const all = [...new Set(allCategory)];
  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectcategory == "all category" || food.category == selectcategory),
  );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "blue" }}>Food Ordering App</h1>

      <h2>Add Food</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "10px",
          maxWidth: "500px",
        }}
      >
        <input
          name="name"
          placeholder="Food name"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={(e) => {
            setForm({ ...form, category: e.target.value });
          }}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={(e) => {
            setForm({ ...form, price: e.target.value });
          }}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
          }}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => {
            setForm({ ...form, image: e.target.value });
          }}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Food
        </button>
      </form>

      <hr />

      <h2>Food Menu</h2>

      <input
        placeholder="Search food"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={selectcategory}
        onChange={(e) => {
          setselectcategory(e.target.value);
        }}
      >
        <option value="all category">All category</option>
        {all.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginTop: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={food.image}
              alt={food.name}
              style={{
                width: "200px",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <h3>{food.name}</h3>

            <p>Category: {food.category}</p>

            <p>Price: ₹{food.price}</p>

            <p>{food.description}</p>

            <button
              onClick={() => handleDelete(food.id!)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(food)}
              style={{
                backgroundColor: "orange",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
