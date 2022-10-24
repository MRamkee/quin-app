// © Copyright 2022 Ramkee-Mukuru Quin-App

import { IPolicyModelListView } from "../types";
import { Action, IAction } from "./reducer";

export const setSelectedItemsAction = (items: IPolicyModelListView[]) => ({
  type: Action.SET_SELECTED_ITEMS,
  data: items
});

export const setDeleteDialogAction = (flag: boolean) => ({
  type: Action.SET_DELETE_DIALOG,
  data: flag
});

export const updatePaginationAction = (state: boolean) => ({
  type: Action.SET_TABLE_PAGINATION,
  data: state
});

export const resetPaginationAction = () => ({
  type: Action.RESET_TABLE_PAGINATION,
  data: true
});

export const actions = (dispatch: React.Dispatch<IAction>) => ({
  setSelectedItems: (items: IPolicyModelListView[]) =>
    dispatch(setSelectedItemsAction(items)),
  setDeleteDialog: (flag: boolean) => dispatch(setDeleteDialogAction(flag)),
  updatePagination: (flag: boolean) => dispatch(updatePaginationAction(flag)),
  resetPagination: () => dispatch(resetPaginationAction())
});
