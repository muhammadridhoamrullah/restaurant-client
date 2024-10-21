import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../config/axiosInstance";

export default function Details() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [cuisine, setCuisine] = useState([]);

  const dataCuisine = async () => {
    try {
      const { data } = await instance.get(`/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCuisine(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  useEffect(() => {
    if (!localStorage.access_token) {
      navigate("/login");
    } else {
      dataCuisine();
    }
  }, []);

  return (
    <section>
      <h1 className="text-center">Cuisine Detail</h1>
      <div className="container d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={cuisine.imgUrl}
            className="card-img-top"
            alt={cuisine.name}
            style={{ height: "50%", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{cuisine.name}</h5>
            <p className="card-text">{cuisine.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Price: Rp. {cuisine.price}</li>
            <li className="list-group-item">Category: {cuisine.categoryId}</li>
            <li className="list-group-item">Author: {cuisine.authorId}</li>
            <button
              className="bg-primary"
              onClick={() => navigate(`/cuisinesEdit/${cuisine.id}`)}
            >
              Edit
            </button>
          </ul>
        </div>
      </div>
    </section>
  );
}
