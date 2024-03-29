import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//page
import Login from "./component/pages/auth/Login";
import Register from "./component/pages/auth/Register";
import Home from "./component/pages/Home";
import Product from "./component/pages/Product";
import Shop from "./component/pages/Shop";
import Cart from "./component/pages/Cart";

// import router from "./component/routes/root";

//Layout
import Navbar from "./component/layouts/Navbar";
//page admin
import HomeAdmin from "./component/pages/admin/Home";
import ManageAdmin from "./component/pages/admin/ManageAdmin";
import CreateCategory from "./component/pages/admin/category/CreateCategory";
import UpdateCategory from "./component/pages/admin/category/UpdateCategory";
import CreateProduct from "./component/pages/admin/product/CreateProduct";
import UpdateProduct from "./component/pages/admin/product/UpdateProduct";
import Orders from "./component/pages/admin/Orders";
//page user
import HomeUser from "./component/pages/user/Home";
import Checkout from "./component/pages/Checkout";
import WishList from "./component/pages/user/WishList";
import History from "./component/pages/user/History";

//function
import { currentUser } from "./component/functions/auth";
// redux
import { useDispatch } from "react-redux";
//Rouute
import UserRoute from "./component/routes/UserRoute";
import AdminRoute from "./component/routes/AdminRoute";
//Drawer
import SideDrawer from "./component/drawer/SideDrawer";

function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <SideDrawer />
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-category/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />
        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <Checkout />
            </UserRoute>
          }
        />
        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <WishList />
            </UserRoute>
          }
        />
        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
