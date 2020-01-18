import React from "react";
import { Link } from "react-router-dom";
import {
  Datagrid,
  List,
  TextField,
  ImageField,
  FileField,
  SimpleForm,
  FileInput,
  Create
} from "react-admin";

export const Files = props => {
  return (
    <div>
      <List {...props}>
        <Datagrid rowClick="edit">
          <FileField source="url" title="desc" />
        </Datagrid>
      </List>
      <Create {...props}>
        <SimpleForm>
          <FileInput source="file" label="Related files">
            <FileField source="src" title="title" />
          </FileInput>
        </SimpleForm>
      </Create>
    </div>
  );
};
