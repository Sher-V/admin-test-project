import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:8080";
const httpClient = fetchUtils.fetchJson;

export const myDataProvider = {
  getList: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url).then(response => {
      const files = response.json.files.map((elem, index) => ({
        id: index,
        file: elem
      }));
      console.log({
        data: files,
        total: files.length
      })
      return {
        data: files,
        total: files.length
      };
    });
  },
  create: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const formData = new FormData();
    formData.append("file", params.data.file.rawFile);
    httpClient(url, {
      method: "POST",
      body: formData
    }).then(response => ({ data: response.json }));
  }
};
