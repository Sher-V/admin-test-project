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
import PropTypes from "prop-types";

const SomeField = ({ record, ...rest }) => {
  const arr = record.file.split("/");
  debugger
  return <a href={record.file}>{arr[arr.length-1]}</a>;
};

SomeField.PropTypes = {
  record: PropTypes.array
};

export const Files = props => {
  debugger
  return (
    <div>
      <List {...props}>
        <Datagrid rowClick="edit">
          <TextField source="id"/>
          <SomeField/>
          {/*<SomeField/>*/}
          {/*<FileField source="files" title="desc" />*/}
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
