import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import instance from "../config/axiosInstance";

export default function Register() {
  const navigate = useNavigate();

  const [regisForm, setRegisForm] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    username: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setRegisForm({
      ...regisForm,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await instance.post(
        "/add-user",
        {
          email: regisForm.email,
          password: regisForm.password,
          phoneNumber: regisForm.phoneNumber,
          address: regisForm.address,
          username: regisForm.username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration successful!",
      });

      navigate("/cuisines");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response
          ? error.response.data.message
          : "Something went wrong!",
      });
      // console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/addUser");
    }
  }, []);
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
            value={regisForm.email}
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
            value={regisForm.password}
            onChange={changeHandler}
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhoneNumber1" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            value={regisForm.phoneNumber}
            onChange={changeHandler}
            name="phoneNumber"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAddress1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            value={regisForm.address}
            onChange={changeHandler}
            name="address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            value={regisForm.username}
            onChange={changeHandler}
            name="username"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
