import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../config/axiosInstance";
import Swal from "sweetalert2";

export default function UploadImage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picture", file);

    try {
      const response = await instance.patch(`/cuisineImage/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Image uploaded successfully!",
      });

      navigate("/cuisines"); // Kembali ke halaman Cuisines setelah unggahan sukses
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3">Upload Image for Cuisine {id}</h1>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label htmlFor="file">Select Image:</label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Upload
        </button>
      </form>
    </div>
  );
}
