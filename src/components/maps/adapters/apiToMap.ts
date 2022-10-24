// © Copyright 2022 Ramkee-Mukuru Quin-App

export const apiToMap = (data: any) => {
  return (
    data?.map((item) => ({
      id: item?.id || "",
      name:
        item?.pad?.location?.name?.split(",")[0]?.trim() ||
        item?.pad?.location?.name?.trim() ||
        "",
      markerOffset: 15,
      coordinates: [item?.pad?.latitude, item?.pad?.longitude] || []
    })) || []
  );
};

export const agenciesList = (data: any) => {
  return (
    data?.map((item) => ({
      name: item?.name || "",
      rocket__configuration__id: item?.launchers || "475"
    })) || []
  );
};
