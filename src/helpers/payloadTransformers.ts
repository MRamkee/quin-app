// © Copyright 2022 Ramkee-Mukuru Quin-App

export const restPayloadTransform = (payload: any) => {
  const keysFromResponse = Object.keys(payload?.data);
  return keysFromResponse.length === 1
    ? payload.data[keysFromResponse[0]]
    : payload.data.data || payload.data;
};

export const restItemPayloadWrapper = (payload: any, wrapKey: string) =>
  Object.keys(payload)?.find((key) => key === wrapKey)
    ? payload
    : { [wrapKey]: payload };

export const restPayloadTransformPromiseAll = (payloadArray: any) =>
  payloadArray.map((payload: any) => restPayloadTransform(payload));
