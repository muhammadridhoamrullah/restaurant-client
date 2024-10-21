import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../config/axiosInstance";

export default function AddEditCuisine({ type }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const [addCuisine, setAddCuisine] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setAddCuisine({
      ...addCuisine,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (type === "add") {
        const { data } = await instance.post(`/cuisines`, addCuisine, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Add Cuisine successful!",
        });
      } else {
        const { data } = await instance.put(`cuisines/${id}`, addCuisine, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Edit Cuisine successful!",
        });
      }

      navigate("/cuisines");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const fetchDetailData = async () => {
    try {
      const { data } = await instance.get(`cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setAddCuisine({
        name: data.name,
        description: data.description,
        price: data.price,
        imgUrl: data.imgUrl,
        categoryId: data.categoryId,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    if (type === "edit") {
      fetchDetailData();
    }
  }, []);
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="nameHelp"
            name="name"
            value={addCuisine.name}
            onChange={changeHandler}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputDescription1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputDescription1"
            name="description"
            value={addCuisine.description}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPrice1" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPrice1"
            name="price"
            value={addCuisine.price}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputImgUrl1" className="form-label">
            Image Url
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputImgUrl1"
            name="imgUrl"
            value={addCuisine.imgUrl}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputCategoryId1" className="form-label">
            Category Id
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputCategoryId1"
            name="categoryId"
            value={addCuisine.categoryId}
            onChange={changeHandler}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
