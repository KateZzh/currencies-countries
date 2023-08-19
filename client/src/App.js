import React, { useEffect, useState } from "react";
import { Select, FormControl, MenuItem, InputLabel, Button } from "@mui/material";
import "./index.css";
import axios from "axios";

function App() {
  const [currency, setCurrency] = useState("");
  const [data, setData] = useState([]);
  const [dataRate, setDataRate] = useState([]);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  async function sendRequest() {
    const response = await axios.get("https://www.nbrb.by/API/ExRates/Currencies");
    setData(response.data);
  }

  async function sendRequestRates() {
    try {
      const responseRates = await axios.get(
        `https://api.nbrb.by/exrates/rates/${currency}?parammode=2`
      );
      setDataRate(responseRates.data);
    } catch (error) {
      alert("Cur_OfficialRate not available");
      setDataRate("");
    }
  }

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className="App">
      <FormControl style={{ width: 400 }}>
        <InputLabel id="demo-simple-select-label">Select Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Select Currency"
          onChange={handleChange}
        >
          {data.map((el, index) => (
            <MenuItem key={index} value={el.Cur_Abbreviation}>
              {el.Cur_Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ marginTop: 20 }}>
        <Button variant="contained" style={{ textTransform: "none" }} onClick={sendRequestRates}>
          Получить текущий курс
        </Button>
      </div>

      <p>Текущий курс: {dataRate.Cur_OfficialRate}</p>
    </div>
  );
}

export default App;
