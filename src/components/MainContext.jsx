/* eslint-disable no-unused-vars */
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
import moment from "moment";
import { useState, useEffect } from "react";

export default function MainContext() {
  const [timing, settiming] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [SelectCity, setSelectCity] = useState("safi");
  const [Today, setToday] = useState("");
  const [temps, settemps] = useState(10);
  const getTiming = async () => {
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${SelectCity}&country=MAR`
    );

    const res = data.data.data.timings;
    settiming(res);
  };

  useEffect(() => {
    getTiming();

    // settemps( t.format('HH:mm:ss'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SelectCity]);

  useEffect(() => {
    const t = moment();
    setToday(t.format("MM-D-YYYY |HH:mm"));
    let inet = setInterval(() => {
      setupCountdownTimer();
    }, 1000);
    return () => {
      clearInterval(inet);
    };
  }, []);

  const setupCountdownTimer = () => {
    const momentNew = moment();
    let nextPrayer = null;
    if (
      momentNew.isAfter(moment(timing["Fajr"], "hh:mm")) &&
      momentNew.isBefore(moment(timing["Dhuhr"], "hh:mm"))
    ) {
      console.log(" next Dhuhr");
    } else if (
      momentNew.isAfter(moment(timing["Dhuhr"], "hh:mm")) &&
      momentNew.isBefore(moment(timing["Asr"], "hh:mm"))
    ) {
      console.log(" next Asr");
    } else if (
      momentNew.isAfter(moment(timing["Asr"], "hh:mm")) &&
      momentNew.isBefore(moment(timing["Maghrib"], "hh:mm"))
    ) {
      console.log(" next Maghrib");
    } else if (
      momentNew.isAfter(moment(timing["Maghrib"], "hh:mm")) &&
      momentNew.isBefore(moment(timing["Isha"], "hh:mm"))
    ) {
      console.log(" next Isha");
    } else if (
      momentNew.isAfter(moment(timing["Isha"], "hh:mm")) &&
      momentNew.isBefore(moment(timing["Fajr"], "hh:mm"))
    ) {
      console.log(" next Fajr");
    }
  };
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
            <h2>{Today}</h2>
            <h1> {SelectCity}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>Temps</h2>
            <h1> {temps}</h1>
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
            value={SelectCity}
            label="City"
            onChange={handleChange}
          >
            <MenuItem value={"safi"}>Safi</MenuItem>
            <MenuItem value={"Rabat"}>Rabat</MenuItem>
            <MenuItem value={"Casablanca"}>Casablanca</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
