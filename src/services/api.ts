// © Copyright 2022 Ramkee-Mukuru Quin-App

import axios from "axios";

import { IPolicyApiPayload } from "../types";

const V1 = "/v1";
const TEMPLATES = "protection-policies";

export const apiService = (apiEndpoint: string) => {
  const resourceEndpoint = `${apiEndpoint}${V1}/${TEMPLATES}`;

  const loadCollection = (queryParams: string) =>
    axios.get(`${resourceEndpoint}?${queryParams}`);
  const loadItem = (id: string) => axios.get(`${resourceEndpoint}/${id}`);
  const createItem = (item: IPolicyApiPayload) =>
    axios.post(resourceEndpoint, item);
  const updateItem = (id: string, item: IPolicyApiPayload) =>
    axios.put(`${resourceEndpoint}/${id}`, item);
  const patchItem = (id: string, item: IPolicyApiPayload) =>
    axios.patch(`${resourceEndpoint}/${id}`, item);
  const deleteItem = (id: string) => axios.delete(`${resourceEndpoint}/${id}`);
  const config = {
    headers: {
      "app-id": "6112dc7c3f812e0d9b6679dd"
    }
  };
  const getRecords = () =>
    axios.get("https://dummyapi.io/data/v1/user?limit=10", config);

  return {
    loadCollection,
    loadItem,
    createItem,
    updateItem,
    patchItem,
    deleteItem,
    getRecords
  };
};
