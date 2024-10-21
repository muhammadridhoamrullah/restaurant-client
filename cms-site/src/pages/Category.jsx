import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import hook useNavigate
import instance from "../config/axiosInstance";

export default function Category() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate(); // Menggunakan hook useNavigate

  // Fungsi untuk mengambil data kategori
  const dataCategory = async () => {
    try {
      const { data } = await instance.get("/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCategory(data);
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
      dataCategory();
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-3">Daftar Kategori</h1>
      <div className="mt-5">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
            </tr>
          </thead>
          <tbody>
            {category.map((cat, index) => (
              <tr key={cat.id}>
                <td>{index + 1}</td>
                <td>{cat.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
