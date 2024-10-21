import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import router from "./router";
import { RouterProvider } from "react-router-dom";
// import './App.css'

function App() {
  // const [page, setPage] = useState("");

  // const changePage = (event, page) => {
  //   event.preventDefault();

  //   setPage(page);
  // };

  return (
    <>
      {/* <Navbar changePage={changePage} page={page} /> */}

      <RouterProvider router={router} />
    </>
  );
}

export default App;
