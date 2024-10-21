import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import instance from "../axiosInstance";

export default function Details() {
  const { id } = useParams();
  const [cuisine, setCuisine] = useState(null);

  useEffect(() => {
    async function fetchCuisineDetails() {
      try {
        const { data } = await instance.get(`/cuisines/${id}/pub`);
        setCuisine(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Terjadi kesalahan!",
          footer: '<a href="#">Mengapa saya mengalami masalah ini?</a>',
        });
      }
    }

    fetchCuisineDetails();
  }, [id]);

  if (!cuisine) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1 className="text-center">Detail Masakan</h1>
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
            <li className="list-group-item">Harga: Rp. {cuisine.price}</li>
            <li className="list-group-item">
              Kategori: {cuisine.Category.name}
            </li>
            <li className="list-group-item">
              Penulis: {cuisine.User.username}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
