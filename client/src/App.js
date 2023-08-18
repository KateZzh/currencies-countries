import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import "./index.css";
import axios from "axios";

function App() {
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  async function sendRequest() {
    const response = await axios.get("https://www.nbrb.by/API/ExRates/Currencies");
    setData(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className="App">
      <FormControl style={{ width: 400 }}>
        <InputLabel id="demo-simple-select-label">Select Occupation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select Occupation"
          onChange={handleChange}
        >
          {data.map((el, index) => (
            <MenuItem key={index} value={index}>{el.Cur_Name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
