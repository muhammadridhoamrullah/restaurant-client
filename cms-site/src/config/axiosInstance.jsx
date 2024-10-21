import axios from "axios";
const instance = axios.create({
  baseURL: "https://restaurant.ridhoamr.my.id",
});

export default instance;
