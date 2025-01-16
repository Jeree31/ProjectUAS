import Header from "./Header";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchProduct() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  async function search(key) {
    if (!key) {
      setData([]);
      return;
    }
    try {
      let result = await fetch("http://localhost:8000/api/search/" + key);
      if (!result.ok) {
        throw new Error("Failed to fetch data");
      }
      result = await result.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    }
  }

  async function deleteOperation(id) {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus produk dengan ID = ${id}?`
      )
    ) {
      try {
        let result = await fetch("http://localhost:8000/api/delete/" + id, {
          method: "DELETE",
        });
        if (!result.ok) {
          throw new Error("Failed to delete product");
        }
        result = await result.json();
        alert("Produk berhasil dihapus.");
        search(""); // Refresh data setelah penghapusan
      } catch (err) {
        alert("Gagal menghapus produk. Silakan coba lagi.");
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Cari Produk</h1>
        <br />
        <input
          onChange={(e) => search(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Ketik nama produk untuk mencari"
        />
        <br />
        {error && <div className="alert alert-danger">{error}</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Deskripsi</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <img
                      style={{ width: 100 }}
                      src={
                        item.file_path
                          ? "http://localhost:8000/" + item.file_path
                          : "https://via.placeholder.com/100"
                      }
                      alt="product"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteOperation(item.id)}
                    >
                      Hapus
                    </button>{" "}
                    <Link to={"update/" + item.id}>
                      <button className="btn btn-warning">Ubah</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Tidak ada produk yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SearchProduct;
