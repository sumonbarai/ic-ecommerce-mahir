import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const field = e.target.name;
    let val = e.target.value;
    if (field === "price") val = Number(val);
    setProduct({
      ...product,
      [field]: val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "products"), product);
      setLoading(false);
      toast.success("Successfully added!");
      setProduct({ title: "", price: "", image: "", description: "" });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_upload_preset);
    formData.append("cloud_name", import.meta.env.VITE_cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dpifasulh/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await res.json();
    setProduct({
      ...product,
      image: result.secure_url,
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Title:</p>
        <input
          value={product.title}
          onChange={handleChange}
          name="title"
          style={{ display: "block", width: "80%" }}
          required
        />
        <br />
        <p>Price:</p>

        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          style={{ display: "block", width: "80%" }}
          type="number"
          required
        />
        <br />

        <p>Description:</p>
        <input
          name="description"
          value={product.description}
          onChange={handleChange}
          style={{ display: "block", width: "80%" }}
          type="text"
          required
        />
        <br />
        <p>Image URL:</p>

        {/* <input
          name="image"
          value={product.image}
          onChange={handleChange}
          style={{ display: "block", width: "80%" }}
          type="text"
          required
        /> */}

        {product.image && <img src={product.image} alt="" width={200} />}

        <input type="file" name="image" onChange={handleImageChange} />
        <br />
        <input type="submit" disabled={loading} />
      </form>
    </>
  );
};

export default AddProduct;
