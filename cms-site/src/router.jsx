import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Cuisines from "./pages/Cuisines";
// import Details from "./pages/Details";
import Category from "./pages/Category";
import UploadImage from "./pages/UploadImage";
import AddEditCuisine from "./pages/AddEditCuisine";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader() {
      if (localStorage.access_token) {
        return redirect("/cuisines");
      }
      return null;
    },
  },
  {
    path: "/addUser",
    element: <Layout />,
    loader: checkLogin,
    children: [
      {
        path: "",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    loader: checkLogin,
    children: [
      {
        path: "cuisines",
        element: <Cuisines />,
      },
      {
        path: "cuisinesAdd",
        element: <AddEditCuisine type={"add"} />,
      },
      {
        path: "cuisinesEdit/:id",
        element: <AddEditCuisine type={"edit"} />,
      },
      // {
      //   path: "cuisines/:id",
      //   element: <Details />,
      // },
    ],
  },
  {
    path: "/category",
    element: <Layout />,
    loader: checkLogin,
    children: [
      {
        path: "",
        element: <Category />,
      },
    ],
  },
  {
    path: "/uploadImage/:id",
    element: <Layout />,
    loader: checkLogin,
    children: [
      {
        path: "",
        element: <UploadImage />,
      },
    ],
  },
]);

export default router;
