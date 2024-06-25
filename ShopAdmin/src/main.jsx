import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/DashboardPage/Dashboard.jsx";
import Login from "./components/LoginPage/Login.jsx";
import AddNewShopkeepers from "./components/AddShopkeeperDetails/AddNewShopkeepers.jsx";
import AddGoodsLiist from "./components/AddGoodsListByShopkeeper/AddGoodsLiist.jsx";
import LogOut from "./components/LoginPage/LogOut.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="/addnewshaopkeepersdetails" element={<AddNewShopkeepers />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addgoodslist" element={<AddGoodsLiist />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
