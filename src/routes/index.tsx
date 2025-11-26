import App from "@/App";
import AppLayout from "@/layouts/app-layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
    ],
  }
])

export function AppRouter() {
  return <RouterProvider router={router} />
}