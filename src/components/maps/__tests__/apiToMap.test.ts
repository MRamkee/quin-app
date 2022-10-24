// © Copyright 2022 Ramkee-Mukuru Quin-App

import { agenciesList, apiToMap } from "../adapters/apiToMap";

describe("apiToMapView", () => {
  it("apiToMapView", () => {
    const data = [
      {
        id: "123",
        pad: {
          location: {
            name: "test , test1"
          },
          latitude: [12],
          longitude: [15]
        },
        name: "India",
        launchers: "475"
      },
      {
        id: "345",
        pad: {
          location: {
            name: "Ramkee , test1"
          },
          latitude: [20],
          longitude: [30]
        },
        name: "UK",
        launchers: "476"
      },
      {
        id: "789",
        pad: {
          location: {
            name: "test , test1"
          },
          latitude: [12],
          longitude: [15]
        },
        name: "US",
        launchers: "100"
      }
    ];

    //Positive Cases
    expect(agenciesList(data as any)).toEqual([
      {
        name: "India",
        rocket__configuration__id: "475"
      },
      {
        name: "UK",
        rocket__configuration__id: "476"
      },
      {
        name: "US",
        rocket__configuration__id: "100"
      }
    ]);
    // Negative Case
    expect(agenciesList(undefined as any)).toEqual([]);

    const data1 = [
      {
        id: "123",
        pad: {
          location: {
            name: "test , test1"
          },
          latitude: [12],
          longitude: [15]
        }
      },
      {
        id: "345",
        pad: {
          location: {
            name: "Ramkee , test1"
          },
          latitude: [20],
          longitude: [30]
        }
      },
      {
        id: "789",
        pad: {
          location: {
            name: "test , test1"
          },
          latitude: [12],
          longitude: [15]
        }
      }
    ];

    //Positive Cases
    expect(apiToMap(data1 as any)).toEqual([
      {
        id: "123",
        name: "test",
        markerOffset: 15,
        coordinates: [12, 15]
      },
      {
        id: "345",
        name: "Ramkee",
        markerOffset: 15,
        coordinates: [20, 30]
      },
      {
        id: "789",
        name: "test",
        markerOffset: 15,
        coordinates: [12, 15]
      }
    ]);
    // Negative Case
    expect(apiToMap(undefined as any)).toEqual([]);
  });
});
