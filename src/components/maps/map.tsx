// © Copyright 2022 Ramkee-Mukuru Quin-App

import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

import { apiService } from "../../services/api";
import { worldMapData } from "./mock";
import { apiToMap } from "./adapters/apiToMap";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { BasicDatePicker } from "./searchForLanches";
import SettingIcon from "@mui/icons-material/Settings";
import { Refresh } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export const MapChart = ({ setTooltipContent }) => {
  const [mapData, setMapData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isProgressing, setIsProgressing] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { getLaunches, getLaunchesByID } = apiService("/");

  const getDefaultLaunches = async () => {
    // Once you have the defualt launches result, send to adapters and get the appropreate data
    setIsProgressing(true);
    const getDefaultRocketLaunches = await getLaunches();
    console.log(apiToMap(getDefaultRocketLaunches?.data?.results));
    setMapData(apiToMap(getDefaultRocketLaunches?.data?.results));
    setIsProgressing(false);
  };

  //Get default rocket launches
  useEffect(() => {
    // By default we need to show the upcoming launches
    getDefaultLaunches();
  }, []);

  //This will be called when we apply the filters like Date and agencies
  const setFilters = (stDate, endDate, agency, success) => {
    handleClose();
    setIsProgressing(true);
    getLaunchesByAgencies(agency, success);
  };

  const getLaunchesByAgencies = async (agency, success) => {
    // Once you have the filtered launches result, send to adapters and get the appropreate data
    const launches = await getLaunchesByID(agency || "475", success);
    setMapData(apiToMap(launches?.data?.results));
    setIsProgressing(false);
  };

  return (
    <>
      {/** Display the spinner when the API result is in pendint state */}
      {isProgressing && (
        <Box sx={{ display: "flex", margin: "auto" }}>
          <CircularProgress />
        </Box>
      )}
      {/** Title Header and Filter Button */}
      <Box padding={"10px"}>
        <h2>Moon Rocket Launches: </h2>
        <Button
          style={{ float: "right" }}
          onClick={() => getDefaultLaunches()}
          startIcon={<Refresh />}
        >
          Reload
        </Button>
        <Button
          style={{ float: "right" }}
          onClick={handleOpen}
          startIcon={<SettingIcon />}
        >
          Filters
        </Button>
      </Box>

      {/** Filter Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h4>Search for Lauches: </h4>
            <div>
              <BasicDatePicker params={setFilters} />
            </div>
          </Box>
        </Fade>
      </Modal>

      {/**Generate Rocket Launch Earth Map*/}
      <ComposableMap>
        <Geographies geography={worldMapData}>
          {({ geographies }) =>
            geographies.map((geo, index) => (
              <Geography
                key={index}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>

        {mapData?.map(({ name, coordinates, markerOffset }, index) => (
          <Marker key={index} coordinates={coordinates}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
              onMouseOver={() => {
                setTooltipContent(name);
              }}
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </>
  );
};
