import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import HomeScreen from "./screens/HomeScreen.jsx";
import AboutScreen from "./screens/AboutScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PasswordFinder from "./screens/PasswordFinder.jsx";
import ForgetPWD from "./screens/ForgetPWD.jsx";
import Error from "./components/Error";


import PrivateRoute from "./components/PrivateRoute";
import Contact from "./components/Contact.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route element={<App/>} >
      <Route path="/*" element={<Error/>}/>
      <Route index element={<HomeScreen />} />
      <Route path='about' element={<AboutScreen />} />

      <Route path='login' element={<LoginScreen />} />
      <Route path='register' element={<RegisterScreen />} />
      <Route path='pwd' element={<PasswordFinder />} />
      <Route path='frgtpwd' element={<ForgetPWD/>} />
      <Route path="contact" element={<Contact/>}/>

      <Route element={<PrivateRoute />}>
        <Route path='profile' element={<ProfileScreen />} />
        <Route path='dashboard' element={<DashboardScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
