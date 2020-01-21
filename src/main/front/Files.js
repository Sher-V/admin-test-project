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

const SomeField = ({ source, record = {} }) => {
  const arr = record.split("/");
  debugger;
  return <a href={record}>{arr[arr.length - 1]}</a>;
};

SomeField.PropTypes = {
  record: PropTypes.string
};

export const Files = props => {
  return (
    <div>
      <List {...props}>
        <Datagrid rowClick="edit">
          <SomeField source="files"/>
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
