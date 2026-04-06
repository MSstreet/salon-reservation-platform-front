import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Salons from "./pages/Salons";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OAuthCallback from "./pages/OAuthCallback";
import Root from "./pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "salons", Component: Salons },
      { path: "booking", Component: Booking },
      { path: "my-bookings", Component: MyBookings },
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
      { path: "oauth/callback", Component: OAuthCallback },
    ],
  },
]);