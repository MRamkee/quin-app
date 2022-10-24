// © Copyright 2022 Ramkee-Mukuru Quin-App

import { i18n as i18nType } from "i18next";
//import { mergeDeepRight } from "ramda";
import { useTranslation } from "react-i18next";

import commonTranslations from "./locales";

interface ITranslations<T> {
  [index: string]: T;
}

// Lets you add your namespaced feature translations
export const addFeatureTranslations = (
  i18next: i18nType,
  nameSpace: string,
  localTranslations: ITranslations<object>
) => {
  Object.keys(localTranslations).forEach((language: any) => {
    if (!i18next?.getResourceBundle?.(language, nameSpace)) {
      i18next?.addResourceBundle?.(
        language,
        nameSpace,
        localTranslations[language]
      );
    }
  });

  return { i18next };
};

// Lets you add namespaced feature translations and then use a transtion key without it.
// const t = useFeatureTranslations("dashboard", translations);
// Now instead of doing t("dashboard:title") you can use the translations like so:
// t("title");
//
// Common strings such as Name, Description etc can be recorded in src/atlas-ui-core/locales
// These are merged with the feature translations here:
// Features can choose to override these strings
export const useFeatureTranslations = (
  nameSpace: string,
  localTranslations: ITranslations<object>
) => {
  const { i18n, t } = useTranslation(nameSpace, { useSuspense: false });

  // Add the feature and core translations into the "feature" namespace
  addFeatureTranslations(i18n, nameSpace, localTranslations);

  // Add the atlas-ui-core translations into a "basic" namespace for use in core components
  // A componet in atlas-ui-core can then refer to translations using:
  // import { useTranslation } from "react-i18next";
  // ...
  // const { t } = useTranslation();
  // ...
  // t("basic:addTags")
  addFeatureTranslations(i18n, "basic", commonTranslations);

  return {
    ns: nameSpace,
    i18n,
    t: (key: string, opts?: any) => {
      return t(`${nameSpace}:${key}`, opts);
    }
  };
};
