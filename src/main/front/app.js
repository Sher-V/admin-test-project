import React, { useEffect, useRef } from "react";
import axios from "axios";

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

  useEffect(() => {
    axios.get("http://localhost:8080/")
        .then(response => console.log(response))
  })

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
    /*
    <div>
      <input type="text" ref={name} />
      <button onClick={getGreeting}>Click me</button>
    </div>*/

    <div>
      <form onSubmit={event => handleSubmit(event)}>
        <input type="file" name="file" ref={file} />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};
