import axios from "axios";

const api = axios.create({
  baseURL: "https://api-alva.herokuapp.com/"
});
export { api };
