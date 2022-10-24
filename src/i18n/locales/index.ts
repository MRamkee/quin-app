import en from "./en";

export interface ITranslations<T> {
  [index: string]: T;
}

const translations: ITranslations<object> = {
  en,
  fr: en
};

export default translations;
