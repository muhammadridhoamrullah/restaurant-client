import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import instance from "../config/axiosInstance";

export default function Cuisines() {
  const navigate = useNavigate();
  const [cuisines, setCuisines] = useState([]);

  const dataCuisines = async () => {
    try {
      const { data } = await instance.get("/cuisines", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCuisines(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const deleteHandler = async (e, id) => {
    e.preventDefault(); // Untuk mencegah default behavior dari link

    try {
      const { data } = await instance.delete("/cuisines/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Delete successful!",
      });
      dataCuisines();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    if (!localStorage.access_token) {
      navigate("/login");
    } else {
      dataCuisines();
    }
  }, []);
  return (
    <section>
      <div className="container">
        <h1 className="text-center mt-3">List Cuisine</h1>
        <div className="mt-3">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Category Id</th>
                <th scope="col">Author Id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cuisines.map((el, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.description}</td>
                  <td>{el.price}</td>
                  <td>{el.categoryId}</td>
                  <td>{el.authorId}</td>
                  <td>
                    <Link
                      to={`/cuisinesEdit/${el.id}`}
                      className="btn btn-warning"
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/uploadImage/${el.id}`}
                      className="btn btn-info"
                      style={{ marginRight: "10px" }}
                    >
                      Upload Image
                    </Link>

                    <Link
                      onClick={(e) => deleteHandler(e, el.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
