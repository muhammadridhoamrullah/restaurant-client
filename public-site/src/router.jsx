import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Cuisines from "./pages/Cuisines";
import Details from "./pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Cuisines />,
      },
      {
        path: "cuisines/:id/pub",
        element: <Details />,
      },
    ],
  },
]);

export default router;
