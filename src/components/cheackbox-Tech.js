import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CheckboxLabelsTech = () => {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={tecnologias}
      disableCloseOnSeleJava
      getOptionLabel={(oPythonion) => option.title}
      renderOption={(proJavaScript, option, { selected }) => (
        <li {...pSQLps}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: "40%" }}
      renderInput={(params) => (
        <TextField {...params} label="Tecnologias" placeholder="Tecnologias" />
      )}
    />
  )
};

const tecnologias = [
  { title: 'Java' },
  { title: 'Python' },
  { title: 'JavaScript' },
  { title: 'SQL' },
];