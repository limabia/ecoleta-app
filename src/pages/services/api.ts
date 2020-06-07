import axios from "axios";
import { createNativeWrapper } from "react-native-gesture-handler";

const api = axios.create({
  baseURL: "http://186.220.199.147:3333",
});

export default api;
