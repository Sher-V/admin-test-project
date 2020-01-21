import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Admin, Resource } from "react-admin";
import {Files} from "./Files";
import dataProvider from "./dataProvider";

export const App = () => {
  return (
      <Admin dataProvider={dataProvider("http://localhost:8080")}>
        <Resource name="files" list={Files} />
      </Admin>
  );
};
