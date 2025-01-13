import { createBrowserRouter, RouterProvider } from "react-router-dom";
////
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
export default function AppRouter() {
  return <RouterProvider router={router}></RouterProvider>;
}
