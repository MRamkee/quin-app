// © Copyright 2022 Ramkee-Mukuru Quin-App

import { IPolicyModelListView } from "../types";

export enum Action {
  SET_SELECTED_ITEMS,
  SET_DELETE_DIALOG,
  SET_TABLE_PAGINATION,
  RESET_TABLE_PAGINATION,
  SET_TABLE_COLUMN_SORTING
}

export interface IAction {
  type: Action;
  data: any;
}

export interface IState {
  selectedItems: IPolicyModelListView[];
  isDeleteDialogOpen: boolean;
}

export const initialState: IState = {
  selectedItems: [],
  isDeleteDialogOpen: false
};

export const reducer = (state: IState = initialState, action: IAction) => {
  switch (action?.type) {
    case Action.SET_SELECTED_ITEMS:
      return { ...state, selectedItems: action.data };
    case Action.SET_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: action.data };
    default:
      return state;
  }
};
