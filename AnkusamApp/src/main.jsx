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
import Home from "./components/MainViews/Home/Home.jsx";
import LoginBusinessPage from "./components/MainViews/RegLoginSignupPage/LoginBusinessPage.jsx";
import SignupBusinessPage from "./components/MainViews/RegLoginSignupPage/SignupBusinessPage.jsx";
import LoginVehiclePage from "./components/MainViews/RegLoginSignupPage/LoginVehiclePage.jsx";
import SignupVehiclePage from "./components/MainViews/RegLoginSignupPage/SignupVehiclePage.jsx";
import ContactUsPage from "./components/MainViews/ContactPage/ContactUsPage.jsx";
import DashboardPage from "./components/Dashboard/DashboardPage.jsx";
import BusinessLoginPage from "./components/BusinessPage/BusinessLoginPage.jsx";
import DashboardBusinessPage from "./components/BusinessPage/DashboardBusiness/DashboardBusinessPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/businesslogin" element={<LoginBusinessPage />} />
      <Route path="/businesssignup" element={<SignupBusinessPage />} />
      <Route path="/vehiclelogin" element={<LoginVehiclePage />} />
      <Route path="/vehiclesignup" element={<SignupVehiclePage />} />
      <Route path="/contactus" element={<ContactUsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/businessloginpage" element={<BusinessLoginPage />} />
      <Route path="/dashboardbusinesspage" element={<DashboardBusinessPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
