import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar({ changePage, page }) {
  const navigate = useNavigate();

  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   // Lakukan sesuatu dengan nilai pencarian, misalnya, navigasi ke halaman pencarian
  //   navigate(`?search=${searchQuery}`);
  // };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to={"/cuisines"}>
        Home
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <a className="nav-link" onClick={() => navigate("/cuisinesAdd")}>
              Add Cuisines
            </a>
          </li>
          <li className="nav-item">
            {/* <a className="nav-link" onClick={() => navigate("/category")}>
              Category
            </a> */}
            <Link className="nav-link" to={"/category"}>
              Category
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/addUser"}>
              Add User
            </Link>
          </li>
        </ul>
      </div>

      <div className="container d-flex flex-row-reverse">
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
