import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:8080";
const httpClient = fetchUtils.fetchJson;

const options = {};
const token = localStorage.getItem("token");
options.headers = new Headers({ Authorization: `Bearer ${token}` });

export const myDataProvider = {
  getList: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url, options).then(response => ({
      data: response.json.files,
      total: response.json.files.length
    }));
  },
  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const formData = new FormData();
    formData.append("file", params.data.file.rawFile);
    options.body = formData;
    options.method = "POST";
    await httpClient(url, options).then(response => {
      return { data: response.json };
    });
    options.method = "GET";
    options.body = null;
    return httpClient(url, options).then(response => {
      const fileName = params.data.file.rawFile.name;
      const file = response.json.files.find(elem => {
        const arr = elem.file.split("/");
        return arr[arr.length - 1] === fileName
      });
      const id = file.id;
      debugger
      return {
        data: {
          id,
          file: file.file
        }
      };
      /*debugger
      const arr = response.json.files[0].split("/");
      const ourFile = arr[arr.length - 1];
      let file = response.json.files.find(elem => {
        const arr = elem.split("/");
        return arr[arr.length - 1] === params.data.file.rawFile.name;
      });
      file = {
        id: response.json.files.length - 1,
        file: file
      };
      return {
        data: file
      };*/
    });
  }
};
