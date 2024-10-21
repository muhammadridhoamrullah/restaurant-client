import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import instance from "../axiosInstance";

export default function Cuisines() {
  const navigate = useNavigate();
  const [cuisines, setCuisines] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // Menambahkan state untuk sort
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); // Menambahkan state untuk total item
  const itemsPerPage = 10; // Jumlah item per halaman

  useEffect(() => {
    async function dataCuisines() {
      try {
        const { data } = await instance.get("/cuisines/pub", {
          params: {
            size: itemsPerPage,
            number: currentPage,
            search: search,
            sort: sort, // Menambahkan parameter sort
          },
        });
        console.log("Data diterima:", data); // Logging untuk memastikan data diterima dengan benar
        setCuisines(data.data);
        setTotalItems(data.totalItems); // Menetapkan total item dari respons backend
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    }

    dataCuisines();
  }, [currentPage, search, sort]); // Tambahkan sort sebagai dependency

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset halaman ke 1 saat pencarian berubah
  };

  // Fungsi untuk menangani perubahan sort
  const handleSortChange = (sortField) => {
    let newSort = sort === sortField ? `-${sortField}` : sortField;
    setSort(newSort);
  };

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total halaman
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Menggunakan totalItems dari backend

  return (
    <section>
      <h1 className="text-center">RM Indak Disangko</h1>
      <div className="container">
        <div className="row justify-content-center mb-4">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Cari masakan..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col d-flex justify-content-start mb-3">
          <button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={() => handleSortChange("name")}
          >
            Sort by Name
          </button>
        </div>
        <div className="row gap-3 justify-content-around">
          {cuisines.map((el, i) => (
            <Card key={i} char={el} />
          ))}
        </div>
        <div className="row justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
