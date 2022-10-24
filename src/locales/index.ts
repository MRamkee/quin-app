// © Copyright 2022 Ramkee-Mukuru Quin-App

import en from "./en";
import fr from "./fr";

export interface ITranslations<T> {
  [index: string]: T;
}

export const translations: ITranslations<object> = {
  en,
  fr
};
