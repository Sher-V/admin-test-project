import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:8080";
const httpClient = fetchUtils.fetchJson;

const options = {};
const token = localStorage.getItem('token');
options.headers = new Headers({ 'Authorization': `Bearer ${token}` });

export const myDataProvider = {
  getList: (resource, params) => {
    const url = `${apiUrl}/${resource}`;


    //options.headers.set('Authorization', `Bearer ${token}`);
    return httpClient(url, options).then(response => {
      const files = response.json.files.map((elem, index) => ({
        id: index,
        file: elem
      }));
      return {
        data: files,
        total: files.length
      };
    });
  },
  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const formData = new FormData();
    formData.append("file", params.data.file.rawFile);
    options.body = formData;
    options.method = "POST";
    await httpClient(url, options).then(response => { return { data: response.json }});
    return httpClient(url, options).then(response => {
      const arr = response.json.files[0].split('/')
      const ourFile = arr[arr.length-1]
      let file = response.json.files.find(elem => {
        const arr = elem.split('/')
        return arr[arr.length-1] === params.data.file.rawFile.name
      })
      file = {
        id: response.json.files.length - 1,
        file: file
      }
      return {
        data: file,
      };
    });
  }
};
