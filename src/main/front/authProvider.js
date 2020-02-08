import axios from "axios";

const apiUrl = "http://localhost:8080";

export const authProvider = {
  login: ({ username, password }) => {
    return axios
      .post(`${apiUrl}/auth`, {
        username,
        password
      })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.data;
      })
      .then(response => localStorage.setItem("token", response.jwt));
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.reject("Unknown method")
};
