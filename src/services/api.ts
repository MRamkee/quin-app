// © Copyright 2022 Ramkee-Mukuru Quin-App

import axios from "axios";

const V1 = "/v1";

export const apiService = (apiEndpoint: string) => {
  const getLaunches = () =>
    axios.get(
      "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=20"
    );
  const getAgencies = () =>
    axios.get(
      "https://lldev.thespacedevs.com/2.2.0/agencies/?featured=true&format=json"
    );
  const getLaunchesByID = (id: string, success?: boolean) =>
    axios.get(
      `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=20&offset=60`
    );

  return {
    getLaunches,
    getAgencies,
    getLaunchesByID
  };
};
