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
import AvailableLoad from "./components/AvailableLoad/AvailableLoad.jsx";
import PostVehicleAvailability from "./components/VehiclePages/PostVehicleAvailability/PostVehicleAvailability.jsx";
import VehiProfile from "./components/VehiclePages/Profile/VehiProfile.jsx";
import BusinessProfile from "./components/BusinessPage/Profile/BusinessProfile.jsx";
import AvailableVehiclesList from "./components/BusinessPage/AvailableVehicles/AvailableVehiclesList.jsx";
import About from "./components/About/About.jsx";
import PostYourLoadBusi from "./components/BusinessPage/PostYourLoad/PostYourLoadBusi.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/businesslogin" element={<LoginBusinessPage />} />
      <Route path="/businesssignup" element={<SignupBusinessPage />} />
      <Route path="/vehiclelogin" element={<LoginVehiclePage />} />
      <Route path="/vehiclesignup" element={<SignupVehiclePage />} />
      <Route path="/contactus" element={<ContactUsPage />} />
      <Route path="/loaddatalist" element={<AvailableLoad/>} />
      <Route path="/postvehiavai" element={<PostVehicleAvailability />} />
      <Route path="/vehiprofile" element={<VehiProfile />} />
      <Route path="/businessprofile" element={<BusinessProfile />} />
      <Route path="/postyourloadbusi" element={<PostYourLoadBusi />} />
      <Route path="/availablevehiclelist" element={<AvailableVehiclesList />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
