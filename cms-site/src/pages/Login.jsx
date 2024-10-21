import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import instance from "../config/axiosInstance";

export default function Login({ setPage }) {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await instance.post("/login", {
        email: loginForm.email,
        password: loginForm.password,
      });

      localStorage.access_token = data.access_token;

      navigate("/cuisines");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  // useEffect(() => {
  //   if (localStorage.access_token) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={loginForm.email}
            onChange={changeHandler}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={loginForm.password}
            onChange={changeHandler}
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
