// © Copyright 2022 Ramkee-Mukuru Quin-App

import * as React from "react";
import { Dayjs } from "dayjs";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, FormControl, FormLabel } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { apiService } from "../../services/api";
import { agenciesList } from "./adapters/apiToMap";

interface IBasicDatePicker {
  params: (
    startdate?: Dayjs | string | null,
    enddate?: Dayjs | string | null,
    agency?: string
  ) => void;
}
export const BasicDatePicker = ({ params }: IBasicDatePicker) => {
  const [fromValue, setFromValue] = React.useState<Dayjs | null>(null);
  const [endValue, setEndValue] = React.useState<Dayjs | null>(null);
  const [age, setAge] = React.useState("");
  const [agencies, setAgencies] = React.useState([]);
  const { getAgencies } = apiService("/");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const getAllAgencies = async () => {
    // Once you have the result, send to adapters and get the appropreate data
    const agencies = await getAgencies();
    setAgencies(agenciesList(agencies?.data?.results || []));
  };

  React.useEffect(() => {
    // We need to have all agencies list in a dropdown
    getAllAgencies();
  }, []);

  return (
    <>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={fromValue}
            onChange={(newValue) => {
              setFromValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            key={1}
          />
          <DatePicker
            label="End Date"
            value={endValue}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            key={2}
          />
        </LocalizationProvider>
        <Box style={{ marginTop: "10px" }}>
          <FormControl fullWidth>
            <FormLabel>Agencies</FormLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={age}
              label="Agencies"
              onChange={handleChange}
            >
              {agencies?.length > 0 &&
                agencies.map((item: any) => (
                  <MenuItem value={item?.rocket__configuration__id}>
                    {item?.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          onClick={() => params(fromValue, endValue, age)}
          style={{ marginTop: "10px" }}
        >
          {" "}
          Search
        </Button>
      </Box>
    </>
  );
};
