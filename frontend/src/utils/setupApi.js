let API_URL;

if (process.env.NODE_ENV === "production") {
  API_URL = process.env.API_URL;
} else {
  API_URL = process.env.REACT_APP_API_URL;
}

export default API_URL;
