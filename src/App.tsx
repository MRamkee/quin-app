import React from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useRoutes
} from "react-router-dom";

//import logo from "./logo .svg";
import "./App.css";
import { apiService } from "./services/api";
import { useTranslation } from "react-i18next";
import { useFeatureTranslations } from "./i18n/useFeatureTranslations";
import { TRANSLATION_NS } from "./types";
import { translations } from "./locales";
import Templates from "./layout";

// function App() {
//   const { t } = useFeatureTranslations(TRANSLATION_NS, translations);
//   const { getRecords } = apiService("/");
//   React.useEffect(() => {
//     const get = async () => {
//       const res = await getRecords();
//       console.log(res);
//     };
//     console.log(t("add"));

//     get();
//   }, []);

//   return (
//     <>
//       <div className="App">
//         {/* <header className="App-header">

//       </header> */}
//         <Templates />
//         <Routes>
//           <Route path={`/`} element={<Templates />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

const AppWrapper = () => {
  let routes = useRoutes([{ path: "/", element: <Templates /> }]);
  return routes;
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
