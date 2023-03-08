import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";

const CustomSelect = ({ data, name }) => {
  const [country, setCountry] = useState("");
  const handleChange = (e) => {
    setCountry(e.target.value);
  };
  useEffect(() => {
    console.log(country);
  }, [country]);
  return (
    <Box sx={{ minWidth: 200, borderRadius: "10px" }}>
      <FormControl fullWidth>
        <Select
          labelId={name.toLowerCase()}
          id={name.toLowerCase()}
          value={country}
          displayEmpty
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem>Select type...</MenuItem>
          {data.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
