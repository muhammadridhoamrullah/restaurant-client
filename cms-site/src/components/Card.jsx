import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Card({ char, dataCuisines }) {
  const navigate = useNavigate();

  return (
    <div className="col-3">
      <div className="card" style={{ height: "400px" }}>
        <img
          src={char.imgUrl}
          className="card-img-top"
          alt="..."
          style={{ height: "50%", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{char.name}</h5>
          <p className="card-text">{char.description}</p>
          <a
            href="#"
            className="btn btn-primary"
            onClick={() => navigate(`/cuisines/${char.id}`)}
          >
            See Detail
          </a>
        </div>
      </div>
    </div>
  );
}
