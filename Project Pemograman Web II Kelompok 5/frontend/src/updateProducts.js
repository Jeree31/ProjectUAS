import Header from "./Header";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProducts() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState({});
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate(); // Navigasi dengan React Router v6

  // Fetch data produk berdasarkan ID
  useEffect(() => {
    async function fetchProduct() {
      try {
        let result = await fetch(`http://localhost:8000/api/product/${id}`);
        if (!result.ok) {
          throw new Error("Failed to fetch product data");
        }
        result = await result.json();
        setData(result);
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("Gagal memuat data produk.");
      }
    }
    fetchProduct();
  }, [id]);

  // Update produk
  async function editProduct() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);

    try {
      let result = await fetch(`http://localhost:8000/api/updateproduct/${id}`, {
        method: "POST",
        body: formData,
        headers: {
          "X-HTTP-Method-Override": "PUT", // Mendukung method override
        },
      });
      if (!result.ok) {
        throw new Error("Failed to update product");
      }
      alert("Produk berhasil diperbarui!");
      navigate("/"); // Arahkan ke halaman utama
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Gagal memperbarui produk.");
    }
  }

  return (
    <div>
      <Header />
      <h1>Update Products</h1>
      <div className="col-sm-6 offset-sm-3">
        <br />
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Produk"
        />
        <input
          className="form-control"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Harga Produk"
        />
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi Produk"
        ></textarea>
        <input
          className="form-control"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        {data.file_path ? (
          <img
            width="50%"
            height="50%"
            src={`http://localhost:8000/${data.file_path}`}
            alt="Product"
          />
        ) : (
          <p>Tidak ada gambar produk</p>
        )}
        <br />
        <br />
        <button className="btn btn-danger" onClick={editProduct}>
          Update Product
        </button>
      </div>
    </div>
  );
}

export default UpdateProducts;
