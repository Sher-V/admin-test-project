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
  let title;

  if (record.file.rawFile) {
    title = record.file.title;
  } else {
    const arr = record.file.split("/");
    title = arr[arr.length - 1];
  }

  return <a href={record.file}>{title}</a>;
};

SomeField.propTypes = {
  record: PropTypes.object
};

export const Files = props => {
  return (
    <div>
      <List {...props}>
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <SomeField />
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
