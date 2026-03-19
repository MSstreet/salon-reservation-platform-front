import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Salons from "./pages/Salons";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Root from "./pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "salons", Component: Salons },
      { path: "services", Component: Services },
      { path: "booking", Component: Booking },
      { path: "my-bookings", Component: MyBookings },
    ],
  },
]);