import axios from "axios";

const instance = axios.create({
  baseURL: 'https://go-document-ai.cognitiveservices.azure.com',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Ocp-Apim-Subscription-Key": "3e924a42916a4cf09713835a8317dc34"
  },
});

instance.interceptors.request.use((request) => {

//   sessionStorage.user ? request.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.user)}` : ""
  request.headers["Access-Control-Allow-Origin"] = "*";
  request.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Ocp-Apim-Subscription-Key";
  request.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
  
  return request;

});

export default instance;