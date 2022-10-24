// © Copyright 2022 Ramkee-Mukuru Quin-App

import React from "react";

import { translations } from "../locales";
import { apiService } from "../services/api";
import {
  IPolicyApiPayload,
  IPolicyContainerContext,
  TRANSLATION_NS
} from "../types";
import { actions } from "./actions";
import { initialState, reducer } from "./reducer";
import { useFeatureTranslations } from "../i18n/useFeatureTranslations";
import { useAsyncCall } from "../helpers/useAsyncCall";
import { restPayloadTransform } from "../helpers/payloadTransformers";

export const ContainerContext = React.createContext<
  Partial<IPolicyContainerContext>
>({});

export const ContainerContextProvider: React.FC = (props: any) => {
  const [reducerState, dispatch] = React.useReducer(reducer, initialState);
  const reducerActions = actions(dispatch);

  //const globalContext = useGlobalContext();
  const api = apiService("/");

  //const { loadTask } = apiTask;
  const {
    loadCollection,
    loadItem,
    createItem,
    updateItem,
    patchItem,
    deleteItem
  } = api;

  const reloadPoliciesLoader = useAsyncCall(restPayloadTransform);
  const loadSinglePolicyLoader = useAsyncCall(restPayloadTransform);
  const createPolicyLoader = useAsyncCall(restPayloadTransform);
  const updatePolicyLoader = useAsyncCall(restPayloadTransform);
  const patchPolicyLoader = useAsyncCall(restPayloadTransform);
  const deletePolicyLoader = useAsyncCall(restPayloadTransform);
  const localPoolLoader = useAsyncCall(restPayloadTransform);
  const cloudPoolLoader = useAsyncCall(restPayloadTransform);
  const createCloudPoolLoader = useAsyncCall(restPayloadTransform);
  const loadSingleTaskLoader = useAsyncCall(restPayloadTransform);
  const psgwLoader = useAsyncCall(restPayloadTransform);

  const reloadPolicies = (queryParams: string) =>
    reloadPoliciesLoader.makeCall(() => loadCollection(queryParams));
  const loadSinglePolicy = (id: string) =>
    loadSinglePolicyLoader.makeCall(() => loadItem(id));
  const createPolicy = (item: IPolicyApiPayload) =>
    createPolicyLoader.makeCall(() => createItem(item));
  const updatePolicy = (id: string, item: IPolicyApiPayload) =>
    updatePolicyLoader.makeCall(() => updateItem(id, item));
  const patchPolicy = (id: string, item: IPolicyApiPayload) =>
    patchPolicyLoader.makeCall(() => patchItem(id, item));
  const deletePolicy = (id: string) =>
    deletePolicyLoader.makeCall(() => deleteItem(id));

  const { t } = useFeatureTranslations(TRANSLATION_NS, translations);
  const context = {
    actions: {
      ...reducerActions,
      reloadPolicies,
      loadSinglePolicy,
      createPolicy,
      updatePolicy,
      patchPolicy,
      deletePolicy
    },
    state: {
      ...reducerState,
      reloadPoliciesLoader,
      loadSinglePolicyLoader,
      createPolicyLoader,
      updatePolicyLoader,
      patchPolicyLoader
    },
    api,
    translations: { t }
  };

  return (
    <ContainerContext.Provider value={context}>
      {props.children}
    </ContainerContext.Provider>
  );
};

export const useContainerContext = () => React.useContext(ContainerContext);
