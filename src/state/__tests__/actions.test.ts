// © Copyright 2022 Ramkee-Mukuru Quin-App

import {
  actions,
  setDeleteDialogAction,
  setSelectedItemsAction,
  resetPaginationAction,
  updatePaginationAction,
  updateSortingAction
} from "../actions";
import { Action } from "../reducer";

describe("actions", () => {
  it("should return correct output", () => {
    const actionHandler = actions((e) => e);
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
    expect(setSelectedItemsAction([item])).toEqual({
      type: Action.SET_SELECTED_ITEMS,
      data: [item]
    });
    expect(setSelectedItemsAction(null as any)).toEqual({
      type: Action.SET_SELECTED_ITEMS,
      data: null
    });
    expect(actionHandler.setSelectedItems([item])).toEqual({
      type: Action.SET_SELECTED_ITEMS,
      data: [item]
    });
    expect(actionHandler.setSelectedItems(null as any)).toEqual({
      type: Action.SET_SELECTED_ITEMS,
      data: null
    });

    expect(setDeleteDialogAction(true)).toEqual({
      type: Action.SET_DELETE_DIALOG,
      data: true
    });
    expect(setDeleteDialogAction(false)).toEqual({
      type: Action.SET_DELETE_DIALOG,
      data: false
    });
    expect(actionHandler.setDeleteDialog(true)).toEqual({
      type: Action.SET_DELETE_DIALOG,
      data: true
    });
    expect(actionHandler.setDeleteDialog(false)).toEqual({
      type: Action.SET_DELETE_DIALOG,
      data: false
    });
  });

  it("should return correct output for pagination actions", () => {
    const actionHandler = actions((e) => e);
    expect(resetPaginationAction()).toEqual({
      type: Action.RESET_TABLE_PAGINATION,
      data: true
    });
    expect(actionHandler.resetPagination()).toEqual({
      type: Action.RESET_TABLE_PAGINATION,
      data: true
    });

    expect(updatePaginationAction(null as any)).toEqual({
      type: Action.SET_TABLE_PAGINATION,
      data: null
    });
    expect(updatePaginationAction(true)).toEqual({
      type: Action.SET_TABLE_PAGINATION,
      data: true
    });
    expect(actionHandler.updatePagination(null as any)).toEqual({
      type: Action.SET_TABLE_PAGINATION,
      data: null
    });
    expect(actionHandler.updatePagination(true)).toEqual({
      type: Action.SET_TABLE_PAGINATION,
      data: true
    });
  });

  it("should return correct output for sorting actions", () => {
    const actionHandler = actions((e) => e);
    expect(updateSortingAction({ key: "name", order: "asc" })).toEqual({
      type: Action.SET_TABLE_COLUMN_SORTING,
      data: { key: "name", order: "asc" }
    });
    expect(updateSortingAction(null as any)).toEqual({
      type: Action.SET_TABLE_COLUMN_SORTING,
      data: null
    });
    expect(actionHandler.updateSorting({ key: "name", order: "asc" })).toEqual({
      type: Action.SET_TABLE_COLUMN_SORTING,
      data: { key: "name", order: "asc" }
    });
    expect(actionHandler.updateSorting(null as any)).toEqual({
      type: Action.SET_TABLE_COLUMN_SORTING,
      data: null
    });
  });
});
