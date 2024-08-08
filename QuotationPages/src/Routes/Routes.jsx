import React from "react";
import App from "../App";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LogIn from "../components/LogInLogOutPages/LogIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LogIn />} />
    </Route>
  )
);

export { router };
