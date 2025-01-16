import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function deleteOperation(id) {
    if (
      window.confirm(
        "Are you sure you want to delete product with id = " + id + "?"
      )
    ) {
      let result = await fetch("http://localhost:8000/api/delete/" + id, {
        method: "DELETE",
      });
      result = await result.json();
      console.warn(result);
      getData();
      alert("Product has been deleted");
    }
  }

  async function getData() {
    let result = await fetch("http://localhost:8000/api/list");
    result = await result.json();
    setData(result);
  }

  return (
    <div>
      <Header />
      <h1>Product Lists</h1>
      <div className="col-sm-8 offset-sm-2">
        {data.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <img
                      style={{ width: 100 }}
                      src={"http://localhost:8000/" + item.file_path}
                      alt="foto_produk"
                    />
                  </td>
                  <td>
                    <span
                      className="btnDelete"
                      onClick={() => deleteOperation(item.id)}
                    >
                      Delete
                    </span>
                    <Link to={"update/" + item.id}>
                      <span className="btnUpdate">Update</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
