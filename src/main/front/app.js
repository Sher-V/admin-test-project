import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Admin, Resource } from "react-admin";
import {Files} from "./Files";
import {myDataProvider} from "./myDataProvider";
import {authProvider} from "./authProvider";


export const App = () => {
  return (
      <Admin dataProvider={myDataProvider} authProvider={authProvider}>
        <Resource name="files" list={Files} />
      </Admin>
  );
};
