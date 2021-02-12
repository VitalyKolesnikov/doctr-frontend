import axios from "axios";

const { REACT_APP_API_URL } = process.env;
const API_URL = REACT_APP_API_URL + "/api/v1/auth/login";

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL, {
        username,
        password
      });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isUserLoggedIn() {
    let user = localStorage.getItem("user")
    if (user === null) return false
    return true
  }
}

export default new AuthService();
