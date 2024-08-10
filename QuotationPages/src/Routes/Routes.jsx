import React from "react";
import App from "../App";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  LogIn,
  Quotation,
  Dashboard,
  AddShopkeeper,
  AddGoodsItems,
} from "../components/Exports/AllComponentsExport";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<LogIn />} />
      <Route path="/createquotation" element={<Quotation />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addshopkeeper" element={<AddShopkeeper />} />
      <Route path="/addgoodsitems" element={<AddGoodsItems />} />
    </Route>
  )
);

export { router };
