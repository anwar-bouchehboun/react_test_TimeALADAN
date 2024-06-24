import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MainContext() {
  const [timing, settiming] = useState({
    Fajr: "",

    Dhuhr: "",
    Asr: "",

    Maghrib: "",
    Isha: "",
  });
  const [SelectCity, setSelectCity] = useState({
    dsiplayName: "Safi",
    apiName: "Safi",
  });
  const getTiming = async () => {
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${SelectCity.apiName}&country=MAR`
    );

    const res = data.data.data.timings;
    settiming(res);
  };

  useEffect(() => {
    getTiming();
  }, [SelectCity]);
  function handleChange(event) {
    setSelectCity(event.target.value);
  }
  return (
    <>
      {/* TOP TOW */}
      <Grid
        container
        style={{
          textAlign: "center",
        }}
      >
        <Grid xs={6}>
          <div>
            <h2>date</h2>
            <h1> {SelectCity.dsiplayName}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>Temps</h2>
            <h1> 00:19:12</h1>
          </div>
        </Grid>
      </Grid>
      <Divider
        style={{
          borderColor: "black",
          opacity: "0.3",
        }}
      />
      {/* cards */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name={"ALFAJR"}
          time={timing.Fajr}
          image={"src/assets/image/fajr-prayer.png"}
        />
        <Prayer
          name={"ALDhuhr"}
          time={timing.Dhuhr}
          image={"src/assets/image/fajr-prayer.png"}
        />
        <Prayer
          name={"ALAsr"}
          time={timing.Asr}
          image={"src/assets/image/fajr-prayer.png"}
        />
        <Prayer
          name={"ALMaghrib"}
          time={timing.Sunset}
          image={"src/assets/image/fajr-prayer.png"}
        />
        <Prayer
          name={"ALIsha"}
          time={timing.Isha}
          image={"src/assets/image/fajr-prayer.png"}
        />
      </Stack>
      {/* select  */}
      <Stack
        direction={"row"}
        justifyContent={"center"}
        style={{ marginTop: "20px" }}
      >
        <FormControl style={{ width: "30%" }}>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={SelectCity.dsiplayName}
            onChange={handleChange}
          >
            <MenuItem
              value={{
                dsiplayName: "Safi",
                apiName: "Safi",
              }}
            >
              Safi
            </MenuItem>
            <MenuItem
              value={{
                dsiplayName: "Rabat",
                apiName: "Rabat",
              }}
            >
              Rabat
            </MenuItem>
            <MenuItem
              value={{
                dsiplayName: "Casablanca",
                apiName: "Casablanca",
              }}
            >
              Casablanca
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
