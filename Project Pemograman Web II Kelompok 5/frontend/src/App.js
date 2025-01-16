import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import AddProducts from "./addProducts";
import UpdateProducts from "./updateProducts";
import Protected from "./protected";
import ProductList from "./productList";
import SearchProduct from "./searchProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/add"
            element={
              <Protected>
                <AddProducts />
              </Protected>
            }
          />
          <Route
            path="/update/:id"
            element={
              <Protected>
                <UpdateProducts />
              </Protected>
            }
          />
          <Route
            path="/search"
            element={
              <Protected>
                <SearchProduct />
              </Protected>
            }
          />
          <Route
            path="/"
            element={
              <Protected>
                <ProductList />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
