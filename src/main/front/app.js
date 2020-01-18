import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Admin, Resource } from "react-admin";
import {Files} from "./Files";
import dataProvider from "./dataProvider";

export const App = () => {
  const name = useRef("");
  const file = useRef(null);

  const getGreeting = () => {
    axios
      .get(`http://localhost:8080/greeting?name=${name.current.value}`)
      .then(response => {
        console.log(response.data.content);
      });
  };

/*  useEffect(() => {
    axios.get("http://localhost:8080/")
        .then(response => console.log(response))
  })*/

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", file.current.files[0]);
    axios
      .post("http://localhost:8080/", data)
      .then(response => console.log(response));

    console.log(file.current.files[0]);
    /*
    axios.post();*/
  };
  return (
      <Admin dataProvider={dataProvider("http://localhost:8080")}>
        <Resource name="files" list={Files} />
      </Admin>
  );
};
