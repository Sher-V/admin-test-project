import React from "react";
import { Link } from "react-router-dom";
import {
  Datagrid,
  List,
  TextField,
  ImageField,
  SimpleForm,
  FileInput,
  Create,
  FileField
} from "react-admin";

export const Files = props => {
  return (
    <>
      <List {...props}>
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <FileField source="file" title="file" />
        </Datagrid>
      </List>
      <Create title=" SomeTitle" {...props}>
        <SimpleForm>
          <FileInput source="file" label="Related files">
            <FileField source="src" title="title" />
          </FileInput>
        </SimpleForm>
      </Create>
    </>
  );
};
