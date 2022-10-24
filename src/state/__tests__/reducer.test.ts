// © Copyright 2022 Ramkee-Mukuru Quin-App

import { Pagination } from "@denali/dm-ui-features";

import {
  setDeleteDialogAction,
  setSelectedItemsAction,
  updatePaginationAction,
  updateSortingAction
} from "../actions";
import { initialState, reducer } from "../reducer";

describe("Reducer Test for Policies", () => {
  it("should update selected item", () => {
    const item = {
      id: "x",
      name: "x",
      usedBy: [],
      usedByCount: 0,
      redirectUrl: "x",
      summary: [
        {
          copyName: "Snapshot",
          destination: "",
          destinationLabel: "",
          frequency: "HOURLY",
          immutable: "",
          retainFor: "3 days",
          retainForLabel: "retainFor 3 days",
          backupEvery: "between 00:00 to 23:59",
          backupEveryLabel: "every 2 hours   between 00:00 to 23:59",
          protectionStoreGateways: "",
          protectionStoreGatewaysLabel: ""
        }
      ]
    };
    expect(reducer(initialState, setSelectedItemsAction([item]))).toEqual({
      ...initialState,
      selectedItems: [item]
    });
    expect(reducer(initialState, setSelectedItemsAction(null as any))).toEqual({
      ...initialState,
      selectedItems: null
    });
  });

  it("should update the delete policy dialog state", () => {
    expect(reducer(initialState, setDeleteDialogAction(true))).toEqual({
      ...initialState,
      isDeleteDialogOpen: true
    });
    expect(reducer(initialState, setDeleteDialogAction(false))).toEqual({
      ...initialState,
      isDeleteDialogOpen: false
    });
  });

  it("should keep default state", () => {
    expect(reducer(initialState, null as any)).toEqual(initialState);
  });

  it("should update the pagination", () => {
    expect(reducer(initialState, updatePaginationAction(true))).toEqual({
      ...initialState,
      pagination: {
        offset: Pagination.OFFSET + Pagination.LIMIT,
        limit: Pagination.LIMIT
      }
    });
  });

  it("should not update the pagination", () => {
    expect(reducer(initialState, updatePaginationAction(false))).toEqual({
      ...initialState,
      pagination: {
        offset: Pagination.OFFSET,
        limit: Pagination.LIMIT
      }
    });
  });

  it("should update the sorting column", () => {
    expect(
      reducer(
        initialState,
        updateSortingAction({
          key: "name",
          order: "asc"
        })
      )
    ).toEqual({
      ...initialState,
      sorting: {
        key: "name",
        order: "asc"
      }
    });
  });

  it("should not update the sorting column", () => {
    expect(reducer(initialState, updateSortingAction(null as any))).toEqual({
      ...initialState,
      sorting: {
        key: "name",
        order: "asc"
      }
    });
  });
});
