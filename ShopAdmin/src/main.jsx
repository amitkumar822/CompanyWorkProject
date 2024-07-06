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
import CreatedPoInvoice from "./components/PO_Pages/CreatedPO/CreatedPoInvoice.jsx";
import OpenPo from "./components/PO_Pages/OpenPO/OpenPo.jsx";
import ClosePo from "./components/PO_Pages/ClosePOPage/ClosePo.jsx";
import InvoiceForm from "./components/PO_Pages/InvoiceBill/InvoiceForm.jsx";
import PreviewInvoiceBill from "./components/PO_Pages/CreatedPO/PreviewInvoiceBill.jsx";
import CheckYourCreatedPoList from "./components/PO_Pages/CheckYourCreatedPO/CheckYourCreatedPoList.jsx";
import RejectedPo from "./components/PO_Pages/RejectedPOPages/RejectedPo.jsx";
import WatingForAprovalList from "./components/PO_Pages/WatingForAprovalPOPage/WatingForAprovalList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="/addnewshaopkeepersdetails" element={<AddNewShopkeepers />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addgoodslist" element={<AddGoodsLiist />} />
      <Route path="/createdpoinvoice" element={<CreatedPoInvoice />} />
      <Route path="/openpo" element={<OpenPo />} />
      <Route path="/closepo" element={<ClosePo />} />
      <Route path="/previewinvoicebill" element={<PreviewInvoiceBill />} />
      <Route path="/checkyourcreatedpolist" element={<CheckYourCreatedPoList />} />
      <Route path="/rejectedpolist" element={<RejectedPo />} />
      <Route path="/watingfroaprovallist" element={<WatingForAprovalList />} />
      <Route path="/invoicebill" element={<InvoiceForm />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // {/* </React.StrictMode> */}
);
